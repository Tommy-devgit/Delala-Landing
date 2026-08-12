import { PrismaService } from "../prisma/prisma.service";
import { CreatePropertyDto, ModeratePropertyDto } from "./dto/create-property.dto";
export interface PropertyQuery {
    city?: string;
    subCity?: string;
    neighborhood?: string;
    locationId?: string;
    propertyType?: string;
    listingType?: string;
    minPrice?: string | number;
    maxPrice?: string | number;
    minArea?: string | number;
    maxArea?: string | number;
    minBedrooms?: string | number;
    minBathrooms?: string | number;
    q?: string;
    sort?: string;
    page?: string | number;
    pageSize?: string | number;
    verifiedOnly?: boolean | string;
    status?: string;
    ownerId?: string;
    generator?: boolean | string;
    waterTank?: boolean | string;
    parking?: boolean | string;
    furnished?: boolean | string;
    securityGuard?: boolean | string;
    balcony?: boolean | string;
    internet?: boolean | string;
}
export declare class PropertiesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: PropertyQuery): Promise<{
        data: {
            id: any;
            slug: string;
            title: any;
            description: any;
            propertyType: any;
            listingType: any;
            rentETB: number;
            bedrooms: any;
            bathrooms: number;
            areaSqm: number;
            generator: any;
            waterTank: any;
            parking: any;
            furnished: any;
            securityGuard: any;
            balcony: any;
            internet: any;
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
                posterType: any;
                verification: {
                    phone: boolean;
                    identity: boolean;
                    business: boolean;
                };
                user: {
                    profile: {
                        fullName: string;
                        avatarUrl: any;
                    };
                };
            };
            images: any;
        }[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    facets(): Promise<{
        total: number;
        propertyTypes: {
            value: string;
            label: string;
            count: number;
        }[];
        listingTypes: {
            value: string;
            count: number;
        }[];
        cities: {
            id: string;
            name: string;
            count: number;
        }[];
    }>;
    findOneBySlug(slugOrId: string): Promise<{
        id: any;
        slug: string;
        title: any;
        description: any;
        propertyType: any;
        listingType: any;
        rentETB: number;
        bedrooms: any;
        bathrooms: number;
        areaSqm: number;
        generator: any;
        waterTank: any;
        parking: any;
        furnished: any;
        securityGuard: any;
        balcony: any;
        internet: any;
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
            posterType: any;
            verification: {
                phone: boolean;
                identity: boolean;
                business: boolean;
            };
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
        listingType: any;
        rentETB: number;
        bedrooms: any;
        bathrooms: number;
        areaSqm: number;
        generator: any;
        waterTank: any;
        parking: any;
        furnished: any;
        securityGuard: any;
        balcony: any;
        internet: any;
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
            posterType: any;
            verification: {
                phone: boolean;
                identity: boolean;
                business: boolean;
            };
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
        listingType: any;
        rentETB: number;
        bedrooms: any;
        bathrooms: number;
        areaSqm: number;
        generator: any;
        waterTank: any;
        parking: any;
        furnished: any;
        securityGuard: any;
        balcony: any;
        internet: any;
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
            posterType: any;
            verification: {
                phone: boolean;
                identity: boolean;
                business: boolean;
            };
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
        listingType: any;
        rentETB: number;
        bedrooms: any;
        bathrooms: number;
        areaSqm: number;
        generator: any;
        waterTank: any;
        parking: any;
        furnished: any;
        securityGuard: any;
        balcony: any;
        internet: any;
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
            posterType: any;
            verification: {
                phone: boolean;
                identity: boolean;
                business: boolean;
            };
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
