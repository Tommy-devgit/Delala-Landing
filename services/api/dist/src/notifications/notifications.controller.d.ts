import { NotificationsService } from "./notifications.service";
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findMine(req: any): Promise<{
        id: string;
        type: string;
        title: string;
        body: string;
        propertyId: string;
        read: boolean;
        createdAt: Date;
    }[]>;
    unreadCount(req: any): Promise<{
        count: number;
    }>;
    markAllRead(req: any): Promise<{
        updated: number;
    }>;
    markRead(id: string, req: any): Promise<{
        id: string;
        read: boolean;
    }>;
    findByUser(req: any): Promise<{
        id: string;
        type: string;
        title: string;
        body: string;
        propertyId: string;
        read: boolean;
        createdAt: Date;
    }[]>;
}
