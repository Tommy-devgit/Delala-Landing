import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(senderId: string, receiverId: string, propertyId: string, content: string) {
    // Return structured message response
    return {
      id: `msg-${Date.now()}`,
      senderId,
      receiverId,
      propertyId,
      content,
      createdAt: new Date().toISOString(),
      read: false,
    };
  }

  async getConversations(userId: string) {
    return [
      {
        id: "conv-1",
        otherUser: {
          id: "b1",
          name: "Abebe Tesfaye",
          agency: "Bole Premier Real Estate",
          avatar: "/images/hero_home_away.jpg",
          verified: true,
        },
        property: {
          id: "p1",
          title: "Bole Medhanialem Modern Villa",
          rentETB: 65000,
          image: "/images/hero_property.png",
        },
        lastMessage: "Hello! Is the 45kVA generator automatically switched during blackouts?",
        lastMessageTime: "10 mins ago",
        unreadCount: 1,
      },
    ];
  }
}
