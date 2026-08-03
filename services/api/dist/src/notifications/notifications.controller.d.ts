import { NotificationsService } from "./notifications.service";
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotifications(userId: string): Promise<{
        id: string;
        title: string;
        message: string;
        type: string;
        read: boolean;
        createdAt: string;
    }[]>;
}
