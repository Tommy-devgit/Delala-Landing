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
const client_1 = require("@prisma/client");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(dto) {
        try {
            const existing = await this.prisma.user.findUnique({
                where: { email: dto.email },
            });
            if (existing) {
                throw new common_1.BadRequestException("User email already exists");
            }
            let validRole = client_1.UserRole.USER;
            if (dto.role && Object.values(client_1.UserRole).includes(dto.role)) {
                validRole = dto.role;
            }
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    role: validRole,
                    supabaseUid: `sb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                    profile: {
                        create: {
                            fullName: dto.fullName || dto.email.split("@")[0],
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
                    fullName: user.profile?.fullName || dto.fullName,
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
                    fullName: user.profile?.fullName || user.email,
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
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map