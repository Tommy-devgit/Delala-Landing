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
let PropertiesService = class PropertiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        return this.prisma.property.findMany({
            where: {
                status: "APPROVED",
                ...(query.propertyType ? { propertyType: query.propertyType } : {}),
            },
            include: {
                city: true,
                neighborhood: true,
                broker: {
                    include: { user: { include: { profile: true } } },
                },
                images: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async findOneBySlug(slug) {
        const property = await this.prisma.property.findUnique({
            where: { slug },
            include: {
                city: true,
                neighborhood: true,
                broker: {
                    include: { user: { include: { profile: true } } },
                },
                images: true,
            },
        });
        if (!property) {
            throw new common_1.NotFoundException(`Property with slug ${slug} not found`);
        }
        return property;
    }
    async create(createDto, uploadedImageUrls = []) {
        const slug = createDto.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4);
        let cityId = createDto.cityId;
        let neighborhoodId = createDto.neighborhoodId;
        let brokerId = createDto.brokerId;
        const firstCity = await this.prisma.city.findFirst();
        const firstNeighborhood = await this.prisma.neighborhood.findFirst();
        const firstBroker = await this.prisma.broker.findFirst();
        if (firstCity && (!cityId || cityId === "c1" || cityId.length < 10))
            cityId = firstCity.id;
        if (firstNeighborhood && (!neighborhoodId || neighborhoodId === "n1" || neighborhoodId.length < 10))
            neighborhoodId = firstNeighborhood.id;
        if (firstBroker && (!brokerId || brokerId === "b1" || brokerId.length < 10))
            brokerId = firstBroker.id;
        const finalImageUrls = Array.from(new Set([...uploadedImageUrls, ...(createDto.imageUrls || [])]));
        const imageRecords = finalImageUrls.length > 0
            ? finalImageUrls.map((url, index) => ({
                url,
                displayOrder: index + 1,
                isHero: index === 0,
            }))
            : [
                { url: "/images/hero_property.png", displayOrder: 1, isHero: true },
                { url: "/images/hero_home_away.jpg", displayOrder: 2, isHero: false },
            ];
        const priceAmount = Number(createDto.price || createDto.rentETB || 65000);
        return this.prisma.property.create({
            data: {
                title: createDto.title,
                description: createDto.description || "Newly published verified property submission.",
                propertyType: createDto.propertyType || "Villa",
                rentETB: priceAmount,
                cityId,
                neighborhoodId,
                bedrooms: Number(createDto.bedrooms || 3),
                bathrooms: Number(createDto.bathrooms || 2),
                areaSqm: Number(createDto.areaSqm || 250),
                generator: Boolean(createDto.generator),
                waterTank: Boolean(createDto.waterTank),
                parking: Boolean(createDto.parking ?? true),
                furnished: Boolean(createDto.furnished ?? true),
                securityGuard: Boolean(createDto.securityGuard ?? true),
                brokerId,
                slug,
                status: "PENDING_APPROVAL",
                images: {
                    create: imageRecords,
                },
            },
            include: {
                city: true,
                neighborhood: true,
                broker: true,
                images: true,
            },
        });
    }
    async moderate(id, moderateDto) {
        const property = await this.prisma.property.findUnique({ where: { id } });
        if (!property) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return this.prisma.property.update({
            where: { id },
            data: {
                status: moderateDto.status === "APPROVED" ? "APPROVED" : "REJECTED",
                rejectionReason: moderateDto.rejectionReason || null,
                fieldAgentNotes: moderateDto.fieldAgentNotes || property.fieldAgentNotes,
            },
        });
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map