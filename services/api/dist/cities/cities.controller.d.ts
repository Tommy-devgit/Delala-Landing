import { PrismaService } from "../prisma/prisma.service";
export declare class CitiesController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        neighborhoods: {
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
        }[];
    } & {
        id: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        tagline: string;
        startingRentETB: number;
        propertiesCount: number;
    })[]>;
    findOne(slug: string): import(".prisma/client").Prisma.Prisma__CityClient<{
        properties: {
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
        }[];
        neighborhoods: {
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
        }[];
    } & {
        id: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        tagline: string;
        startingRentETB: number;
        propertiesCount: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
