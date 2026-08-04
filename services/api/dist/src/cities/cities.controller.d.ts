import { PrismaService } from "../prisma/prisma.service";
export declare class CitiesController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        slug: string;
        tagline: string;
        startingRentETB: number;
        propertiesCount: number;
        image: string;
    }[]>;
    findOne(slug: string): Promise<{
        id: string;
        name: string;
        slug: string;
        tagline: string;
        startingRentETB: number;
        propertiesCount: number;
        image: string;
    }>;
}
