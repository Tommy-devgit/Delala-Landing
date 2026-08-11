import { PrismaService } from "../prisma/prisma.service";
import { CreatePropertyDto, ModeratePropertyDto } from "./dto/create-property.dto";
export declare class PropertiesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        city?: string;
        subCity?: string;
        propertyType?: string;
        verifiedOnly?: boolean;
        status?: string;
        ownerId?: string;
    }): Promise<{
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
    findOneBySlug(slugOrId: string): Promise<{
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
    }>;
    private resolveLocationLevel;
    create(createDto: CreatePropertyDto, uploadedImageUrls?: string[], authenticatedUserId?: string): Promise<{
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
    }>;
    moderate(id: string, moderateDto: ModeratePropertyDto): Promise<{
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
    }>;
    mapPropertyResponse(p: any): {
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
    };
}
