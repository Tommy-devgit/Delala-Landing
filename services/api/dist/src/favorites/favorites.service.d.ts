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
                name: string;
                tagline: string;
                startingRentETB: number;
                propertiesCount: number;
                createdAt: Date;
                updatedAt: Date;
            };
            neighborhood: {
                id: string;
                slug: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                subCity: string;
                cityId: string;
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
                verified: boolean;
                userId: string;
                licenseNumber: string;
                agencyName: string;
                rating: number;
                reviewsCount: number;
                responseTime: string;
                specializedAreas: string[];
            };
            images: {
                id: string;
                url: string;
                displayOrder: number;
                isHero: boolean;
                propertyId: string;
            }[];
        } & {
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
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        propertyId: string;
    })[]>;
}
