export declare class NotificationsService {
    getNotifications(userId: string): Promise<{
        id: string;
        title: string;
        message: string;
        type: string;
        read: boolean;
        createdAt: string;
    }[]>;
}
