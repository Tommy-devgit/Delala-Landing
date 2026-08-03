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
exports.CreateVisitDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateVisitDto {
}
exports.CreateVisitDto = CreateVisitDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "p1" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "propertyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "u1" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "seekerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "b1" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "brokerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2026-08-10" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "scheduledDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "10:00 AM" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "timeSlot", void 0);
//# sourceMappingURL=create-visit.dto.js.map