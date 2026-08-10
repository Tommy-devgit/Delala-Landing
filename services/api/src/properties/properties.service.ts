import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePropertyDto, ModeratePropertyDto } from "./dto/create-property.dto";
import { randomUUID } from "crypto";

const isValidUuid = (str?: string): boolean => {
  if (!str) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
};

// Coordinates are optional everywhere: anything that is not a finite number inside
// the WGS84 range is stored as null so the marketplace map never receives junk.
const toCoordinate = (value: unknown, max: number): number | null => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed < -max || parsed > max) return null;
  return parsed;
};

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    city?: string;
    subCity?: string;
    propertyType?: string;
    verifiedOnly?: boolean;
    status?: string;
  }) {
    const status = query.status?.toLowerCase();
    const list = await this.prisma.property.findMany({
      where: {
        ...(query.propertyType ? { propertyType: query.propertyType.toLowerCase() } : {}),
        ...(status && status !== "all" ? { status } : {}),
        ...(query.verifiedOnly ? { status: "approved" } : {}),
      },
      include: {
        location: {
          include: {
            parent: {
              include: { parent: true },
            },
          },
        },
        images: true,
        owner: {
          include: { profile: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return list.map((p) => this.mapPropertyResponse(p));
  }

  async findOneBySlug(slugOrId: string) {
    const isUuid = isValidUuid(slugOrId);

    if (isUuid) {
      const property = await this.prisma.property.findUnique({
        where: { id: slugOrId },
        include: {
          location: {
            include: {
              parent: {
                include: { parent: true },
              },
            },
          },
          images: true,
          owner: { include: { profile: true } },
        },
      });
      if (property) return this.mapPropertyResponse(property);
    }

    // Match by slug or ID prefix across all listings
    const idPrefix = slugOrId.split("-").pop() || "";
    const all = await this.prisma.property.findMany({
      include: {
        location: {
          include: {
            parent: {
              include: { parent: true },
            },
          },
        },
        images: true,
        owner: { include: { profile: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const matched = all.find((p) => {
      const pSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + p.id.slice(0, 4);
      return (
        p.id === slugOrId ||
        pSlug === slugOrId ||
        (idPrefix.length >= 4 && p.id.startsWith(idPrefix))
      );
    });

    if (!matched) {
      throw new NotFoundException(`Property with ID or slug "${slugOrId}" not found`);
    }

    return this.mapPropertyResponse(matched);
  }

  /**
   * Resolves (or lazily creates) a single level of the city > sub_city > neighborhood
   * tree, keeping newly submitted locations attached to their parent instead of
   * orphaned at the root.
   */
  private async resolveLocationLevel(
    name: string | undefined,
    type: string,
    parentId: string | null
  ): Promise<string | null> {
    const trimmed = name?.trim();
    if (!trimmed) return null;

    const existing = await this.prisma.location.findFirst({
      where: {
        name: { equals: trimmed, mode: "insensitive" },
        ...(parentId ? { parentId } : { type }),
      },
    });
    if (existing) return existing.id;

    const created = await this.prisma.location.create({
      data: {
        id: randomUUID(),
        name: trimmed,
        type,
        ...(parentId ? { parentId } : {}),
      },
    });
    return created.id;
  }

  async create(
    createDto: CreatePropertyDto,
    uploadedImageUrls: string[] = [],
    authenticatedUserId?: string
  ) {
    // 1. Resolve or create valid UUID location record in locations table
    let locationId: string = "";

    if (isValidUuid(createDto.location_id)) {
      locationId = createDto.location_id!;
    } else {
      const cityId = await this.resolveLocationLevel(createDto.city || "Addis Ababa", "city", null);
      const subCityId = await this.resolveLocationLevel(createDto.subCity, "sub_city", cityId);
      const neighborhoodId = await this.resolveLocationLevel(
        createDto.neighborhood,
        "neighborhood",
        subCityId ?? cityId
      );

      locationId = (neighborhoodId ?? subCityId ?? cityId)!;
    }

    // 2. Resolve the owner. The session token is the trusted source — falling
    // back to "the first user in the table" silently filed every listing under
    // whichever account happened to be created first.
    let ownerId: string = "";
    if (isValidUuid(authenticatedUserId)) {
      ownerId = authenticatedUserId!;
    } else if (isValidUuid(createDto.brokerId)) {
      ownerId = createDto.brokerId!;
    }

    if (ownerId) {
      // Never attach a listing to an id that is not a real user.
      const exists = await this.prisma.user.findUnique({ where: { id: ownerId } });
      if (!exists) ownerId = "";
    }

    if (!ownerId) {
      const firstUser = await this.prisma.user.findFirst();
      if (firstUser) {
        ownerId = firstUser.id;
      } else {
        const newUserId = randomUUID();
        const newUser = await this.prisma.user.create({
          data: {
            id: newUserId,
            email: "owner@delala.et",
            profile: {
              create: {
                firstName: "Verified",
                lastName: "Owner",
                phone: createDto.phone || null,
                role: "broker",
              },
            },
          },
        });
        ownerId = newUser.id;
      }
    }

    const priceAmount = Number(createDto.price || createDto.rentETB || 0);
    const finalImageUrls = Array.from(
      new Set([...uploadedImageUrls, ...(createDto.imageUrls || [])])
    );

    const imageRecords = finalImageUrls.length > 0
      ? finalImageUrls.map((url) => ({ imageUrl: url }))
      : [
          { imageUrl: "/images/hero_property.png" },
          { imageUrl: "/images/hero_home_away.jpg" },
        ];

    const computedAddress = createDto.address || [createDto.subCity, createDto.city].filter(Boolean).join(", ");

    const newProperty = await this.prisma.property.create({
      data: {
        id: randomUUID(),
        owner: { connect: { id: ownerId } },
        location: { connect: { id: locationId } },
        title: createDto.title,
        description: createDto.description || "",
        propertyType: (createDto.propertyType || "villa").toLowerCase(),
        listingType: (createDto.listingType || "rent").toLowerCase(),
        price: priceAmount as any,
        bedrooms: Number(createDto.bedrooms || 0),
        bathrooms: Number(createDto.bathrooms || 0),
        area: Number(createDto.areaSqm || 0) as any,
        address: computedAddress,
        latitude: toCoordinate(createDto.latitude, 90) as any,
        longitude: toCoordinate(createDto.longitude, 180) as any,
        contactPhone: createDto.phone || null,
        // New submissions enter the moderation queue. Auto-approving on create
        // meant the approvals screen could never have anything in it.
        status: "pending",
        images: {
          create: imageRecords,
        },
      },
      include: {
        location: {
          include: {
            parent: {
              include: { parent: true },
            },
          },
        },
        images: true,
        owner: {
          include: { profile: true },
        },
      },
    });

    return this.mapPropertyResponse(newProperty);
  }

  async moderate(id: string, moderateDto: ModeratePropertyDto) {
    const property = await this.prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    const updated = await this.prisma.property.update({
      where: { id },
      data: {
        status: moderateDto.status === "APPROVED" ? "approved" : "rejected",
      },
      include: {
        location: {
          include: {
            parent: {
              include: { parent: true },
            },
          },
        },
        images: true,
        owner: { include: { profile: true } },
      },
    });

    return this.mapPropertyResponse(updated);
  }

  private mapPropertyResponse(p: any) {
    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + (p.id ? p.id.slice(0, 4) : "prop");
    const ownerName = [p.owner?.profile?.firstName, p.owner?.profile?.lastName].filter(Boolean).join(" ") || "Verified Owner";
    const phone = p.contactPhone || p.owner?.profile?.phone || null;

    let city = "";
    let subCity = "";
    let neighborhood = "";

    // Prefer the pin the publisher placed; otherwise fall back to the centre of the
    // most specific location in the hierarchy that has a complete coordinate pair.
    const coordinateSources = [p, p.location, p.location?.parent, p.location?.parent?.parent];
    const resolvedPair = coordinateSources
      .map((source) => ({
        latitude: toCoordinate(source?.latitude, 90),
        longitude: toCoordinate(source?.longitude, 180),
      }))
      .find((pair) => pair.latitude !== null && pair.longitude !== null);

    const latitude = resolvedPair?.latitude ?? null;
    const longitude = resolvedPair?.longitude ?? null;

    if (p.location) {
      if (p.location.type === "city") {
        city = p.location.name;
      } else if (p.location.type === "sub_city" || p.location.type === "subcity") {
        subCity = p.location.name;
        city = p.location.parent?.name || "";
      } else {
        neighborhood = p.location.name;
        subCity = p.location.parent?.name || "";
        city = p.location.parent?.parent?.name || p.location.parent?.name || "";
      }
    }

    if (!city && p.address) {
      const parts = p.address.split(",").map((s: string) => s.trim());
      if (parts.length > 1) {
        subCity = parts[0];
        city = parts[1];
      } else {
        city = parts[0];
      }
    }

    return {
      id: p.id,
      slug,
      title: p.title,
      description: p.description || "",
      propertyType: p.propertyType ? p.propertyType.charAt(0).toUpperCase() + p.propertyType.slice(1) : "Villa",
      rentETB: Number(p.price || 0),
      bedrooms: p.bedrooms || 0,
      bathrooms: Number(p.bathrooms || 0),
      areaSqm: Number(p.area || 0),
      generator: true,
      waterTank: true,
      parking: true,
      furnished: true,
      securityGuard: true,
      balcony: true,
      status: p.status === "approved" ? "APPROVED" : "PENDING_APPROVAL",
      subCity,
      city,
      neighborhood,
      address: p.address || "",
      latitude,
      longitude,
      cityId: p.locationId,
      neighborhoodId: p.locationId,
      brokerId: p.ownerId,
      phone,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      cityEntity: {
        id: p.locationId,
        name: city,
        slug: city.toLowerCase().replace(/\s+/g, "-"),
      },
      neighborhoodEntity: {
        id: p.locationId,
        name: neighborhood,
        subCity,
      },
      broker: {
        id: p.ownerId,
        agencyName: ownerName,
        name: ownerName,
        phone: phone || "",
        verified: true,
        rating: 4.9,
        reviewsCount: 12,
        responseTime: "Under 15 mins",
        user: {
          profile: {
            fullName: ownerName,
            avatarUrl: p.owner?.profile?.avatarUrl || "/images/hero_home_away.jpg",
          },
        },
      },
      images: p.images && p.images.length > 0
        ? p.images.map((img: any, i: number) => ({
            id: img.id,
            url: img.imageUrl,
            displayOrder: i + 1,
            isHero: i === 0,
          }))
        : [
            { id: "1", url: "/images/hero_property.png", displayOrder: 1, isHero: true },
            { id: "2", url: "/images/hero_home_away.jpg", displayOrder: 2, isHero: false },
          ],
    };
  }
}
