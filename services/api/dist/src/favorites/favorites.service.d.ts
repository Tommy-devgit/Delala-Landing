import { PrismaService } from "../prisma/prisma.service";
import { PropertiesService } from "../properties/properties.service";
export declare class FavoritesService {
    private prisma;
    private properties;
    constructor(prisma: PrismaService, properties: PropertiesService);
    toggle(userId: string, propertyId: string): Promise<{
        saved: boolean;
        propertyId: string;
    }>;
    remove(userId: string, propertyId: string): Promise<{
        saved: boolean;
        propertyId: string;
    }>;
    idsForUser(userId: string): Promise<string[]>;
    findByUser(userId: string, requestedUserId?: string): Promise<{
        id: any;
        slug: string;
        title: any;
        description: any;
        propertyType: any;
        rentETB: number;
        bedrooms: any;
        bathrooms: number;
        areaSqm: number;
        generator: boolean;
        waterTank: boolean;
        parking: boolean;
        furnished: boolean;
        securityGuard: boolean;
        balcony: boolean;
        status: string;
        subCity: string;
        city: string;
        neighborhood: string;
        address: any;
        latitude: number;
        longitude: number;
        cityId: any;
        neighborhoodId: any;
        brokerId: any;
        phone: any;
        createdAt: any;
        updatedAt: any;
        cityEntity: {
            id: any;
            name: string;
            slug: string;
        };
        neighborhoodEntity: {
            id: any;
            name: string;
            subCity: string;
        };
        broker: {
            id: any;
            agencyName: string;
            name: string;
            phone: any;
            verified: boolean;
            rating: number;
            reviewsCount: number;
            responseTime: string;
            user: {
                profile: {
                    fullName: string;
                    avatarUrl: any;
                };
            };
        };
        images: any;
    }[]>;
}
