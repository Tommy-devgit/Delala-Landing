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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(dto) {
        try {
            const existing = await this.prisma.user.findFirst({
                where: { email: dto.email },
            });
            if (existing) {
                throw new common_1.BadRequestException("User email already exists");
            }
            const userId = (0, crypto_1.randomUUID)();
            const names = (dto.fullName || "User").trim().split(" ");
            const firstName = names[0] || "User";
            const lastName = names.slice(1).join(" ") || "";
            const user = await this.prisma.user.create({
                data: {
                    id: userId,
                    email: dto.email,
                    profile: {
                        create: {
                            firstName,
                            lastName,
                            role: (dto.role || "user").toLowerCase(),
                        },
                    },
                },
                include: { profile: true },
            });
            const token = `betterauth-session-${user.id}-${Date.now()}`;
            const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || dto.email;
            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.profile?.role || "user",
                    fullName,
                },
            };
        }
        catch (err) {
            this.logger.error(`Register failed for ${dto.email}: ${err.message}`, err.stack);
            if (err instanceof common_1.BadRequestException)
                throw err;
            throw new common_1.BadRequestException(err.message || "Failed to complete account registration.");
        }
    }
    async login(dto) {
        try {
            const user = await this.prisma.user.findFirst({
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
            const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || user.email;
            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.profile?.role || "user",
                    fullName,
                },
            };
        }
        catch (err) {
            this.logger.error(`Login failed for ${dto.email}: ${err.message}`, err.stack);
            throw new common_1.BadRequestException(err.message || "Invalid credentials.");
        }
    }
    async validateSession(token) {
        const parts = token.split("-");
        const userId = parts[2];
        if (!userId)
            throw new common_1.UnauthorizedException("Invalid auth token");
        const user = await this.prisma.user.findFirst({
            where: { id: userId },
            include: { profile: true },
        });
        if (!user)
            throw new common_1.UnauthorizedException("User not found");
        const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || user.email;
        return {
            id: user.id,
            email: user.email,
            role: user.profile?.role || "user",
            fullName,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map