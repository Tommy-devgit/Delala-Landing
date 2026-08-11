import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

export type NotificationType =
  | "LISTING_APPROVED"
  | "LISTING_REJECTED"
  | "VISIT_REQUESTED"
  | "VISIT_CONFIRMED"
  | "PROPERTY_SAVED"
  | "SYSTEM";

/**
 * Notifications, backed by the `notifications` table.
 *
 * This previously returned three hardcoded rows, so every account saw the same
 * invented messages and nothing could ever be marked read.
 */
@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  /** Raises a notification. Never throws into the caller's flow. */
  async create(input: {
    userId: string;
    type: NotificationType;
    title: string;
    body?: string;
    propertyId?: string | null;
  }) {
    try {
      return await this.prisma.notification.create({
        data: {
          userId: input.userId,
          type: input.type,
          title: input.title,
          body: input.body ?? null,
          propertyId: input.propertyId ?? null,
        },
      });
    } catch {
      // A notification must never fail the action that produced it.
      return null;
    }
  }

  async findByUser(userId: string) {
    const rows = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return rows.map((n) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      body: n.body || "",
      propertyId: n.propertyId,
      read: Boolean(n.read),
      createdAt: n.createdAt,
    }));
  }

  async unreadCount(userId: string) {
    const count = await this.prisma.notification.count({ where: { userId, read: false } });
    return { count };
  }

  async markRead(userId: string, id: string) {
    // Scoped by userId so one account cannot mark another's notifications.
    await this.prisma.notification.updateMany({ where: { id, userId }, data: { read: true } });
    return { id, read: true };
  }

  async markAllRead(userId: string) {
    const result = await this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
    return { updated: result.count };
  }
}
