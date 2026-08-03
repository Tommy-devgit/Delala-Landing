import { MessagesService } from "./messages.service";
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    sendMessage(body: {
        senderId: string;
        receiverId: string;
        propertyId: string;
        content: string;
    }): Promise<{
        id: string;
        senderId: string;
        receiverId: string;
        propertyId: string;
        content: string;
        createdAt: string;
        read: boolean;
    }>;
    getConversations(userId: string): Promise<{
        id: string;
        otherUser: {
            id: string;
            name: string;
            agency: string;
            avatar: string;
            verified: boolean;
        };
        property: {
            id: string;
            title: string;
            rentETB: number;
            image: string;
        };
        lastMessage: string;
        lastMessageTime: string;
        unreadCount: number;
    }[]>;
}
