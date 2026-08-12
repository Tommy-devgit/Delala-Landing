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
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            contactPhone: string | null;
            generator: boolean | null;
            waterTank: boolean | null;
            parking: boolean | null;
            furnished: boolean | null;
            securityGuard: boolean | null;
            balcony: boolean | null;
            internet: boolean | null;
            status: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        };
        user: {
            profile: {
                id: string;
                status: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                phone: string | null;
                firstName: string | null;
                lastName: string | null;
                avatarUrl: string | null;
                bio: string | null;
                passwordHash: string | null;
                role: string | null;
                phoneVerified: boolean;
                identityVerified: boolean;
                businessVerified: boolean;
                posterType: string | null;
            };
        } & {
            id: string;
            createdAt: Date | null;
            email: string | null;
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
