import { PrismaService } from "../prisma/prisma.service";
import { CreateVisitDto } from "./dto/create-visit.dto";
export declare class VisitsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateVisitDto): Promise<{
        status: string | null;
        id: string;
        createdAt: Date | null;
        propertyId: string | null;
        userId: string | null;
        visitDate: Date | null;
    }>;
    findAll(): Promise<({
        user: {
            profile: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                firstName: string | null;
                lastName: string | null;
                phone: string | null;
                avatarUrl: string | null;
                role: string | null;
            };
        } & {
            id: string;
            createdAt: Date | null;
            email: string | null;
        };
        property: {
            description: string | null;
            title: string;
            propertyType: string | null;
            listingType: string | null;
            price: import("@prisma/client/runtime/library").Decimal | null;
            address: string | null;
            bedrooms: number | null;
            bathrooms: number | null;
            status: string | null;
            id: string;
            ownerId: string;
            locationId: string;
            area: import("@prisma/client/runtime/library").Decimal | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        };
    } & {
        status: string | null;
        id: string;
        createdAt: Date | null;
        propertyId: string | null;
        userId: string | null;
        visitDate: Date | null;
    })[]>;
}
