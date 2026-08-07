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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersController = class UsersController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.user.findMany({
            include: { profile: true },
            orderBy: { createdAt: "desc" },
        });
    }
    async getProfile(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { profile: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const profile = user.profile || {};
        const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ") || user.email || "User";
        let bio = "";
        let avatarUrl = profile.avatarUrl || "/images/hero_home_away.jpg";
        try {
            const rows = await this.prisma.$queryRawUnsafe(`SELECT bio, avatar_url FROM public.profiles WHERE id = $1::uuid`, id);
            if (rows[0]) {
                if (rows[0].bio)
                    bio = rows[0].bio;
                if (rows[0].avatar_url)
                    avatarUrl = rows[0].avatar_url;
            }
        }
        catch {
        }
        return {
            id: user.id,
            email: user.email,
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            fullName,
            phone: profile.phone || "",
            avatarUrl,
            bio,
            role: profile.role || "user",
            createdAt: user.createdAt,
        };
    }
    async updateProfile(id, body) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { profile: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        let firstName = body.firstName;
        let lastName = body.lastName;
        if (!firstName && body.fullName) {
            const parts = body.fullName.trim().split(" ");
            firstName = parts[0];
            lastName = parts.slice(1).join(" ");
        }
        const profileData = {};
        if (firstName !== undefined)
            profileData.firstName = firstName;
        if (lastName !== undefined)
            profileData.lastName = lastName;
        if (body.phone !== undefined)
            profileData.phone = body.phone;
        if (body.role !== undefined)
            profileData.role = body.role.toLowerCase();
        const updatedProfile = await this.prisma.profile.upsert({
            where: { id },
            create: {
                id,
                firstName: firstName || "User",
                lastName: lastName || "",
                phone: body.phone || null,
                role: body.role ? body.role.toLowerCase() : "user",
            },
            update: profileData,
        });
        if (body.bio !== undefined) {
            try {
                await this.prisma.$executeRawUnsafe(`UPDATE public.profiles SET bio = $1 WHERE id = $2::uuid`, body.bio, id);
            }
            catch (err) {
                console.warn("Failed to update bio in profiles table:", err);
            }
        }
        if (body.avatarUrl !== undefined) {
            try {
                await this.prisma.$executeRawUnsafe(`UPDATE public.profiles SET avatar_url = $1 WHERE id = $2::uuid`, body.avatarUrl, id);
            }
            catch (err) {
                console.warn("Failed to update avatar_url in profiles table:", err);
            }
        }
        const fullName = [updatedProfile.firstName, updatedProfile.lastName].filter(Boolean).join(" ") || user.email || "User";
        return {
            id: user.id,
            email: user.email,
            firstName: updatedProfile.firstName || "",
            lastName: updatedProfile.lastName || "",
            fullName,
            phone: updatedProfile.phone || "",
            avatarUrl: body.avatarUrl !== undefined ? body.avatarUrl : (updatedProfile.avatarUrl || "/images/hero_home_away.jpg"),
            bio: body.bio !== undefined ? body.bio : "",
            role: updatedProfile.role || "user",
            createdAt: user.createdAt,
        };
    }
    async updateRole(id, body) {
        return this.prisma.profile.update({
            where: { id },
            data: { role: body.role.toLowerCase() },
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all platform users" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("profile/:id"),
    (0, swagger_1.ApiOperation)({ summary: "Get user profile by ID" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)("profile/:id"),
    (0, swagger_1.ApiOperation)({ summary: "Update user profile details" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)(":id/role"),
    (0, swagger_1.ApiOperation)({ summary: "Assign platform role to user" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateRole", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)("users"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersController);
//# sourceMappingURL=users.controller.js.map