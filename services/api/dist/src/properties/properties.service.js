"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
const isValidUuid = (str) => {
    if (!str)
        return false;
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
};
let PropertiesService = class PropertiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const list = await this.prisma.property.findMany({
            where: {
                ...(query.propertyType ? { propertyType: query.propertyType.toLowerCase() } : {}),
            },
            include: {
                location: true,
                images: true,
                owner: {
                    include: { profile: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return list.map((p) => this.mapPropertyResponse(p));
    }
    async findOneBySlug(slugOrId) {
        const isUuid = isValidUuid(slugOrId);
        if (isUuid) {
            const property = await this.prisma.property.findUnique({
                where: { id: slugOrId },
                include: {
                    location: true,
                    images: true,
                    owner: { include: { profile: true } },
                },
            });
            if (property)
                return this.mapPropertyResponse(property);
        }
        const idPrefix = slugOrId.split("-").pop() || "";
        const all = await this.prisma.property.findMany({
            include: {
                location: true,
                images: true,
                owner: { include: { profile: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        const matched = all.find((p) => {
            const pSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + p.id.slice(0, 4);
            return (p.id === slugOrId ||
                pSlug === slugOrId ||
                (idPrefix.length >= 4 && p.id.startsWith(idPrefix)));
        });
        if (!matched) {
            throw new common_1.NotFoundException(`Property with ID or slug "${slugOrId}" not found`);
        }
        return this.mapPropertyResponse(matched);
    }
    async create(createDto, uploadedImageUrls = []) {
        let locationId = null;
        const targetLocName = createDto.neighborhood || createDto.subCity || createDto.city || "";
        if (isValidUuid(createDto.location_id)) {
            locationId = createDto.location_id;
        }
        else if (targetLocName) {
            const existingLoc = await this.prisma.location.findFirst({
                where: { name: { equals: targetLocName, mode: "insensitive" } },
            });
            if (existingLoc) {
                locationId = existingLoc.id;
            }
            else {
                const newLoc = await this.prisma.location.create({
                    data: {
                        id: (0, crypto_1.randomUUID)(),
                        name: targetLocName,
                        type: "neighborhood",
                    },
                });
                locationId = newLoc.id;
            }
        }
        let ownerId = null;
        if (isValidUuid(createDto.brokerId)) {
            ownerId = createDto.brokerId;
        }
        if (!ownerId) {
            const firstUser = await this.prisma.user.findFirst();
            if (firstUser) {
                ownerId = firstUser.id;
            }
            else {
                const newUserId = (0, crypto_1.randomUUID)();
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
        if (createDto.phone && ownerId) {
            await this.prisma.profile.updateMany({
                where: { id: ownerId },
                data: { phone: createDto.phone },
            });
        }
        const priceAmount = Number(createDto.price || createDto.rentETB || 0);
        const finalImageUrls = Array.from(new Set([...uploadedImageUrls, ...(createDto.imageUrls || [])]));
        const imageRecords = finalImageUrls.length > 0
            ? finalImageUrls.map((url) => ({ imageUrl: url }))
            : [
                { imageUrl: "/images/hero_property.png" },
                { imageUrl: "/images/hero_home_away.jpg" },
            ];
        const computedAddress = createDto.address || [createDto.subCity, createDto.city].filter(Boolean).join(", ");
        const newProperty = await this.prisma.property.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                ownerId,
                ...(locationId ? { locationId } : {}),
                title: createDto.title,
                description: createDto.description || "",
                propertyType: (createDto.propertyType || "villa").toLowerCase(),
                listingType: (createDto.listingType || "rent").toLowerCase(),
                price: priceAmount,
                bedrooms: Number(createDto.bedrooms || 0),
                bathrooms: Number(createDto.bathrooms || 0),
                area: Number(createDto.areaSqm || 0),
                address: computedAddress,
                status: "approved",
                images: {
                    create: imageRecords,
                },
            },
            include: {
                location: true,
                images: true,
                owner: {
                    include: { profile: true },
                },
            },
        });
        return this.mapPropertyResponse(newProperty);
    }
    async moderate(id, moderateDto) {
        const property = await this.prisma.property.findUnique({ where: { id } });
        if (!property) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        const updated = await this.prisma.property.update({
            where: { id },
            data: {
                status: moderateDto.status === "APPROVED" ? "approved" : "rejected",
            },
            include: {
                location: true,
                images: true,
                owner: { include: { profile: true } },
            },
        });
        return this.mapPropertyResponse(updated);
    }
    mapPropertyResponse(p) {
        const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + (p.id ? p.id.slice(0, 4) : "prop");
        const ownerName = [p.owner?.profile?.firstName, p.owner?.profile?.lastName].filter(Boolean).join(" ") || "Verified Owner";
        const phone = p.owner?.profile?.phone || null;
        const parts = p.address ? p.address.split(",").map((s) => s.trim()) : [];
        const subCity = parts.length > 1 ? parts[0] : "";
        const city = parts.length > 1 ? parts[1] : (parts[0] || p.location?.name || "");
        const neighborhood = p.location?.name || "";
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
                ? p.images.map((img, i) => ({
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
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map