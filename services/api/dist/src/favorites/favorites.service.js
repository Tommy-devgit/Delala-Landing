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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const properties_service_1 = require("../properties/properties.service");
let FavoritesService = class FavoritesService {
    constructor(prisma, properties) {
        this.prisma = prisma;
        this.properties = properties;
    }
    async toggle(userId, propertyId) {
        const existing = await this.prisma.favorite.findFirst({ where: { userId, propertyId } });
        if (existing) {
            await this.prisma.favorite.delete({ where: { id: existing.id } });
            return { saved: false, propertyId };
        }
        await this.prisma.favorite.create({ data: { userId, propertyId } });
        return { saved: true, propertyId };
    }
    async remove(userId, propertyId) {
        await this.prisma.favorite.deleteMany({ where: { userId, propertyId } });
        return { saved: false, propertyId };
    }
    async idsForUser(userId) {
        const rows = await this.prisma.favorite.findMany({
            where: { userId },
            select: { propertyId: true },
        });
        return rows.map((r) => r.propertyId).filter((id) => Boolean(id));
    }
    async findByUser(userId, requestedUserId) {
        const asksForSomeoneElse = requestedUserId && requestedUserId !== "me" && requestedUserId !== userId;
        if (asksForSomeoneElse) {
            throw new common_1.ForbiddenException("You can only view your own saved properties.");
        }
        const favorites = await this.prisma.favorite.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: {
                property: {
                    include: {
                        location: { include: { parent: { include: { parent: true } } } },
                        images: true,
                        owner: { include: { profile: true } },
                    },
                },
            },
        });
        return favorites
            .filter((f) => f.property)
            .map((f) => this.properties.mapPropertyResponse(f.property));
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        properties_service_1.PropertiesService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map