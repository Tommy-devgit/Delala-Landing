import { PrismaService } from "../prisma/prisma.service";
import { CreateVisitDto } from "./dto/create-visit.dto";
export declare class VisitsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateVisitDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.VisitStatus;
        brokerId: string;
        createdAt: Date;
        propertyId: string;
        seekerId: string;
        scheduledDate: string;
        timeSlot: string;
    }>;
    findAll(): Promise<({
        property: {
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
        };
        broker: {
            user: {
                profile: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    verified: boolean;
                    fullName: string;
                    avatarUrl: string | null;
                    phone: string | null;
                    bio: string | null;
                    languages: string[];
                };
            } & {
                id: string;
                status: import(".prisma/client").$Enums.UserStatus;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                role: import(".prisma/client").$Enums.UserRole;
                supabaseUid: string;
            };
        } & {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            agencyName: string;
            licenseNumber: string;
            verified: boolean;
            rating: number;
            reviewsCount: number;
            responseTime: string;
            specializedAreas: string[];
        };
        seeker: {
            profile: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                verified: boolean;
                fullName: string;
                avatarUrl: string | null;
                phone: string | null;
                bio: string | null;
                languages: string[];
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.UserStatus;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            supabaseUid: string;
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.VisitStatus;
        brokerId: string;
        createdAt: Date;
        propertyId: string;
        seekerId: string;
        scheduledDate: string;
        timeSlot: string;
    })[]>;
}
