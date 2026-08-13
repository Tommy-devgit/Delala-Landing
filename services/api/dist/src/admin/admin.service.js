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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const password_1 = require("../common/password");
const DAY_MS = 24 * 60 * 60 * 1000;
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const propertyStatus = (raw) => {
    const value = (raw || "pending").toLowerCase();
    if (value === "approved")
        return "APPROVED";
    if (value === "rejected")
        return "REJECTED";
    return "PENDING_APPROVAL";
};
const displayName = (profile, fallback) => [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || fallback || "Unnamed user";
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recordAudit(userId, action, tableName, recordId) {
        try {
            await this.prisma.auditLog.create({
                data: { userId: userId ?? null, action, tableName, recordId: recordId ?? null },
            });
        }
        catch {
        }
    }
    async getOverview() {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * DAY_MS);
        const twoWeeksAgo = new Date(now.getTime() - 14 * DAY_MS);
        const [totalUsers, usersThisWeek, usersLastWeek, approvedListings, pendingApprovals, rejectedListings, listingsThisWeek, listingsLastWeek, brokers, verifiedPosters, totalProperties, openReports, visitsThisMonth, priceAggregate,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),
            this.prisma.user.count({ where: { createdAt: { gte: twoWeeksAgo, lt: weekAgo } } }),
            this.prisma.property.count({ where: { status: "approved" } }),
            this.prisma.property.count({ where: { status: "pending" } }),
            this.prisma.property.count({ where: { status: "rejected" } }),
            this.prisma.property.count({ where: { createdAt: { gte: weekAgo } } }),
            this.prisma.property.count({ where: { createdAt: { gte: twoWeeksAgo, lt: weekAgo } } }),
            this.prisma.profile.count({ where: { role: "broker" } }),
            this.prisma.profile.count({
                where: { OR: [{ phoneVerified: true }, { identityVerified: true }, { businessVerified: true }] },
            }),
            this.prisma.property.count(),
            this.prisma.report.count({ where: { status: "open" } }),
            this.prisma.visit.count({
                where: { createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) } },
            }),
            this.prisma.property.aggregate({ _avg: { price: true }, where: { status: "approved" } }),
        ]);
        const percentChange = (current, previous) => {
            if (previous === 0)
                return current === 0 ? 0 : null;
            return Math.round(((current - previous) / previous) * 100);
        };
        return {
            metrics: {
                totalUsers,
                activeListings: approvedListings,
                pendingApprovals,
                rejectedListings,
                totalProperties,
                brokerAccounts: brokers,
                verifiedPosters,
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
        const buckets = new Map();
        for (let i = 0; i < days; i += 1) {
            const key = new Date(since.getTime() + i * DAY_MS).toISOString().slice(0, 10);
            buckets.set(key, { date: key, listings: 0, users: 0, visits: 0 });
        }
        const bump = (date, field) => {
            if (!date)
                return;
            const bucket = buckets.get(date.toISOString().slice(0, 10));
            if (bucket)
                bucket[field] += 1;
        };
        properties.forEach((p) => bump(p.createdAt, "listings"));
        users.forEach((u) => bump(u.createdAt, "users"));
        visits.forEach((v) => bump(v.createdAt, "visits"));
        const allProperties = await this.prisma.property.findMany({
            include: { location: { include: { parent: { include: { parent: true } } } } },
        });
        const tally = (key) => {
            const counts = new Map();
            allProperties.forEach((p) => {
                const name = key(p);
                if (!name)
                    return;
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
        const cityOf = (p) => {
            const l = p.location;
            if (!l)
                return undefined;
            if (l.type === "city")
                return l.name;
            if (l.parent?.type === "city")
                return l.parent.name;
            return l.parent?.parent?.name || l.parent?.name;
        };
        return {
            rangeDays: days,
            series: Array.from(buckets.values()),
            byCity: tally(cityOf).slice(0, 10),
            byPropertyType: tally((p) => p.propertyType ? p.propertyType.charAt(0).toUpperCase() + p.propertyType.slice(1) : undefined),
            byStatus: [
                { name: "Approved", count: allProperties.filter((p) => p.status === "approved").length },
                { name: "Pending", count: allProperties.filter((p) => p.status === "pending").length },
                { name: "Rejected", count: allProperties.filter((p) => p.status === "rejected").length },
            ],
        };
    }
    async listProperties(status, search) {
        const normalized = status?.toLowerCase();
        const properties = await this.prisma.property.findMany({
            where: {
                ...(normalized && normalized !== "all" ? { status: normalized } : {}),
                ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
            },
            include: {
                location: { include: { parent: { include: { parent: true } } } },
                images: true,
                owner: { include: { profile: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        return properties.map((p) => {
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
    async listUsers(search) {
        const users = await this.prisma.user.findMany({
            where: search ? { email: { contains: search, mode: "insensitive" } } : {},
            include: { profile: true, properties: { select: { id: true } } },
            orderBy: { createdAt: "desc" },
        });
        return users.map((u) => ({
            id: u.id,
            email: u.email,
            fullName: displayName(u.profile, u.email),
            role: (u.profile?.role || "user").toUpperCase(),
            status: (u.profile?.status || "active").toUpperCase(),
            phone: u.profile?.phone || "",
            avatarUrl: u.profile?.avatarUrl || null,
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
    async updateUser(id, changes, actorId) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException(`No user with id ${id}`);
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
        const audited = [];
        if (changes.role)
            audited.push(`user.role.update -> ${changes.role}`);
        if (changes.status)
            audited.push(`user.status.update -> ${changes.status}`);
        if (changes.posterType)
            audited.push(`user.posterType.update -> ${changes.posterType}`);
        for (const [key, value] of Object.entries(verification)) {
            audited.push(`user.${key}.${value ? "granted" : "revoked"}`);
        }
        for (const action of audited) {
            await this.recordAudit(actorId, action, "profiles", id);
        }
        return (await this.listUsers()).find((u) => u.id === id);
    }
    async setUserPassword(id, newPassword, actorId) {
        if (!newPassword || newPassword.length < 6) {
            throw new common_1.BadRequestException("Choose a password of at least 6 characters.");
        }
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException(`No user with id ${id}`);
        await this.prisma.profile.upsert({
            where: { id },
            create: {
                id,
                firstName: "User",
                lastName: "",
                role: "user",
                status: "active",
                passwordHash: await (0, password_1.hashPassword)(newPassword),
            },
            update: {
                passwordHash: await (0, password_1.hashPassword)(newPassword),
                passwordResetHash: null,
                passwordResetExpires: null,
            },
        });
        await this.recordAudit(actorId, "user.password.set", "profiles", id);
        return { ok: true };
    }
    async listReports() {
        const reports = await this.prisma.report.findMany({
            include: { user: { include: { profile: true } }, property: true },
            orderBy: { createdAt: "desc" },
        });
        return reports.map((r) => ({
            id: r.id,
            reporterName: displayName(r.user?.profile, r.user?.email),
            propertyId: r.propertyId,
            targetTitle: r.property?.title || "Deleted listing",
            reason: r.reason,
            status: (r.status || "open").toUpperCase(),
            reportedAt: r.createdAt,
        }));
    }
    async resolveReport(id, status, actorId) {
        const report = await this.prisma.report.findUnique({ where: { id } });
        if (!report)
            throw new common_1.NotFoundException(`No report with id ${id}`);
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
        return visits.map((v) => ({
            id: v.id,
            seekerName: displayName(v.user?.profile, v.user?.email),
            propertyTitle: v.property?.title || "Deleted listing",
            propertyId: v.propertyId,
            visitDate: v.visitDate,
            status: (v.status || "requested").toUpperCase(),
            requestedAt: v.createdAt,
        }));
    }
    async listLocations(type) {
        const locations = await this.prisma.location.findMany({
            where: { type },
            include: { properties: { select: { id: true, price: true } }, parent: true },
            orderBy: { name: "asc" },
        });
        return locations.map((l) => ({
            id: l.id,
            name: l.name,
            type: l.type,
            parentName: l.parent?.name || null,
            latitude: l.latitude === null ? null : Number(l.latitude),
            longitude: l.longitude === null ? null : Number(l.longitude),
            listingCount: l.properties.length,
            averageRentETB: l.properties.length
                ? Math.round(l.properties.reduce((sum, p) => sum + Number(p.price || 0), 0) / l.properties.length)
                : 0,
        }));
    }
    async getAuditLogs() {
        const logs = await this.prisma.auditLog.findMany({
            take: 100,
            orderBy: { createdAt: "desc" },
            include: { user: { include: { profile: true } } },
        });
        return logs.map((l) => ({
            id: l.id,
            action: l.action,
            tableName: l.tableName,
            recordId: l.recordId,
            actorName: displayName(l.user?.profile, l.user?.email) || "System",
            createdAt: l.createdAt,
        }));
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map