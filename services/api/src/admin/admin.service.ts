import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

const DAY_MS = 24 * 60 * 60 * 1000;

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Normalizes the loosely-typed status columns for the dashboard. */
const propertyStatus = (raw?: string | null): "APPROVED" | "PENDING_APPROVAL" | "REJECTED" => {
  const value = (raw || "pending").toLowerCase();
  if (value === "approved") return "APPROVED";
  if (value === "rejected") return "REJECTED";
  return "PENDING_APPROVAL";
};

const displayName = (profile: any, fallback?: string | null): string =>
  [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || fallback || "Unnamed user";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  /** Records an admin action so the audit log is a real record, not an empty table. */
  async recordAudit(userId: string | undefined, action: string, tableName: string, recordId?: string) {
    try {
      await this.prisma.auditLog.create({
        data: { userId: userId ?? null, action, tableName, recordId: recordId ?? null },
      });
    } catch {
      // An audit write must never fail the operation it is describing.
    }
  }

  /** Headline metrics plus the deltas the dashboard shows against last week. */
  async getOverview() {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * DAY_MS);
    const twoWeeksAgo = new Date(now.getTime() - 14 * DAY_MS);

    const [
      totalUsers,
      usersThisWeek,
      usersLastWeek,
      approvedListings,
      pendingApprovals,
      rejectedListings,
      listingsThisWeek,
      listingsLastWeek,
      brokers,
      openReports,
      visitsThisMonth,
      priceAggregate,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),
      this.prisma.user.count({ where: { createdAt: { gte: twoWeeksAgo, lt: weekAgo } } }),
      this.prisma.property.count({ where: { status: "approved" } }),
      this.prisma.property.count({ where: { status: "pending" } }),
      this.prisma.property.count({ where: { status: "rejected" } }),
      this.prisma.property.count({ where: { createdAt: { gte: weekAgo } } }),
      this.prisma.property.count({ where: { createdAt: { gte: twoWeeksAgo, lt: weekAgo } } }),
      this.prisma.profile.count({ where: { role: "broker" } }),
      this.prisma.report.count({ where: { status: "open" } }),
      this.prisma.visit.count({
        where: { createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) } },
      }),
      this.prisma.property.aggregate({ _avg: { price: true }, where: { status: "approved" } }),
    ]);

    const percentChange = (current: number, previous: number): number | null => {
      if (previous === 0) return current === 0 ? 0 : null;
      return Math.round(((current - previous) / previous) * 100);
    };

    return {
      metrics: {
        totalUsers,
        activeListings: approvedListings,
        pendingApprovals,
        rejectedListings,
        verifiedBrokers: brokers,
        pendingReports: openReports,
        totalVisitsThisMonth: visitsThisMonth,
        averageRentETB: Math.round(Number(priceAggregate._avg.price || 0)),
      },
      trends: {
        usersThisWeek,
        usersChangePercent: percentChange(usersThisWeek, usersLastWeek),
        listingsThisWeek,
        listingsChangePercent: percentChange(listingsThisWeek, listingsLastWeek),
      },
      timestamp: now.toISOString(),
    };
  }

  /**
   * Time series and breakdowns for the analytics screen. All derived from the
   * live tables rather than being illustrative numbers.
   */
  async getAnalytics(days = 30) {
    const since = startOfDay(new Date(Date.now() - (days - 1) * DAY_MS));

    const [properties, users, visits] = await Promise.all([
      this.prisma.property.findMany({
        where: { createdAt: { gte: since } },
        select: { createdAt: true, price: true, status: true },
      }),
      this.prisma.user.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } }),
      this.prisma.visit.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } }),
    ]);

    // One bucket per day so the chart never has gaps.
    const buckets = new Map<string, { date: string; listings: number; users: number; visits: number }>();
    for (let i = 0; i < days; i += 1) {
      const key = new Date(since.getTime() + i * DAY_MS).toISOString().slice(0, 10);
      buckets.set(key, { date: key, listings: 0, users: 0, visits: 0 });
    }
    const bump = (date: Date | null, field: "listings" | "users" | "visits") => {
      if (!date) return;
      const bucket = buckets.get(date.toISOString().slice(0, 10));
      if (bucket) bucket[field] += 1;
    };
    properties.forEach((p) => bump(p.createdAt, "listings"));
    users.forEach((u) => bump(u.createdAt, "users"));
    visits.forEach((v) => bump(v.createdAt, "visits"));

    const allProperties = await this.prisma.property.findMany({
      include: { location: { include: { parent: { include: { parent: true } } } } },
    });

    const tally = (key: (p: any) => string | undefined) => {
      const counts = new Map<string, { name: string; count: number; totalRent: number }>();
      allProperties.forEach((p: any) => {
        const name = key(p);
        if (!name) return;
        const entry = counts.get(name) || { name, count: 0, totalRent: 0 };
        entry.count += 1;
        entry.totalRent += Number(p.price || 0);
        counts.set(name, entry);
      });
      return Array.from(counts.values())
        .map((e) => ({
          name: e.name,
          count: e.count,
          averageRentETB: e.count ? Math.round(e.totalRent / e.count) : 0,
        }))
        .sort((a, b) => b.count - a.count);
    };

    const cityOf = (p: any): string | undefined => {
      const l = p.location;
      if (!l) return undefined;
      if (l.type === "city") return l.name;
      if (l.parent?.type === "city") return l.parent.name;
      return l.parent?.parent?.name || l.parent?.name;
    };

    return {
      rangeDays: days,
      series: Array.from(buckets.values()),
      byCity: tally(cityOf).slice(0, 10),
      byPropertyType: tally((p) =>
        p.propertyType ? p.propertyType.charAt(0).toUpperCase() + p.propertyType.slice(1) : undefined
      ),
      byStatus: [
        { name: "Approved", count: allProperties.filter((p) => p.status === "approved").length },
        { name: "Pending", count: allProperties.filter((p) => p.status === "pending").length },
        { name: "Rejected", count: allProperties.filter((p) => p.status === "rejected").length },
      ],
    };
  }

  /** Listings for the moderation and property screens. */
  async listProperties(status?: string, search?: string) {
    const normalized = status?.toLowerCase();
    const properties = await this.prisma.property.findMany({
      where: {
        ...(normalized && normalized !== "all" ? { status: normalized } : {}),
        ...(search ? { title: { contains: search, mode: "insensitive" as const } } : {}),
      },
      include: {
        location: { include: { parent: { include: { parent: true } } } },
        images: true,
        owner: { include: { profile: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return properties.map((p: any) => {
      const l = p.location;
      const isCity = l?.type === "city";
      const subCity = isCity ? "" : l?.parent?.name || (l?.type?.includes("sub") ? l?.name : "") || "";
      const city = isCity ? l.name : l?.parent?.parent?.name || l?.parent?.name || "";

      return {
        id: p.id,
        slug: `${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${p.id.slice(0, 4)}`,
        title: p.title,
        propertyType: p.propertyType
          ? p.propertyType.charAt(0).toUpperCase() + p.propertyType.slice(1)
          : "Villa",
        rentETB: Number(p.price || 0),
        city,
        subCity,
        bedrooms: p.bedrooms || 0,
        bathrooms: Number(p.bathrooms || 0),
        areaSqm: Number(p.area || 0),
        status: propertyStatus(p.status),
        heroImage: p.images?.[0]?.imageUrl || null,
        ownerId: p.ownerId,
        ownerName: displayName(p.owner?.profile, p.owner?.email),
        ownerPhone: p.contactPhone || p.owner?.profile?.phone || "",
        submittedAt: p.createdAt,
      };
    });
  }

  async listUsers(search?: string) {
    const users = await this.prisma.user.findMany({
      where: search ? { email: { contains: search, mode: "insensitive" } } : {},
      include: { profile: true, properties: { select: { id: true } } },
      orderBy: { createdAt: "desc" },
    });

    return users.map((u: any) => ({
      id: u.id,
      email: u.email,
      fullName: displayName(u.profile, u.email),
      role: (u.profile?.role || "user").toUpperCase(),
      status: (u.profile?.status || "active").toUpperCase(),
      phone: u.profile?.phone || "",
      avatarUrl: u.profile?.avatarUrl || null,
      // What this account is on the marketplace, and which checks it has
      // actually passed — the dashboard needs both to show current state before
      // an administrator changes it.
      posterType: u.profile?.posterType || null,
      verification: {
        phone: Boolean(u.profile?.phoneVerified),
        identity: Boolean(u.profile?.identityVerified),
        business: Boolean(u.profile?.businessVerified),
      },
      listingCount: u.properties.length,
      joinedAt: u.createdAt,
    }));
  }

  /**
   * Role, suspension, poster type and verification.
   *
   * The verification flags are the reason this accepts more than role and
   * status. They default to false and nothing else in the system can set them,
   * so until an administrator grants one here, every trust badge on the
   * marketplace and the "verified posters" section of the homepage stay empty —
   * which is correct, but only useful once there is a way to move them.
   *
   * Each change is audited separately and by name. The audit line used to be
   * built as `changes.role ? "role" : "status"`, which mislabelled a status-only
   * update as a role change whenever both were sent, and could not describe
   * anything else at all.
   */
  async updateUser(
    id: string,
    changes: {
      role?: string;
      status?: string;
      posterType?: string;
      phoneVerified?: boolean;
      identityVerified?: boolean;
      businessVerified?: boolean;
    },
    actorId?: string
  ) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`No user with id ${id}`);

    const verification = {
      ...(changes.phoneVerified !== undefined ? { phoneVerified: changes.phoneVerified } : {}),
      ...(changes.identityVerified !== undefined ? { identityVerified: changes.identityVerified } : {}),
      ...(changes.businessVerified !== undefined ? { businessVerified: changes.businessVerified } : {}),
    };

    await this.prisma.profile.upsert({
      where: { id },
      create: {
        id,
        firstName: "User",
        lastName: "",
        role: changes.role?.toLowerCase() ?? "user",
        status: changes.status?.toLowerCase() ?? "active",
        ...(changes.posterType ? { posterType: changes.posterType.toLowerCase() } : {}),
        ...verification,
      },
      update: {
        ...(changes.role ? { role: changes.role.toLowerCase() } : {}),
        ...(changes.status ? { status: changes.status.toLowerCase() } : {}),
        ...(changes.posterType ? { posterType: changes.posterType.toLowerCase() } : {}),
        ...verification,
      },
    });

    // One audit line per thing that actually changed. Granting somebody a
    // verification badge is exactly the sort of action a log exists for.
    const audited: string[] = [];
    if (changes.role) audited.push(`user.role.update -> ${changes.role}`);
    if (changes.status) audited.push(`user.status.update -> ${changes.status}`);
    if (changes.posterType) audited.push(`user.posterType.update -> ${changes.posterType}`);
    for (const [key, value] of Object.entries(verification)) {
      audited.push(`user.${key}.${value ? "granted" : "revoked"}`);
    }

    for (const action of audited) {
      await this.recordAudit(actorId, action, "profiles", id);
    }

    return (await this.listUsers()).find((u) => u.id === id);
  }

  async listReports() {
    const reports = await this.prisma.report.findMany({
      include: { user: { include: { profile: true } }, property: true },
      orderBy: { createdAt: "desc" },
    });

    return reports.map((r: any) => ({
      id: r.id,
      reporterName: displayName(r.user?.profile, r.user?.email),
      propertyId: r.propertyId,
      targetTitle: r.property?.title || "Deleted listing",
      reason: r.reason,
      status: (r.status || "open").toUpperCase(),
      reportedAt: r.createdAt,
    }));
  }

  async resolveReport(id: string, status: string, actorId?: string) {
    const report = await this.prisma.report.findUnique({ where: { id } });
    if (!report) throw new NotFoundException(`No report with id ${id}`);

    await this.prisma.report.update({ where: { id }, data: { status: status.toLowerCase() } });
    await this.recordAudit(actorId, `report.${status.toLowerCase()}`, "reports", id);
    return { id, status: status.toUpperCase() };
  }

  async listVisits() {
    const visits = await this.prisma.visit.findMany({
      include: { user: { include: { profile: true } }, property: true },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return visits.map((v: any) => ({
      id: v.id,
      seekerName: displayName(v.user?.profile, v.user?.email),
      propertyTitle: v.property?.title || "Deleted listing",
      propertyId: v.propertyId,
      visitDate: v.visitDate,
      status: (v.status || "requested").toUpperCase(),
      requestedAt: v.createdAt,
    }));
  }

  /** Locations with their live listing counts, for the cities/neighborhoods screens. */
  async listLocations(type: "city" | "sub_city" | "neighborhood") {
    const locations = await this.prisma.location.findMany({
      where: { type },
      include: { properties: { select: { id: true, price: true } }, parent: true },
      orderBy: { name: "asc" },
    });

    return locations.map((l: any) => ({
      id: l.id,
      name: l.name,
      type: l.type,
      parentName: l.parent?.name || null,
      latitude: l.latitude === null ? null : Number(l.latitude),
      longitude: l.longitude === null ? null : Number(l.longitude),
      listingCount: l.properties.length,
      averageRentETB: l.properties.length
        ? Math.round(
            l.properties.reduce((sum: number, p: any) => sum + Number(p.price || 0), 0) / l.properties.length
          )
        : 0,
    }));
  }

  async getAuditLogs() {
    const logs = await this.prisma.auditLog.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
      include: { user: { include: { profile: true } } },
    });

    return logs.map((l: any) => ({
      id: l.id,
      action: l.action,
      tableName: l.tableName,
      recordId: l.recordId,
      actorName: displayName(l.user?.profile, l.user?.email) || "System",
      createdAt: l.createdAt,
    }));
  }
}
