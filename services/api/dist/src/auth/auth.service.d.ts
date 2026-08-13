import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
export declare class AuthService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            role: string;
            fullName: string;
            avatarUrl: string;
            phone: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            role: string;
            fullName: string;
            avatarUrl: string;
            phone: string;
        };
    }>;
    requestPasswordReset(email: string): Promise<{
        delivered: boolean;
        message: string;
    }>;
    resetPassword(email: string, token: string, newPassword: string): Promise<{
        ok: boolean;
    }>;
    validateSession(token: string): Promise<{
        id: string;
        email: string;
        role: string;
        fullName: string;
    }>;
}
