import { PrismaService } from "../prisma/prisma.service";
export declare class CreateReviewDto {
    propertyId: string;
    rating: number;
    comment?: string;
}
export declare class ReviewsController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(propertyId?: string, posterId?: string): Promise<{
        average: number;
        count: number;
        data: {
            id: string;
            rating: number;
            comment: string;
            createdAt: Date;
            property: {
                id: string;
                title: string;
            };
            author: {
                id: string;
                name: string;
                avatarUrl: string;
            };
        }[];
    }>;
    create(dto: CreateReviewDto, req: any): Promise<{
        id: string;
        rating: number;
        comment: string;
        createdAt: Date;
        author: {
            id: string;
            name: string;
            avatarUrl: string;
        };
    }>;
}
