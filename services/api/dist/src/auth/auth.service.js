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
const password_1 = require("../common/password");
const session_token_1 = require("../common/session-token");
const BAD_CREDENTIALS = "Email or password is incorrect.";
const DECOY_DIGEST = "scrypt$16384$8$1$y2i8H8N2hkbXiwy6QJH8/Q==$RB663gFQFvRph5lMr4VqEEYGM5A8BlVnTEXOSAc0p2f6zeFmSLHqlJVJZ6U8nR74t27LGvSJCdkEdZ32yk4X2A==";
const LOGIN_PROFILE_FIELDS = {
    firstName: true,
    lastName: true,
    role: true,
    status: true,
    avatarUrl: true,
    phone: true,
    passwordHash: true,
};
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
            const passwordHash = await (0, password_1.hashPassword)(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    id: userId,
                    email: dto.email,
                    profile: {
                        create: {
                            firstName,
                            lastName,
                            passwordHash,
                            role: (dto.role || "user").toLowerCase(),
                        },
                    },
                },
                include: { profile: true },
            });
            const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || dto.email;
            return {
                token: (0, session_token_1.issueSessionToken)(user.id),
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.profile?.role || "user",
                    fullName,
                    avatarUrl: user.profile?.avatarUrl || null,
                    phone: user.profile?.phone || null,
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
                include: { profile: { select: LOGIN_PROFILE_FIELDS } },
            });
            const matches = await (0, password_1.verifyPassword)(dto.password, user?.profile?.passwordHash || DECOY_DIGEST);
            if (!user || !matches) {
                throw new common_1.UnauthorizedException(BAD_CREDENTIALS);
            }
            if (String(user.profile?.status || "active").toLowerCase() === "suspended") {
                throw new common_1.UnauthorizedException("This account has been suspended.");
            }
            const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || user.email;
            return {
                token: (0, session_token_1.issueSessionToken)(user.id),
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.profile?.role || "user",
                    fullName,
                    avatarUrl: user.profile?.avatarUrl || null,
                    phone: user.profile?.phone || null,
                },
            };
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException)
                throw err;
            this.logger.error(`Login failed for ${dto.email}: ${err.message}`, err.stack);
            throw new common_1.BadRequestException(err.message || "Invalid credentials.");
        }
    }
    async requestPasswordReset(email) {
        const user = await this.prisma.user.findFirst({ where: { email }, include: { profile: true } });
        if (user?.profile) {
            const token = (0, password_1.generateResetToken)();
            await this.prisma.profile.update({
                where: { id: user.id },
                data: {
                    passwordResetHash: (0, password_1.hashResetToken)(token),
                    passwordResetExpires: new Date(Date.now() + 60 * 60 * 1000),
                },
            });
        }
        return {
            delivered: false,
            message: "Delala cannot send password reset emails yet. Ask an administrator to reset your password for you.",
        };
    }
    async resetPassword(email, token, newPassword) {
        if (!newPassword || newPassword.length < 6) {
            throw new common_1.BadRequestException("Choose a password of at least 6 characters.");
        }
        const user = await this.prisma.user.findFirst({
            where: { email },
            include: { profile: { select: { passwordResetHash: true, passwordResetExpires: true } } },
        });
        const profile = user?.profile;
        const expired = !profile?.passwordResetExpires || profile.passwordResetExpires.getTime() < Date.now();
        if (!user || !profile || expired || !(0, password_1.resetTokenMatches)(token, profile.passwordResetHash)) {
            throw new common_1.UnauthorizedException("That reset link is invalid or has expired.");
        }
        await this.prisma.profile.update({
            where: { id: user.id },
            data: {
                passwordHash: await (0, password_1.hashPassword)(newPassword),
                passwordResetHash: null,
                passwordResetExpires: null,
            },
        });
        return { ok: true };
    }
    async validateSession(token) {
        const claims = (0, session_token_1.verifySessionToken)(token);
        if (!claims)
            throw new common_1.UnauthorizedException("Invalid auth token");
        const user = await this.prisma.user.findFirst({
            where: { id: claims.userId },
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