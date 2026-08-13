import { PrismaService } from "../prisma/prisma.service";
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    recordAudit(userId: string | undefined, action: string, tableName: string, recordId?: string): Promise<void>;
    getOverview(): Promise<{
        metrics: {
            totalUsers: number;
            activeListings: number;
            pendingApprovals: number;
            rejectedListings: number;
            totalProperties: number;
            brokerAccounts: number;
            verifiedPosters: number;
            pendingReports: number;
            totalVisitsThisMonth: number;
            averageRentETB: number;
        };
        trends: {
            usersThisWeek: number;
            usersChangePercent: number;
            listingsThisWeek: number;
            listingsChangePercent: number;
        };
        timestamp: string;
    }>;
    getAnalytics(days?: number): Promise<{
        rangeDays: number;
        series: {
            date: string;
            listings: number;
            users: number;
            visits: number;
        }[];
        byCity: {
            name: string;
            count: number;
            averageRentETB: number;
        }[];
        byPropertyType: {
            name: string;
            count: number;
            averageRentETB: number;
        }[];
        byStatus: {
            name: string;
            count: number;
        }[];
    }>;
    listProperties(status?: string, search?: string): Promise<{
        id: any;
        slug: string;
        title: any;
        propertyType: any;
        rentETB: number;
        city: any;
        subCity: any;
        bedrooms: any;
        bathrooms: number;
        areaSqm: number;
        status: "APPROVED" | "PENDING_APPROVAL" | "REJECTED";
        heroImage: any;
        ownerId: any;
        ownerName: string;
        ownerPhone: any;
        submittedAt: any;
    }[]>;
    listUsers(search?: string): Promise<{
        id: any;
        email: any;
        fullName: string;
        role: any;
        status: any;
        phone: any;
        avatarUrl: any;
        posterType: any;
        verification: {
            phone: boolean;
            identity: boolean;
            business: boolean;
        };
        listingCount: any;
        joinedAt: any;
    }[]>;
    updateUser(id: string, changes: {
        role?: string;
        status?: string;
        posterType?: string;
        phoneVerified?: boolean;
        identityVerified?: boolean;
        businessVerified?: boolean;
    }, actorId?: string): Promise<{
        id: any;
        email: any;
        fullName: string;
        role: any;
        status: any;
        phone: any;
        avatarUrl: any;
        posterType: any;
        verification: {
            phone: boolean;
            identity: boolean;
            business: boolean;
        };
        listingCount: any;
        joinedAt: any;
    }>;
    listReports(): Promise<{
        id: any;
        reporterName: string;
        propertyId: any;
        targetTitle: any;
        reason: any;
        status: any;
        reportedAt: any;
    }[]>;
    resolveReport(id: string, status: string, actorId?: string): Promise<{
        id: string;
        status: string;
    }>;
    listVisits(): Promise<{
        id: any;
        seekerName: string;
        propertyTitle: any;
        propertyId: any;
        visitDate: any;
        status: any;
        requestedAt: any;
    }[]>;
    listLocations(type: "city" | "sub_city" | "neighborhood"): Promise<{
        id: any;
        name: any;
        type: any;
        parentName: any;
        latitude: number;
        longitude: number;
        listingCount: number;
        averageRentETB: number;
    }[]>;
    getAuditLogs(): Promise<{
        id: any;
        action: any;
        tableName: any;
        recordId: any;
        actorName: string;
        createdAt: any;
    }[]>;
}
