import { PrismaService } from "../prisma/prisma.service";
import { CreateVisitDto } from "./dto/create-visit.dto";
export declare class VisitsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateVisitDto): Promise<{
        id: string;
        createdAt: Date | null;
        status: string | null;
        userId: string | null;
        propertyId: string | null;
        visitDate: Date | null;
    }>;
    findAll(): Promise<({
        user: {
            profile: {
                id: string;
                createdAt: Date | null;
                firstName: string | null;
                lastName: string | null;
                phone: string | null;
                avatarUrl: string | null;
                bio: string | null;
                passwordHash: string | null;
                role: string | null;
                status: string | null;
                updatedAt: Date | null;
            };
        } & {
            id: string;
            email: string | null;
            createdAt: Date | null;
        };
        property: {
            id: string;
            createdAt: Date | null;
            status: string | null;
            updatedAt: Date | null;
            ownerId: string;
            locationId: string;
            title: string;
            description: string | null;
            propertyType: string | null;
            listingType: string | null;
            price: import("@prisma/client/runtime/library").Decimal | null;
            bedrooms: number | null;
            bathrooms: number | null;
            area: import("@prisma/client/runtime/library").Decimal | null;
            address: string | null;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            contactPhone: string | null;
        };
    } & {
        id: string;
        createdAt: Date | null;
        status: string | null;
        userId: string | null;
        propertyId: string | null;
        visitDate: Date | null;
    })[]>;
}
