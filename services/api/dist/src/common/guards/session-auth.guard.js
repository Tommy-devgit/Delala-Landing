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
exports.SessionAuthGuard = exports.bearerToken = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const session_token_1 = require("../session-token");
const bearerToken = (authorization) => {
    if (!authorization)
        return undefined;
    return authorization.replace(/^Bearer\s+/i, "").trim() || undefined;
};
exports.bearerToken = bearerToken;
let SessionAuthGuard = class SessionAuthGuard {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = (0, exports.bearerToken)(request.headers?.authorization);
        if (!token) {
            throw new common_1.UnauthorizedException("Sign in to continue.");
        }
        const claims = (0, session_token_1.verifySessionToken)(token);
        if (!claims) {
            throw new common_1.UnauthorizedException("That session is no longer valid. Please sign in again.");
        }
        const user = await this.prisma.user.findUnique({
            where: { id: claims.userId },
            include: { profile: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("That account no longer exists.");
        }
        const profile = user.profile;
        if (profile?.status && String(profile.status).toLowerCase() === "suspended") {
            throw new common_1.UnauthorizedException("This account has been suspended.");
        }
        const authenticated = {
            id: user.id,
            email: user.email,
            role: (profile?.role || "user").toUpperCase(),
            status: (profile?.status || "active").toUpperCase(),
        };
        request.user = authenticated;
        return true;
    }
};
exports.SessionAuthGuard = SessionAuthGuard;
exports.SessionAuthGuard = SessionAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SessionAuthGuard);
//# sourceMappingURL=session-auth.guard.js.map