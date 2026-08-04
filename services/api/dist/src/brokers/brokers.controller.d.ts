import { PrismaService } from "../prisma/prisma.service";
export declare class BrokersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        slug: string;
        agencyName: string;
        licenseNumber: string;
        verified: boolean;
        rating: number;
        reviewsCount: number;
        responseTime: string;
        specializedAreas: string[];
        user: {
            profile: {
                fullName: string;
                avatarUrl: string;
            };
        };
    }[]>;
}
