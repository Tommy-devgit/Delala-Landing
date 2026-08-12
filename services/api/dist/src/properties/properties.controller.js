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
exports.PropertiesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const properties_service_1 = require("./properties.service");
const create_property_dto_1 = require("./dto/create-property.dto");
const r2_storage_service_1 = require("../storage/r2-storage.service");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const session_auth_guard_1 = require("../common/guards/session-auth.guard");
const session_token_1 = require("../common/session-token");
const admin_service_1 = require("../admin/admin.service");
const notifications_service_1 = require("../notifications/notifications.service");
const userIdFromAuthHeader = (authorization) => {
    if (!authorization)
        return undefined;
    const token = (0, session_auth_guard_1.bearerToken)(authorization);
    return token ? (0, session_token_1.verifySessionToken)(token)?.userId : undefined;
};
let PropertiesController = class PropertiesController {
    constructor(propertiesService, r2StorageService, adminService, notifications) {
        this.propertiesService = propertiesService;
        this.r2StorageService = r2StorageService;
        this.adminService = adminService;
        this.notifications = notifications;
    }
    findAll(query) {
        return this.propertiesService.findAll(query);
    }
    findOne(slug) {
        return this.propertiesService.findOneBySlug(slug);
    }
    async uploadImage(file) {
        if (!file)
            return { url: "/images/hero_property.png" };
        const url = await this.r2StorageService.uploadImage(file);
        return { url };
    }
    async create(createDto, files, authorization) {
        const uploadedUrls = [];
        if (files && files.length > 0) {
            for (const file of files) {
                const url = await this.r2StorageService.uploadImage(file);
                uploadedUrls.push(url);
            }
        }
        return this.propertiesService.create(createDto, uploadedUrls, userIdFromAuthHeader(authorization));
    }
    async moderate(id, moderateDto, req) {
        const result = await this.propertiesService.moderate(id, moderateDto);
        const approved = moderateDto.status === "APPROVED";
        await this.notifications.create({
            userId: result.brokerId,
            type: approved ? "LISTING_APPROVED" : "LISTING_REJECTED",
            title: approved ? "Your listing is live" : "Your listing needs changes",
            body: approved
                ? `"${result.title}" passed review and is now visible on the marketplace.`
                : `"${result.title}" was not approved. ${moderateDto.rejectionReason || "Please review the details and resubmit."}`,
            propertyId: id,
        });
        await this.adminService.recordAudit(req?.user?.id, `property.${moderateDto.status.toLowerCase()}`, "properties", id);
        return result;
    }
};
exports.PropertiesController = PropertiesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all verified approved marketplace property listings" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns list of approved properties" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":slug"),
    (0, swagger_1.ApiOperation)({ summary: "Get property details by slug" }),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiOperation)({ summary: "Upload single image to Cloudflare R2 bucket" }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("images")),
    (0, swagger_1.ApiOperation)({ summary: "Submit a new property listing with optional Cloudflare R2 images" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_dto_1.CreatePropertyDto, Array, String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id/moderate"),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN", "MODERATOR"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Moderate property submission (Approve / Reject)" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_property_dto_1.ModeratePropertyDto, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "moderate", null);
exports.PropertiesController = PropertiesController = __decorate([
    (0, swagger_1.ApiTags)("properties"),
    (0, common_1.Controller)("properties"),
    __metadata("design:paramtypes", [properties_service_1.PropertiesService,
        r2_storage_service_1.R2StorageService,
        admin_service_1.AdminService,
        notifications_service_1.NotificationsService])
], PropertiesController);
//# sourceMappingURL=properties.controller.js.map