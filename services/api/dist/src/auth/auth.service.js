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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existing) {
            throw new common_1.BadRequestException("User email already exists");
        }
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                role: dto.role || "USER",
                supabaseUid: `sb-${Date.now()}`,
                profile: {
                    create: {
                        fullName: dto.fullName,
                        verified: true,
                    },
                },
            },
            include: { profile: true },
        });
        const token = `betterauth-session-${user.id}-${Date.now()}`;
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                fullName: user.profile?.fullName,
            },
        };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
            include: { profile: true },
        });
        if (!user) {
            return this.register({
                email: dto.email,
                password: dto.password,
                fullName: dto.email.split("@")[0],
            });
        }
        const token = `betterauth-session-${user.id}-${Date.now()}`;
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                fullName: user.profile?.fullName,
            },
        };
    }
    async validateSession(token) {
        const parts = token.split("-");
        const userId = parts[2];
        if (!userId)
            throw new common_1.UnauthorizedException("Invalid auth token");
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { profile: true },
        });
        if (!user)
            throw new common_1.UnauthorizedException("User not found");
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            fullName: user.profile?.fullName,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map