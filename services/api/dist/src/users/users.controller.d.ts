import { PrismaService } from "../prisma/prisma.service";
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            avatarUrl: string | null;
            phone: string | null;
            bio: string | null;
            languages: string[];
            verified: boolean;
            userId: string;
        };
        broker: {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            verified: boolean;
            userId: string;
            licenseNumber: string;
            agencyName: string;
            rating: number;
            reviewsCount: number;
            responseTime: string;
            specializedAreas: string[];
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        supabaseUid: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
    })[]>;
    updateRole(id: string, body: {
        role: "GUEST" | "USER" | "OWNER" | "BROKER" | "MODERATOR" | "ADMIN";
    }): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        supabaseUid: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    updateStatus(id: string, body: {
        status: "ACTIVE" | "SUSPENDED";
    }): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        supabaseUid: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
