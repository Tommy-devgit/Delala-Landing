import { PrismaService } from "../prisma/prisma.service";
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    toggle(userId: string, propertyId: string): Promise<{
        saved: boolean;
    }>;
    findByUser(userId: string): Promise<({
        property: {
            city: {
                id: string;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                tagline: string;
                startingRentETB: number;
                propertiesCount: number;
            };
            neighborhood: {
                id: string;
                slug: string;
                cityId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                subCity: string;
                securityScore: number;
                generatorPenetration: string;
                waterReliability: string;
                averageRentETB: number;
            };
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
            images: {
                id: string;
                propertyId: string;
                url: string;
                displayOrder: number;
                isHero: boolean;
            }[];
        } & {
            id: string;
            slug: string;
            title: string;
            description: string;
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
            securityGuard: boolean;
            balcony: boolean;
            status: import(".prisma/client").$Enums.PropertyStatus;
            rejectionReason: string | null;
            fieldAgentNotes: string | null;
            brokerId: string;
            ownerId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        propertyId: string;
    })[]>;
}
