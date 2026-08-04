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
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            role: string;
            fullName: string;
        };
    }>;
    validateSession(token: string): Promise<{
        id: string;
        email: string;
        role: string;
        fullName: string;
    }>;
}
