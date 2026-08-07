import { VisitsService } from "./visits.service";
import { CreateVisitDto } from "./dto/create-visit.dto";
export declare class VisitsController {
    private readonly visitsService;
    constructor(visitsService: VisitsService);
    create(dto: CreateVisitDto): Promise<{
        id: string;
        status: string | null;
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
            id: string;
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
            contactPhone: string | null;
            status: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        };
    } & {
        id: string;
        status: string | null;
        createdAt: Date | null;
        propertyId: string | null;
        userId: string | null;
        visitDate: Date | null;
    })[]>;
}
