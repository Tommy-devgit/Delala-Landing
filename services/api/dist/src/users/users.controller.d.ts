import { PrismaService } from "../prisma/prisma.service";
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        profile: {
            id: string;
            createdAt: Date | null;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            avatarUrl: string | null;
            bio: string | null;
            passwordHash: string | null;
            role: string | null;
            status: string | null;
            updatedAt: Date | null;
        };
    } & {
        id: string;
        email: string | null;
        createdAt: Date | null;
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
    getPublicProfile(id: string): Promise<{
        id: string;
        fullName: string;
        role: any;
        avatarUrl: any;
        bio: any;
        phone: any;
        listingCount: number;
        activeListingCount: number;
        memberSince: Date;
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
        id: string;
        createdAt: Date | null;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        avatarUrl: string | null;
        bio: string | null;
        passwordHash: string | null;
        role: string | null;
        status: string | null;
        updatedAt: Date | null;
    }>;
}
