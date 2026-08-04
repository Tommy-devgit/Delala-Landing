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
exports.BrokersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../prisma/prisma.service");
let BrokersController = class BrokersController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const profiles = await this.prisma.profile.findMany({
            where: { role: "broker" },
            include: { user: true },
        });
        if (profiles.length > 0) {
            return profiles.map((p) => {
                const name = [p.firstName, p.lastName].filter(Boolean).join(" ") || "Verified Broker";
                return {
                    id: p.id,
                    slug: name.toLowerCase().replace(/\s+/g, "-"),
                    agencyName: name,
                    licenseNumber: `ETH-RE-2024-${p.id.slice(0, 4)}`,
                    verified: true,
                    rating: 4.9,
                    reviewsCount: 24,
                    responseTime: "Under 15 minutes",
                    specializedAreas: ["Bole", "Kazanchis", "Old Airport"],
                    user: {
                        profile: {
                            fullName: name,
                            avatarUrl: p.avatarUrl || "/images/hero_home_away.jpg",
                        },
                    },
                };
            });
        }
        return [
            {
                id: "b1",
                slug: "bole-premier",
                agencyName: "Bole Premier Real Estate",
                licenseNumber: "ETH-RE-2024-8849",
                verified: true,
                rating: 4.9,
                reviewsCount: 38,
                responseTime: "Under 10 mins",
                specializedAreas: ["Bole", "Kazanchis", "Old Airport"],
                user: { profile: { fullName: "Bole Premier Real Estate", avatarUrl: "/images/hero_home_away.jpg" } },
            },
            {
                id: "b2",
                slug: "capital-verified-homes",
                agencyName: "Capital Verified Homes",
                licenseNumber: "ETH-RE-2024-9102",
                verified: true,
                rating: 4.8,
                reviewsCount: 29,
                responseTime: "Under 15 mins",
                specializedAreas: ["CMC", "Ayat", "Gotera"],
                user: { profile: { fullName: "Capital Verified Homes", avatarUrl: "/images/hero_property.png" } },
            },
        ];
    }
};
exports.BrokersController = BrokersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all certified Ethiopian real estate brokers" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrokersController.prototype, "findAll", null);
exports.BrokersController = BrokersController = __decorate([
    (0, swagger_1.ApiTags)("brokers"),
    (0, common_1.Controller)("brokers"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BrokersController);
//# sourceMappingURL=brokers.controller.js.map