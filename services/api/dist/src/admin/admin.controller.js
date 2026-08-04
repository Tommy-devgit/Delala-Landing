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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../prisma/prisma.service");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
let AdminController = class AdminController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOverview() {
        const [totalUsers, totalProperties, pendingApprovals, totalBrokers, pendingReports] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.property.count({ where: { status: "APPROVED" } }),
            this.prisma.property.count({ where: { status: "PENDING_APPROVAL" } }),
            this.prisma.broker.count({ where: { verified: true } }),
            this.prisma.report.count({ where: { status: "PENDING" } }),
        ]);
        return {
            metrics: {
                totalUsers,
                totalProperties,
                pendingApprovals,
                totalBrokers,
                pendingReports,
                systemHealth: "100% Operational",
            },
            timestamp: new Date().toISOString(),
        };
    }
    getAuditLogs() {
        return this.prisma.auditLog.findMany({
            take: 50,
            orderBy: { createdAt: "desc" },
        });
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)("overview"),
    (0, swagger_1.ApiOperation)({ summary: "Get platform administrative overview metrics" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)("audit-logs"),
    (0, swagger_1.ApiOperation)({ summary: "Get system security audit logs" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAuditLogs", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)("admin"),
    (0, common_1.Controller)("admin"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN", "MODERATOR"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map