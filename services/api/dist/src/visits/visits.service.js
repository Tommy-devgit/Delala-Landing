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
exports.VisitsService = exports.VISIT_STATUSES = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
exports.VISIT_STATUSES = ["requested", "accepted", "declined", "completed", "cancelled"];
let VisitsService = class VisitsService {
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async create(userId, dto) {
        const property = await this.prisma.property.findUnique({
            where: { id: dto.propertyId },
            select: { id: true, title: true, ownerId: true },
        });
        if (!property)
            throw new common_1.NotFoundException("That property does not exist.");
        const visitDate = new Date(dto.visitDate);
        if (Number.isNaN(visitDate.getTime())) {
            throw new common_1.BadRequestException("That is not a valid date and time.");
        }
        if (visitDate.getTime() < Date.now()) {
            throw new common_1.BadRequestException("Pick a date in the future.");
        }
        const visit = await this.prisma.visit.create({
            data: {
                propertyId: property.id,
                userId,
                visitDate,
                status: "requested",
            },
        });
        if (property.ownerId !== userId) {
            await this.notifications.create({
                userId: property.ownerId,
                type: "VISIT_REQUESTED",
                title: "Someone wants to view your property",
                body: `A viewing of "${property.title}" was requested for ${visitDate.toLocaleString("en-GB", {
                    dateStyle: "full",
                    timeStyle: "short",
                })}.`,
                propertyId: property.id,
            });
        }
        return visit;
    }
    async findForUser(userId) {
        const visits = await this.prisma.visit.findMany({
            where: {
                OR: [{ userId }, { property: { ownerId: userId } }],
            },
            include: {
                property: { select: { id: true, title: true, ownerId: true } },
                user: { include: { profile: true } },
            },
            orderBy: { visitDate: "desc" },
        });
        return visits.map((visit) => ({
            id: visit.id,
            status: visit.status,
            visitDate: visit.visitDate,
            createdAt: visit.createdAt,
            property: visit.property,
            role: visit.property?.ownerId === userId ? "owner" : "requester",
            requester: {
                id: visit.userId,
                name: [visit.user?.profile?.firstName, visit.user?.profile?.lastName].filter(Boolean).join(" ") ||
                    "Delala member",
                phone: visit.property?.ownerId === userId ? visit.user?.profile?.phone || null : null,
            },
        }));
    }
    async updateStatus(userId, visitId, dto) {
        const visit = await this.prisma.visit.findUnique({
            where: { id: visitId },
            include: { property: { select: { id: true, title: true, ownerId: true } } },
        });
        if (!visit || !visit.property)
            throw new common_1.NotFoundException("That viewing request does not exist.");
        const isOwner = visit.property.ownerId === userId;
        const isRequester = visit.userId === userId;
        if (!isOwner && !isRequester) {
            throw new common_1.ForbiddenException("That viewing request is not yours.");
        }
        const allowed = isOwner ? ["accepted", "declined", "completed", "cancelled"] : ["cancelled"];
        if (!allowed.includes(dto.status)) {
            throw new common_1.ForbiddenException("You cannot set that status on this viewing.");
        }
        const updated = await this.prisma.visit.update({
            where: { id: visitId },
            data: { status: dto.status },
        });
        const recipient = isOwner ? visit.userId : visit.property.ownerId;
        if (recipient && recipient !== userId) {
            const wasAccepted = dto.status === "accepted";
            await this.notifications.create({
                userId: recipient,
                type: wasAccepted ? "VISIT_CONFIRMED" : "SYSTEM",
                title: wasAccepted ? "Your viewing was confirmed" : `Viewing ${dto.status}`,
                body: `"${visit.property.title}" — the viewing request is now ${dto.status}.`,
                propertyId: visit.property.id,
            });
        }
        return updated;
    }
};
exports.VisitsService = VisitsService;
exports.VisitsService = VisitsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], VisitsService);
//# sourceMappingURL=visits.service.js.map