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
    ownerId?: string;
  }) {
    const status = query.status?.toLowerCase();
    const list = await this.prisma.property.findMany({
      where: {
        ...(query.propertyType ? { propertyType: query.propertyType.toLowerCase() } : {}),
        ...(status && status !== "all" ? { status } : {}),
        ...(query.verifiedOnly ? { status: "approved" } : {}),
        // Powers the public poster profile: "other homes by this owner".
        ...(isValidUuid(query.ownerId) ? { ownerId: query.ownerId } : {}),
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

    // A listing with no photographs gets no photographs. Seeding two stock
    // interiors made every empty listing look like it had been photographed,
    // and the marketplace showed the same two rooms over and over.
    const imageRecords = finalImageUrls.map((url) => ({ imageUrl: url }));

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
        // The DTO has always declared these six; there were no columns to put
        // them in, so every submission's answers were discarded and the read
        // path invented `true` for all of them. `?? null` keeps "not asked"
        // distinct from "answered no".
        generator: createDto.generator ?? null,
        waterTank: createDto.waterTank ?? null,
        parking: createDto.parking ?? null,
        furnished: createDto.furnished ?? null,
        securityGuard: createDto.securityGuard ?? null,
        balcony: createDto.balcony ?? null,
        internet: createDto.internet ?? null,
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

  /** Public so other modules (favourites) reuse one property shape. */
  mapPropertyResponse(p: any) {
    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + (p.id ? p.id.slice(0, 4) : "prop");
    // "Verified Owner" was the fallback for a poster with no name on file — a
    // trust claim and an ownership claim, both invented, in the one string most
    // likely to be read.
    const ownerName = [p.owner?.profile?.firstName, p.owner?.profile?.lastName].filter(Boolean).join(" ") || "Delala poster";
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
      // No default property type. Calling an unclassified listing a "Villa"
      // put a category on the card that nobody chose.
      propertyType: p.propertyType ? p.propertyType.charAt(0).toUpperCase() + p.propertyType.slice(1) : null,
      // Rent and sale listings were indistinguishable to the frontend because
      // this was never returned, so every price rendered as "/mo".
      listingType: (p.listingType || "rent").toLowerCase(),
      rentETB: Number(p.price || 0),
      bedrooms: p.bedrooms || 0,
      bathrooms: Number(p.bathrooms || 0),
      areaSqm: Number(p.area || 0),
      // Passed through as stored: true, false, or null for "not specified".
      // These were hardcoded `true` for every property on the marketplace.
      generator: p.generator ?? null,
      waterTank: p.waterTank ?? null,
      parking: p.parking ?? null,
      furnished: p.furnished ?? null,
      securityGuard: p.securityGuard ?? null,
      balcony: p.balcony ?? null,
      internet: p.internet ?? null,
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
      // Enough to render "posted by" and link to the profile. The rating,
      // review count and response time that used to sit here were constants —
      // 4.9, 12, "Under 15 mins" — attached to every poster on the site.
      // Anything aggregated now comes from GET /users/:id/public, where it is
      // computed from real reviews instead of guessed per row.
      broker: {
        id: p.ownerId,
        agencyName: ownerName,
        name: ownerName,
        phone: phone || "",
        posterType: p.owner?.profile?.posterType || null,
        verification: {
          phone: Boolean(p.owner?.profile?.phoneVerified),
          identity: Boolean(p.owner?.profile?.identityVerified),
          business: Boolean(p.owner?.profile?.businessVerified),
        },
        user: {
          profile: {
            fullName: ownerName,
            // No stock portrait. The avatar component falls back to initials.
            avatarUrl: p.owner?.profile?.avatarUrl || null,
          },
        },
      },
      // An empty array when the listing has no photographs, so the UI can show
      // a real "no photos yet" state instead of two stock rooms that belong to
      // no property.
      images: (p.images || []).map((img: any, i: number) => ({
        id: img.id,
        url: img.imageUrl,
        displayOrder: i + 1,
        isHero: i === 0,
      })),
    };
  }
}
