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
let CitiesController = class CitiesController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const locations = await this.prisma.location.findMany({
            where: { type: "city" },
            include: { children: true },
        });
        if (locations.length > 0) {
            return locations.map((loc) => ({
                id: loc.id,
                name: loc.name,
                slug: loc.name.toLowerCase().replace(/\s+/g, "-"),
                tagline: "Prime Real Estate Location",
                startingRentETB: 35000,
                propertiesCount: 8,
                image: "/images/hero_property.png",
            }));
        }
        return [
            { id: "c1", name: "Addis Ababa", slug: "addis-ababa", tagline: "Diplomatic Capital & Financial Hub", startingRentETB: 35000, propertiesCount: 14, image: "/images/hero_property.png" },
            { id: "c2", name: "Hawassa", slug: "hawassa", tagline: "Rift Valley Lakeside Living", startingRentETB: 22000, propertiesCount: 6, image: "/images/hero_home_away.jpg" },
            { id: "c3", name: "Adama", slug: "adama", tagline: "Fastest Growing Expressway Corridor", startingRentETB: 18000, propertiesCount: 5, image: "/images/hero_property.png" },
            { id: "c4", name: "Bahir Dar", slug: "bahir-dar", tagline: "Lake Tana Tourism & Commercial Hub", startingRentETB: 20000, propertiesCount: 4, image: "/images/hero_home_away.jpg" },
        ];
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
    (0, swagger_1.ApiOperation)({ summary: "Get all Ethiopian cities with market statistics" }),
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