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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const session_auth_guard_1 = require("../common/guards/session-auth.guard");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    actorId(req) {
        return req?.user?.id;
    }
    getOverview() {
        return this.adminService.getOverview();
    }
    getAnalytics(days) {
        const parsed = Number(days);
        const range = Number.isFinite(parsed) && parsed > 0 && parsed <= 365 ? Math.floor(parsed) : 30;
        return this.adminService.getAnalytics(range);
    }
    listProperties(status, search) {
        return this.adminService.listProperties(status, search);
    }
    listUsers(search) {
        return this.adminService.listUsers(search);
    }
    updateUser(id, body, req) {
        return this.adminService.updateUser(id, body, this.actorId(req));
    }
    listReports() {
        return this.adminService.listReports();
    }
    resolveReport(id, body, req) {
        return this.adminService.resolveReport(id, body.status, this.actorId(req));
    }
    listVisits() {
        return this.adminService.listVisits();
    }
    listLocations(type) {
        const allowed = ["city", "sub_city", "neighborhood"];
        const requested = (type || "city");
        return this.adminService.listLocations(allowed.includes(requested) ? requested : "city");
    }
    getAuditLogs() {
        return this.adminService.getAuditLogs();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)("overview"),
    (0, swagger_1.ApiOperation)({ summary: "Headline platform metrics with week-on-week trends" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)("analytics"),
    (0, swagger_1.ApiOperation)({ summary: "Time series and breakdowns derived from live data" }),
    __param(0, (0, common_1.Query)("days")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)("properties"),
    (0, swagger_1.ApiOperation)({ summary: "Listings, optionally filtered by moderation status" }),
    __param(0, (0, common_1.Query)("status")),
    __param(1, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listProperties", null);
__decorate([
    (0, common_1.Get)("users"),
    (0, swagger_1.ApiOperation)({ summary: "Platform accounts with role, status and listing counts" }),
    __param(0, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listUsers", null);
__decorate([
    (0, common_1.Patch)("users/:id"),
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, swagger_1.ApiOperation)({ summary: "Change a user's role, status, poster type or verification" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)("reports"),
    (0, swagger_1.ApiOperation)({ summary: "Listing reports raised by users" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listReports", null);
__decorate([
    (0, common_1.Patch)("reports/:id"),
    (0, swagger_1.ApiOperation)({ summary: "Resolve or dismiss a report" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "resolveReport", null);
__decorate([
    (0, common_1.Get)("visits"),
    (0, swagger_1.ApiOperation)({ summary: "Walkthrough requests" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listVisits", null);
__decorate([
    (0, common_1.Get)("locations"),
    (0, swagger_1.ApiOperation)({ summary: "Cities, sub-cities or neighborhoods with live listing counts" }),
    __param(0, (0, common_1.Query)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listLocations", null);
__decorate([
    (0, common_1.Get)("audit-logs"),
    (0, swagger_1.ApiOperation)({ summary: "Recent administrative actions" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAuditLogs", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)("admin"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN", "MODERATOR"),
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map