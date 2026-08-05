import { PropertiesService } from "./properties.service";
import { CreatePropertyDto, ModeratePropertyDto } from "./dto/create-property.dto";
import { R2StorageService } from "../storage/r2-storage.service";
export declare class PropertiesController {
    private readonly propertiesService;
    private readonly r2StorageService;
    constructor(propertiesService: PropertiesService, r2StorageService: R2StorageService);
    findAll(query: {
        city?: string;
        subCity?: string;
        propertyType?: string;
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
    findOne(slug: string): Promise<{
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
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    create(createDto: CreatePropertyDto, files?: Express.Multer.File[]): Promise<{
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
}
