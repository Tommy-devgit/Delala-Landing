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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MessagesService = class MessagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendMessage(senderId, receiverId, propertyId, content) {
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
    async getConversations(userId) {
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
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map