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
exports.ReportsController = exports.CreateReportDto = exports.REPORT_REASONS = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const prisma_service_1 = require("../prisma/prisma.service");
const session_auth_guard_1 = require("../common/guards/session-auth.guard");
exports.REPORT_REASONS = [
    "scam",
    "incorrect_information",
    "duplicate_listing",
    "inappropriate_content",
    "fake_property",
    "suspicious_behaviour",
    "other",
];
class CreateReportDto {
}
exports.CreateReportDto = CreateReportDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "propertyId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(exports.REPORT_REASONS),
    __metadata("design:type", Object)
], CreateReportDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateReportDto.prototype, "details", void 0);
let ReportsController = class ReportsController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, req) {
        const property = await this.prisma.property.findUnique({
            where: { id: dto.propertyId },
            select: { id: true },
        });
        if (!property)
            throw new common_1.NotFoundException("That property does not exist.");
        const reason = dto.details ? `${dto.reason}: ${dto.details}` : dto.reason;
        const report = await this.prisma.report.create({
            data: {
                propertyId: dto.propertyId,
                userId: req.user.id,
                reason,
                status: "open",
            },
        });
        return { id: report.id, status: report.status, createdAt: report.createdAt };
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Report a property listing" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReportDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "create", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)("reports"),
    (0, common_1.Controller)("reports"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map