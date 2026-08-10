import { CanActivate, ExecutionContext } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
export interface AuthenticatedUser {
    id: string;
    email: string | null;
    role: string;
    status: string;
}
export declare const bearerToken: (authorization?: string) => string | undefined;
export declare class SessionAuthGuard implements CanActivate {
    private prisma;
    constructor(prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
