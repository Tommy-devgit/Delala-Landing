import { VisitsService } from "./visits.service";
import { CreateVisitDto } from "./dto/create-visit.dto";
export declare class VisitsController {
    private readonly visitsService;
    constructor(visitsService: VisitsService);
    create(dto: CreateVisitDto): Promise<{
        id: string;
        createdAt: Date | null;
        userId: string | null;
        propertyId: string | null;
        status: string | null;
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
                role: string | null;
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
            contactPhone: string | null;
            status: string | null;
        };
    } & {
        id: string;
        createdAt: Date | null;
        userId: string | null;
        propertyId: string | null;
        status: string | null;
        visitDate: Date | null;
    })[]>;
}
