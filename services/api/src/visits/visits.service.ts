import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateVisitDto, UpdateVisitStatusDto } from "./dto/create-visit.dto";
import { NotificationsService } from "../notifications/notifications.service";

/** The states a viewing request moves through. */
export const VISIT_STATUSES = ["requested", "accepted", "declined", "completed", "cancelled"] as const;
export type VisitStatus = (typeof VISIT_STATUSES)[number];

@Injectable()
export class VisitsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService
  ) {}

  /**
   * Requests a viewing.
   *
   * Three things were wrong here. The requester came from a `seekerId` body
   * field, so anyone could book a viewing in anyone else's name. The date the
   * person picked was accepted and then dropped — `visitDate` was never
   * written, so every visit in the table had no date on it. And nothing told
   * the owner: `VISIT_REQUESTED` existed as a notification type and as an icon
   * on the notifications page, but no code path ever produced one, so a poster
   * had no way of learning that somebody wanted to see their property.
   */
  async create(userId: string, dto: CreateVisitDto) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
      select: { id: true, title: true, ownerId: true },
    });
    if (!property) throw new NotFoundException("That property does not exist.");

    const visitDate = new Date(dto.visitDate);
    if (Number.isNaN(visitDate.getTime())) {
      throw new BadRequestException("That is not a valid date and time.");
    }
    if (visitDate.getTime() < Date.now()) {
      throw new BadRequestException("Pick a date in the future.");
    }

    const visit = await this.prisma.visit.create({
      data: {
        propertyId: property.id,
        userId,
        visitDate,
        status: "requested",
      },
    });

    // The owner is told; the requester already knows they asked.
    if (property.ownerId !== userId) {
      await this.notifications.create({
        userId: property.ownerId,
        type: "VISIT_REQUESTED",
        title: "Someone wants to view your property",
        body: `A viewing of "${property.title}" was requested for ${visitDate.toLocaleString("en-GB", {
          dateStyle: "full",
          timeStyle: "short",
        })}.`,
        propertyId: property.id,
      });
    }

    return visit;
  }

  /**
   * Viewings that concern the caller: the ones they requested, and the ones
   * booked against properties they own.
   *
   * This returned every visit in the database to anyone who asked, with the
   * requester's name and phone attached — a list of who is viewing which
   * property, readable without signing in.
   */
  async findForUser(userId: string) {
    const visits = await this.prisma.visit.findMany({
      where: {
        OR: [{ userId }, { property: { ownerId: userId } }],
      },
      include: {
        property: { select: { id: true, title: true, ownerId: true } },
        user: { include: { profile: true } },
      },
      orderBy: { visitDate: "desc" },
    });

    return visits.map((visit: any) => ({
      id: visit.id,
      status: visit.status,
      visitDate: visit.visitDate,
      createdAt: visit.createdAt,
      property: visit.property,
      // Which side of the request the caller is on decides what they may do
      // with it, so it is stated rather than inferred in the UI.
      role: visit.property?.ownerId === userId ? "owner" : "requester",
      requester: {
        id: visit.userId,
        name:
          [visit.user?.profile?.firstName, visit.user?.profile?.lastName].filter(Boolean).join(" ") ||
          "Delala member",
        // The owner needs to reach the person coming to view; nobody else does.
        phone: visit.property?.ownerId === userId ? visit.user?.profile?.phone || null : null,
      },
    }));
  }

  /** Accept, decline, complete or cancel. Owner and requester may do different things. */
  async updateStatus(userId: string, visitId: string, dto: UpdateVisitStatusDto) {
    const visit = await this.prisma.visit.findUnique({
      where: { id: visitId },
      include: { property: { select: { id: true, title: true, ownerId: true } } },
    });
    if (!visit || !visit.property) throw new NotFoundException("That viewing request does not exist.");

    const isOwner = visit.property.ownerId === userId;
    const isRequester = visit.userId === userId;
    if (!isOwner && !isRequester) {
      throw new ForbiddenException("That viewing request is not yours.");
    }

    // Only the owner decides whether a viewing happens. The requester's one
    // power is to call it off.
    const allowed: VisitStatus[] = isOwner ? ["accepted", "declined", "completed", "cancelled"] : ["cancelled"];
    if (!allowed.includes(dto.status)) {
      throw new ForbiddenException("You cannot set that status on this viewing.");
    }

    const updated = await this.prisma.visit.update({
      where: { id: visitId },
      data: { status: dto.status },
    });

    // Tell whoever did not perform the action.
    const recipient = isOwner ? visit.userId : visit.property.ownerId;
    if (recipient && recipient !== userId) {
      const wasAccepted = dto.status === "accepted";
      await this.notifications.create({
        userId: recipient,
        type: wasAccepted ? "VISIT_CONFIRMED" : "SYSTEM",
        title: wasAccepted ? "Your viewing was confirmed" : `Viewing ${dto.status}`,
        body: `"${visit.property.title}" — the viewing request is now ${dto.status}.`,
        propertyId: visit.property.id,
      });
    }

    return updated;
  }
}
