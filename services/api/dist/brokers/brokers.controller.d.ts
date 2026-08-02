import { PrismaService } from "../prisma/prisma.service";
export declare class BrokersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        properties: {
            description: string;
            title: string;
            propertyType: string;
            rentETB: number;
            cityId: string;
            neighborhoodId: string;
            bedrooms: number;
            bathrooms: number;
            areaSqm: number;
            generator: boolean;
            waterTank: boolean;
            parking: boolean;
            furnished: boolean;
            brokerId: string;
            status: import(".prisma/client").$Enums.PropertyStatus;
            rejectionReason: string | null;
            fieldAgentNotes: string | null;
            id: string;
            slug: string;
            securityGuard: boolean;
            balcony: boolean;
            ownerId: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        user: {
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
            status: import(".prisma/client").$Enums.UserStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            supabaseUid: string;
        };
    } & {
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
    })[]>;
    verify(id: string, body: {
        verified: boolean;
    }): import(".prisma/client").Prisma.Prisma__BrokerClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
