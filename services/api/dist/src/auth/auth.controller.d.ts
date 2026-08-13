import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    forgotPassword(body: {
        email: string;
    }): Promise<{
        delivered: boolean;
        message: string;
    }>;
    resetPassword(body: {
        email: string;
        token: string;
        password: string;
    }): Promise<{
        ok: boolean;
    }>;
    getProfile(authHeader?: string): Promise<{
        id: string;
        email: string;
        role: string;
        fullName: string;
    }>;
}
