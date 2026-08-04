import { PrismaService } from "../prisma/prisma.service";
export declare class CitiesController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        neighborhoods: {
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
        }[];
    } & {
        id: string;
        slug: string;
        name: string;
        tagline: string;
        startingRentETB: number;
        propertiesCount: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(slug: string): import(".prisma/client").Prisma.Prisma__CityClient<{
        neighborhoods: {
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
        }[];
        properties: {
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
        }[];
    } & {
        id: string;
        slug: string;
        name: string;
        tagline: string;
        startingRentETB: number;
        propertiesCount: number;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
