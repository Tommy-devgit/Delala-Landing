import { PrismaService } from "../prisma/prisma.service";
export declare class BrokersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        properties: {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            cityId: string;
            status: import(".prisma/client").$Enums.PropertyStatus;
            title: string;
            description: string;
            propertyType: string;
            rentETB: number;
            neighborhoodId: string;
            bedrooms: number;
            bathrooms: number;
            areaSqm: number;
            generator: boolean;
            waterTank: boolean;
            parking: boolean;
            furnished: boolean;
            securityGuard: boolean;
            balcony: boolean;
            rejectionReason: string | null;
            fieldAgentNotes: string | null;
            brokerId: string;
            ownerId: string | null;
        }[];
        user: {
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            supabaseUid: string;
            role: import(".prisma/client").$Enums.UserRole;
            status: import(".prisma/client").$Enums.UserStatus;
        };
    } & {
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
    })[]>;
    verify(id: string, body: {
        verified: boolean;
    }): import(".prisma/client").Prisma.Prisma__BrokerClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
