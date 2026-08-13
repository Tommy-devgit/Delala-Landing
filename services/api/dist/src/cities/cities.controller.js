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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../prisma/prisma.service");
const CITY_METADATA = {
    "Addis Ababa": {
        latitude: 9.0192,
        longitude: 38.7525,
        subCities: ["Bole", "Kazanchis", "Old Airport", "CMC", "Sarbet", "Atlas", "Nifas Silk", "Kirkos"],
    },
    "Hawassa": {
        latitude: 7.0621,
        longitude: 38.4764,
        subCities: ["Tabor", "Haile Resort Area", "Industrial Park", "Bole Hawassa"],
    },
    "Adama": {
        latitude: 8.5414,
        longitude: 39.2689,
        subCities: ["Posta Bet", "Expressway Junction", "Kebele 04", "Melka Adama"],
    },
    "Bahir Dar": {
        latitude: 11.5936,
        longitude: 37.3908,
        subCities: ["Tana Waterfront", "Kebele 14", "Poly", "Abay Mado"],
    },
    "Dire Dawa": {
        latitude: 9.5931,
        longitude: 41.8661,
        subCities: ["Kezira", "Megala", "Taiwan Market", "Sabian"],
    },
    "Gondar": {
        latitude: 12.603,
        longitude: 37.4521,
        subCities: ["Fasil Ghebbi Area", "Azezo", "Maraki", "Piazza"],
    },
};
const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");
const toCoordinate = (value, max) => {
    if (value === null || value === undefined || value === "")
        return null;
    const parsed = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(parsed) || parsed < -max || parsed > max)
        return null;
    return parsed;
};
let CitiesController = class CitiesController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    toNode(loc, children) {
        return {
            id: loc.id,
            name: loc.name,
            slug: toSlug(loc.name),
            latitude: toCoordinate(loc.latitude, 90),
            longitude: toCoordinate(loc.longitude, 180),
            ...(children ? { children } : {}),
        };
    }
    async findAll() {
        const locations = await this.prisma.location.findMany({
            where: { type: "city" },
            include: {
                properties: { select: { price: true } },
                children: {
                    include: {
                        properties: { select: { price: true } },
                        children: { include: { properties: { select: { price: true } } } },
                    },
                },
            },
        });
        if (locations.length > 0) {
            return locations.map((loc) => {
                const meta = CITY_METADATA[loc.name];
                const fallbackLat = meta?.latitude ?? null;
                const fallbackLng = meta?.longitude ?? null;
                const subCities = (loc.children || []).map((sub) => this.toNode(sub, (sub.children || []).map((n) => this.toNode(n))));
                const prices = [
                    ...(loc.properties || []),
                    ...(loc.children || []).flatMap((sub) => [
                        ...(sub.properties || []),
                        ...(sub.children || []).flatMap((n) => n.properties || []),
                    ]),
                ].map((p) => Number(p.price)).filter((n) => Number.isFinite(n) && n > 0);
                return {
                    id: loc.id,
                    name: loc.name,
                    slug: toSlug(loc.name),
                    propertiesCount: prices.length,
                    startingRentETB: prices.length > 0 ? Math.min(...prices) : null,
                    latitude: toCoordinate(loc.latitude, 90) ?? fallbackLat,
                    longitude: toCoordinate(loc.longitude, 180) ?? fallbackLng,
                    subCities,
                };
            });
        }
        return Object.entries(CITY_METADATA).map(([name, meta], index) => ({
            id: `c${index + 1}`,
            name,
            slug: toSlug(name),
            propertiesCount: 0,
            startingRentETB: null,
            latitude: meta.latitude,
            longitude: meta.longitude,
            subCities: meta.subCities.map((subCityName) => ({
                id: `${toSlug(name)}-${toSlug(subCityName)}`,
                name: subCityName,
                slug: toSlug(subCityName),
                latitude: null,
                longitude: null,
                children: [],
            })),
        }));
    }
    async findOne(slug) {
        const all = await this.findAll();
        const city = all.find((c) => c.slug === slug) || all[0];
        return city;
    }
};
exports.CitiesController = CitiesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get all Ethiopian cities with market statistics and their sub-city / neighborhood hierarchy",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":slug"),
    (0, swagger_1.ApiOperation)({ summary: "Get city overview by slug" }),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "findOne", null);
exports.CitiesController = CitiesController = __decorate([
    (0, swagger_1.ApiTags)("cities"),
    (0, common_1.Controller)("cities"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CitiesController);
//# sourceMappingURL=cities.controller.js.map