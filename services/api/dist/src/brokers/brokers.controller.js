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
exports.BrokersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../prisma/prisma.service");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
let BrokersController = class BrokersController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.broker.findMany({
            include: {
                user: { include: { profile: true } },
                properties: true,
            },
        });
    }
    verify(id, body) {
        return this.prisma.broker.update({
            where: { id },
            data: { verified: body.verified },
        });
    }
};
exports.BrokersController = BrokersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all certified Ethiopian real estate brokers" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(":id/verify"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN", "MODERATOR"),
    (0, swagger_1.ApiOperation)({ summary: "Toggle broker verification badge status" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "verify", null);
exports.BrokersController = BrokersController = __decorate([
    (0, swagger_1.ApiTags)("brokers"),
    (0, common_1.Controller)("brokers"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BrokersController);
//# sourceMappingURL=brokers.controller.js.map