import { PrismaService } from "../prisma/prisma.service";
export interface LocationNodeResponse {
    id: string;
    name: string;
    slug: string;
    latitude: number | null;
    longitude: number | null;
    children?: LocationNodeResponse[];
}
export declare class CitiesController {
    private prisma;
    constructor(prisma: PrismaService);
    private toNode;
    findAll(): Promise<{
        id: any;
        name: any;
        slug: string;
        tagline: string;
        startingRentETB: number;
        propertiesCount: any;
        image: string;
        latitude: number;
        longitude: number;
        subCities: LocationNodeResponse[];
    }[] | {
        id: string;
        name: string;
        slug: string;
        tagline: string;
        startingRentETB: number;
        propertiesCount: number;
        image: string;
        latitude: number;
        longitude: number;
        subCities: {
            id: string;
            name: string;
            slug: string;
            latitude: any;
            longitude: any;
            children: any[];
        }[];
    }[]>;
    findOne(slug: string): Promise<{
        id: any;
        name: any;
        slug: string;
        tagline: string;
        startingRentETB: number;
        propertiesCount: any;
        image: string;
        latitude: number;
        longitude: number;
        subCities: LocationNodeResponse[];
    } | {
        id: string;
        name: string;
        slug: string;
        tagline: string;
        startingRentETB: number;
        propertiesCount: number;
        image: string;
        latitude: number;
        longitude: number;
        subCities: {
            id: string;
            name: string;
            slug: string;
            latitude: any;
            longitude: any;
            children: any[];
        }[];
    }>;
}
