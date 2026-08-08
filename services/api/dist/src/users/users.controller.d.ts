import { PrismaService } from "../prisma/prisma.service";
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        profile: {
            phone: string | null;
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            firstName: string | null;
            lastName: string | null;
            avatarUrl: string | null;
            bio: string | null;
            role: string | null;
        };
    } & {
        id: string;
        createdAt: Date | null;
        email: string | null;
    })[]>;
    getProfile(id: string): Promise<{
        id: string;
        email: string;
        firstName: any;
        lastName: any;
        fullName: string;
        phone: any;
        avatarUrl: any;
        bio: string;
        role: any;
        createdAt: Date;
    }>;
    updateProfile(id: string, body: {
        firstName?: string;
        lastName?: string;
        fullName?: string;
        phone?: string;
        avatarUrl?: string;
        bio?: string;
        role?: string;
    }): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        fullName: string;
        phone: string;
        avatarUrl: string;
        bio: string;
        role: string;
        createdAt: Date;
    }>;
    updateRole(id: string, body: {
        role: string;
    }): Promise<{
        phone: string | null;
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        firstName: string | null;
        lastName: string | null;
        avatarUrl: string | null;
        bio: string | null;
        role: string | null;
    }>;
}
