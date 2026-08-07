import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePropertyDto, ModeratePropertyDto } from "./dto/create-property.dto";
import { randomUUID } from "crypto";

const isValidUuid = (str?: string): boolean => {
  if (!str) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
};

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { city?: string; subCity?: string; propertyType?: string; verifiedOnly?: boolean }) {
    const list = await this.prisma.property.findMany({
      where: {
        ...(query.propertyType ? { propertyType: query.propertyType.toLowerCase() } : {}),
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

  async create(createDto: CreatePropertyDto, uploadedImageUrls: string[] = []) {
    // 1. Resolve or create valid UUID location record in locations table
    let locationId: string | null = null;
    const targetLocName = createDto.neighborhood || createDto.subCity || createDto.city || "";

    if (isValidUuid(createDto.location_id)) {
      locationId = createDto.location_id!;
    } else if (targetLocName) {
      const existingLoc = await this.prisma.location.findFirst({
        where: { name: { equals: targetLocName, mode: "insensitive" } },
      });

      if (existingLoc) {
        locationId = existingLoc.id;
      } else {
        const newLoc = await this.prisma.location.create({
          data: {
            id: randomUUID(),
            name: targetLocName,
            type: "neighborhood",
          },
        });
        locationId = newLoc.id;
      }
    }

    // 2. Resolve or fallback owner user with a valid UUID
    let ownerId: string | null = null;
    if (isValidUuid(createDto.brokerId)) {
      ownerId = createDto.brokerId!;
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

    // Update owner profile phone if provided in form submission
    if (createDto.phone && ownerId) {
      await this.prisma.profile.updateMany({
        where: { id: ownerId },
        data: { phone: createDto.phone },
      });
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
        ...(locationId ? { location: { connect: { id: locationId } } } : {}),
        title: createDto.title,
        description: createDto.description || "",
        propertyType: (createDto.propertyType || "villa").toLowerCase(),
        listingType: (createDto.listingType || "rent").toLowerCase(),
        price: priceAmount as any,
        bedrooms: Number(createDto.bedrooms || 0),
        bathrooms: Number(createDto.bathrooms || 0),
        area: Number(createDto.areaSqm || 0) as any,
        address: computedAddress,
        status: "approved",
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
    const phone = p.owner?.profile?.phone || null;

    let city = "";
    let subCity = "";
    let neighborhood = "";

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
