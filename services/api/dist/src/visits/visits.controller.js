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
exports.VisitsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const visits_service_1 = require("./visits.service");
const create_visit_dto_1 = require("./dto/create-visit.dto");
const session_auth_guard_1 = require("../common/guards/session-auth.guard");
let VisitsController = class VisitsController {
    constructor(visitsService) {
        this.visitsService = visitsService;
    }
    create(dto, req) {
        return this.visitsService.create(req.user.id, dto);
    }
    findMine(req) {
        return this.visitsService.findForUser(req.user.id);
    }
    updateStatus(id, dto, req) {
        return this.visitsService.updateStatus(req.user.id, id, dto);
    }
};
exports.VisitsController = VisitsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Request a viewing of a property" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_visit_dto_1.CreateVisitDto, Object]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Viewings the caller requested, plus those on properties they own" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "findMine", null);
__decorate([
    (0, common_1.Patch)(":id/status"),
    (0, swagger_1.ApiOperation)({ summary: "Accept, decline, complete or cancel a viewing request" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_visit_dto_1.UpdateVisitStatusDto, Object]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "updateStatus", null);
exports.VisitsController = VisitsController = __decorate([
    (0, swagger_1.ApiTags)("visits"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, common_1.Controller)("visits"),
    __metadata("design:paramtypes", [visits_service_1.VisitsService])
], VisitsController);
//# sourceMappingURL=visits.controller.js.map