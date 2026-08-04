import { PrismaService } from "../prisma/prisma.service";
export declare class CitiesController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        neighborhoods: {
            id: string;
            slug: string;
            cityId: string;
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
        neighborhoods: {
            id: string;
            slug: string;
            cityId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            subCity: string;
            securityScore: number;
            generatorPenetration: string;
            waterReliability: string;
            averageRentETB: number;
        }[];
        properties: {
            id: string;
            slug: string;
            title: string;
            description: string;
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
