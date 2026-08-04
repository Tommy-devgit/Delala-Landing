import { PrismaService } from "../prisma/prisma.service";
export declare class AdminController {
    private prisma;
    constructor(prisma: PrismaService);
    getOverview(): Promise<{
        metrics: {
            totalUsers: number;
            totalProperties: number;
            pendingApprovals: number;
            totalBrokers: number;
            pendingReports: number;
            systemHealth: string;
        };
        timestamp: string;
    }>;
    getAuditLogs(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date | null;
        userId: string | null;
        action: string;
        tableName: string | null;
        recordId: string | null;
    }[]>;
}
