import { PrismaService } from "../prisma/prisma.service";
import { CreateVisitDto, UpdateVisitStatusDto } from "./dto/create-visit.dto";
import { NotificationsService } from "../notifications/notifications.service";
export declare const VISIT_STATUSES: readonly ["requested", "accepted", "declined", "completed", "cancelled"];
export type VisitStatus = (typeof VISIT_STATUSES)[number];
export declare class VisitsService {
    private prisma;
    private notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    create(userId: string, dto: CreateVisitDto): Promise<{
        id: string;
        createdAt: Date | null;
        status: string | null;
        userId: string | null;
        propertyId: string | null;
        visitDate: Date | null;
    }>;
    findForUser(userId: string): Promise<{
        id: any;
        status: any;
        visitDate: any;
        createdAt: any;
        property: any;
        role: string;
        requester: {
            id: any;
            name: string;
            phone: any;
        };
    }[]>;
    updateStatus(userId: string, visitId: string, dto: UpdateVisitStatusDto): Promise<{
        id: string;
        createdAt: Date | null;
        status: string | null;
        userId: string | null;
        propertyId: string | null;
        visitDate: Date | null;
    }>;
}
