import { PrismaService } from "../prisma/prisma.service";
export type NotificationType = "LISTING_APPROVED" | "LISTING_REJECTED" | "VISIT_REQUESTED" | "VISIT_CONFIRMED" | "PROPERTY_SAVED" | "SYSTEM";
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(input: {
        userId: string;
        type: NotificationType;
        title: string;
        body?: string;
        propertyId?: string | null;
    }): Promise<{
        id: string;
        title: string;
        createdAt: Date | null;
        type: string;
        propertyId: string | null;
        body: string | null;
        read: boolean | null;
        userId: string;
    }>;
    findByUser(userId: string): Promise<{
        id: string;
        type: string;
        title: string;
        body: string;
        propertyId: string;
        read: boolean;
        createdAt: Date;
    }[]>;
    unreadCount(userId: string): Promise<{
        count: number;
    }>;
    markRead(userId: string, id: string): Promise<{
        id: string;
        read: boolean;
    }>;
    markAllRead(userId: string): Promise<{
        updated: number;
    }>;
}
