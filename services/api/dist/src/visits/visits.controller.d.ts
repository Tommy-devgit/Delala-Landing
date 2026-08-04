import { VisitsService } from "./visits.service";
import { CreateVisitDto } from "./dto/create-visit.dto";
export declare class VisitsController {
    private readonly visitsService;
    constructor(visitsService: VisitsService);
    create(dto: CreateVisitDto): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.VisitStatus;
        brokerId: string;
        propertyId: string;
        seekerId: string;
        scheduledDate: string;
        timeSlot: string;
    }>;
    findAll(): Promise<({
        broker: {
            user: {
                profile: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    fullName: string;
                    avatarUrl: string | null;
                    phone: string | null;
                    bio: string | null;
                    languages: string[];
                    verified: boolean;
                    userId: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                supabaseUid: string;
                role: import(".prisma/client").$Enums.UserRole;
                status: import(".prisma/client").$Enums.UserStatus;
            };
        } & {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            verified: boolean;
            userId: string;
            licenseNumber: string;
            agencyName: string;
            rating: number;
            reviewsCount: number;
            responseTime: string;
            specializedAreas: string[];
        };
        property: {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            cityId: string;
            status: import(".prisma/client").$Enums.PropertyStatus;
            title: string;
            description: string;
            propertyType: string;
            rentETB: number;
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
            rejectionReason: string | null;
            fieldAgentNotes: string | null;
            brokerId: string;
            ownerId: string | null;
        };
        seeker: {
            profile: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                avatarUrl: string | null;
                phone: string | null;
                bio: string | null;
                languages: string[];
                verified: boolean;
                userId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            supabaseUid: string;
            role: import(".prisma/client").$Enums.UserRole;
            status: import(".prisma/client").$Enums.UserStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.VisitStatus;
        brokerId: string;
        propertyId: string;
        seekerId: string;
        scheduledDate: string;
        timeSlot: string;
    })[]>;
}
