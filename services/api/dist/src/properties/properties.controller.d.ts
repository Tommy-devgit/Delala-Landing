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
    }): Promise<({
        city: {
            name: string;
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            tagline: string;
            startingRentETB: number;
            propertiesCount: number;
        };
        neighborhood: {
            name: string;
            id: string;
            slug: string;
            cityId: string;
            createdAt: Date;
            updatedAt: Date;
            subCity: string;
            securityScore: number;
            generatorPenetration: string;
            waterReliability: string;
            averageRentETB: number;
        };
        broker: {
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
                id: string;
                status: import(".prisma/client").$Enums.UserStatus;
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
        };
        images: {
            id: string;
            url: string;
            displayOrder: number;
            isHero: boolean;
            propertyId: string;
        }[];
    } & {
        description: string;
        id: string;
        slug: string;
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
        securityGuard: boolean;
        balcony: boolean;
        status: import(".prisma/client").$Enums.PropertyStatus;
        rejectionReason: string | null;
        fieldAgentNotes: string | null;
        brokerId: string;
        ownerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(slug: string): Promise<{
        city: {
            name: string;
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            tagline: string;
            startingRentETB: number;
            propertiesCount: number;
        };
        neighborhood: {
            name: string;
            id: string;
            slug: string;
            cityId: string;
            createdAt: Date;
            updatedAt: Date;
            subCity: string;
            securityScore: number;
            generatorPenetration: string;
            waterReliability: string;
            averageRentETB: number;
        };
        broker: {
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
                id: string;
                status: import(".prisma/client").$Enums.UserStatus;
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
        };
        images: {
            id: string;
            url: string;
            displayOrder: number;
            isHero: boolean;
            propertyId: string;
        }[];
    } & {
        description: string;
        id: string;
        slug: string;
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
        securityGuard: boolean;
        balcony: boolean;
        status: import(".prisma/client").$Enums.PropertyStatus;
        rejectionReason: string | null;
        fieldAgentNotes: string | null;
        brokerId: string;
        ownerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    create(createDto: CreatePropertyDto, files?: Express.Multer.File[]): Promise<{
        city: {
            name: string;
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            tagline: string;
            startingRentETB: number;
            propertiesCount: number;
        };
        neighborhood: {
            name: string;
            id: string;
            slug: string;
            cityId: string;
            createdAt: Date;
            updatedAt: Date;
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
            url: string;
            displayOrder: number;
            isHero: boolean;
            propertyId: string;
        }[];
    } & {
        description: string;
        id: string;
        slug: string;
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
        securityGuard: boolean;
        balcony: boolean;
        status: import(".prisma/client").$Enums.PropertyStatus;
        rejectionReason: string | null;
        fieldAgentNotes: string | null;
        brokerId: string;
        ownerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    moderate(id: string, moderateDto: ModeratePropertyDto): Promise<{
        description: string;
        id: string;
        slug: string;
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
        securityGuard: boolean;
        balcony: boolean;
        status: import(".prisma/client").$Enums.PropertyStatus;
        rejectionReason: string | null;
        fieldAgentNotes: string | null;
        brokerId: string;
        ownerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
