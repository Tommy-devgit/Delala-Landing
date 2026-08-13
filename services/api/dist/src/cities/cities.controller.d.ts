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
        propertiesCount: number;
        startingRentETB: number;
        latitude: number;
        longitude: number;
        subCities: LocationNodeResponse[];
    }[] | {
        id: string;
        name: string;
        slug: string;
        propertiesCount: number;
        startingRentETB: any;
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
        propertiesCount: number;
        startingRentETB: number;
        latitude: number;
        longitude: number;
        subCities: LocationNodeResponse[];
    } | {
        id: string;
        name: string;
        slug: string;
        propertiesCount: number;
        startingRentETB: any;
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
