import { PrismaService } from "../prisma/prisma.service";
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        broker: {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            agencyName: string;
            licenseNumber: string;
            verified: boolean;
            rating: number;
            reviewsCount: number;
            responseTime: string;
            specializedAreas: string[];
        };
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            verified: boolean;
            fullName: string;
            avatarUrl: string | null;
            phone: string | null;
            bio: string | null;
            languages: string[];
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        supabaseUid: string;
    })[]>;
    updateRole(id: string, body: {
        role: "GUEST" | "USER" | "OWNER" | "BROKER" | "MODERATOR" | "ADMIN";
    }): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        supabaseUid: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    updateStatus(id: string, body: {
        status: "ACTIVE" | "SUSPENDED";
    }): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        supabaseUid: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
