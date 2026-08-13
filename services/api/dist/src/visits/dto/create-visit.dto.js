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
exports.UpdateVisitStatusDto = exports.CreateVisitDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const visits_service_1 = require("../visits.service");
class CreateVisitDto {
}
exports.CreateVisitDto = CreateVisitDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "9f1c2b3a-4d5e-4f60-8a71-2b3c4d5e6f70" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "propertyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2026-09-14T10:00:00.000Z" }),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "visitDate", void 0);
class UpdateVisitStatusDto {
}
exports.UpdateVisitStatusDto = UpdateVisitStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "accepted", enum: visits_service_1.VISIT_STATUSES }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(visits_service_1.VISIT_STATUSES),
    __metadata("design:type", String)
], UpdateVisitStatusDto.prototype, "status", void 0);
//# sourceMappingURL=create-visit.dto.js.map