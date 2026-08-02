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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            tagline: string;
            startingRentETB: number;
            propertiesCount: number;
        };
        neighborhood: {
            cityId: string;
            id: string;
            slug: string;
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
        };
        images: {
            id: string;
            propertyId: string;
            url: string;
            displayOrder: number;
            isHero: boolean;
        }[];
    } & {
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
    })[]>;
    findOneBySlug(slug: string): Promise<{
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
            cityId: string;
            id: string;
            slug: string;
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
        };
        images: {
            id: string;
            propertyId: string;
            url: string;
            displayOrder: number;
            isHero: boolean;
        }[];
    } & {
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
    }>;
    create(createDto: CreatePropertyDto): Promise<{
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
    }>;
    moderate(id: string, moderateDto: ModeratePropertyDto): Promise<{
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
    }>;
}
