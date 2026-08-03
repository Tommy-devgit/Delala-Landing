import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  async getNotifications(userId: string) {
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
}
