import { PrismaService } from "../prisma/prisma.service";
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        profile: {
            id: string;
            status: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            avatarUrl: string | null;
            bio: string | null;
            passwordHash: string | null;
            role: string | null;
            phoneVerified: boolean;
            identityVerified: boolean;
            businessVerified: boolean;
            posterType: string | null;
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
    verifiedPosters(): Promise<{
        id: any;
        fullName: string;
        posterType: any;
        avatarUrl: any;
        bio: any;
        verification: {
            phone: boolean;
            identity: boolean;
            business: boolean;
        };
        activeListingCount: any;
    }[]>;
    getPublicProfile(id: string): Promise<{
        id: string;
        fullName: string;
        role: any;
        posterType: any;
        avatarUrl: any;
        bio: any;
        phone: any;
        verification: {
            phone: boolean;
            identity: boolean;
            business: boolean;
        };
        listingCount: number;
        activeListingCount: number;
        rating: number;
        reviewCount: number;
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
        status: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        avatarUrl: string | null;
        bio: string | null;
        passwordHash: string | null;
        role: string | null;
        phoneVerified: boolean;
        identityVerified: boolean;
        businessVerified: boolean;
        posterType: string | null;
    }>;
}
