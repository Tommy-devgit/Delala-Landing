"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
let NotificationsService = class NotificationsService {
    async getNotifications(userId) {
        return [
            {
                id: "notif-1",
                title: "Walkthrough Visit Confirmed",
                message: "Broker Abebe Tesfaye confirmed your visit for Bole Medhanialem Villa tomorrow at 10:00 AM.",
                type: "VISIT_CONFIRMED",
                read: false,
                createdAt: "2 hours ago",
            },
            {
                id: "notif-2",
                title: "Listing Approved & Live",
                message: "Your property submission 'Kazanchis Executive Studio' was verified by field agents and published.",
                type: "LISTING_APPROVED",
                read: true,
                createdAt: "1 day ago",
            },
            {
                id: "notif-3",
                title: "Price Drop Alert",
                message: "Rent for 'Old Airport Diplomatic G+1' dropped from ETB 105,000 to ETB 95,000/mo.",
                type: "PRICE_DROP",
                read: true,
                createdAt: "3 days ago",
            },
        ];
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)()
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map