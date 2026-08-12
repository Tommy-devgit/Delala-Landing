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
exports.ReviewsController = exports.CreateReviewDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const prisma_service_1 = require("../prisma/prisma.service");
const session_auth_guard_1 = require("../common/guards/session-auth.guard");
class CreateReviewDto {
}
exports.CreateReviewDto = CreateReviewDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "propertyId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "comment", void 0);
let ReviewsController = class ReviewsController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(propertyId, posterId) {
        if (!propertyId && !posterId) {
            throw new common_1.BadRequestException("Pass either propertyId or posterId.");
        }
        const reviews = await this.prisma.review.findMany({
            where: propertyId
                ? { propertyId }
                : { property: { ownerId: posterId } },
            include: {
                user: { include: { profile: true } },
                property: { select: { id: true, title: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        const rated = reviews.filter((r) => typeof r.rating === "number");
        const average = rated.length
            ? Number((rated.reduce((sum, r) => sum + (r.rating || 0), 0) / rated.length).toFixed(1))
            : null;
        return {
            average,
            count: reviews.length,
            data: reviews.map((r) => ({
                id: r.id,
                rating: r.rating,
                comment: r.comment || "",
                createdAt: r.createdAt,
                property: r.property,
                author: {
                    id: r.userId,
                    name: [r.user?.profile?.firstName, r.user?.profile?.lastName].filter(Boolean).join(" ") ||
                        "Delala member",
                    avatarUrl: r.user?.profile?.avatarUrl || null,
                },
            })),
        };
    }
    async create(dto, req) {
        const property = await this.prisma.property.findUnique({
            where: { id: dto.propertyId },
            select: { id: true, ownerId: true },
        });
        if (!property)
            throw new common_1.NotFoundException("That property does not exist.");
        if (property.ownerId === req.user.id) {
            throw new common_1.ForbiddenException("You cannot review your own listing.");
        }
        const existing = await this.prisma.review.findFirst({
            where: { propertyId: dto.propertyId, userId: req.user.id },
        });
        if (existing) {
            throw new common_1.BadRequestException("You have already reviewed this property.");
        }
        const review = await this.prisma.review.create({
            data: {
                propertyId: dto.propertyId,
                userId: req.user.id,
                rating: dto.rating,
                comment: dto.comment || null,
            },
            include: { user: { include: { profile: true } } },
        });
        return {
            id: review.id,
            rating: review.rating,
            comment: review.comment || "",
            createdAt: review.createdAt,
            author: {
                id: review.userId,
                name: [review.user?.profile?.firstName, review.user?.profile?.lastName].filter(Boolean).join(" ") ||
                    "Delala member",
                avatarUrl: review.user?.profile?.avatarUrl || null,
            },
        };
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Reviews for a property, or for everything a poster has listed" }),
    __param(0, (0, common_1.Query)("propertyId")),
    __param(1, (0, common_1.Query)("posterId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Leave a review on a property" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReviewDto, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "create", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)("reviews"),
    (0, common_1.Controller)("reviews"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map