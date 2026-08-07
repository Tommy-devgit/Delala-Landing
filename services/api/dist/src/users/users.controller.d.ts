import { PrismaService } from "../prisma/prisma.service";
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        profile: {
            phone: string | null;
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            firstName: string | null;
            lastName: string | null;
            avatarUrl: string | null;
            role: string | null;
        };
    } & {
        id: string;
        createdAt: Date | null;
        email: string | null;
    })[]>;
    updateRole(id: string, body: {
        role: string;
    }): Promise<{
        phone: string | null;
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        firstName: string | null;
        lastName: string | null;
        avatarUrl: string | null;
        role: string | null;
    }>;
}
