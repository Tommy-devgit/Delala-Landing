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
const userIdFromAuthHeader = (authorization) => {
    if (!authorization)
        return undefined;
    const token = authorization.replace(/^Bearer\s+/i, "");
    const match = token.match(/^betterauth-session-([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})-\d+$/i);
    return match?.[1];
};
let PropertiesController = class PropertiesController {
    constructor(propertiesService, r2StorageService) {
        this.propertiesService = propertiesService;
        this.r2StorageService = r2StorageService;
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
    moderate(id, moderateDto) {
        return this.propertiesService.moderate(id, moderateDto);
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
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN", "MODERATOR"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Moderate property submission (Approve / Reject)" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_property_dto_1.ModeratePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "moderate", null);
exports.PropertiesController = PropertiesController = __decorate([
    (0, swagger_1.ApiTags)("properties"),
    (0, common_1.Controller)("properties"),
    __metadata("design:paramtypes", [properties_service_1.PropertiesService,
        r2_storage_service_1.R2StorageService])
], PropertiesController);
//# sourceMappingURL=properties.controller.js.map