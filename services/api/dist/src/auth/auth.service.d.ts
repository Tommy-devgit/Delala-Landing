import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { MailerService } from "../common/mailer.service";
export declare class AuthService {
    private prisma;
    private mailer;
    private readonly logger;
    constructor(prisma: PrismaService, mailer: MailerService);
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
