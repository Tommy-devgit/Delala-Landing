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
    }): Promise<({
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
    })[]>;
    findOneBySlug(slug: string): Promise<{
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
    }>;
    create(createDto: CreatePropertyDto, uploadedImageUrls?: string[]): Promise<{
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
    }>;
    moderate(id: string, moderateDto: ModeratePropertyDto): Promise<{
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
    }>;
}
