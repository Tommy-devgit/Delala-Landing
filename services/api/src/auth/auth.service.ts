import { Injectable, UnauthorizedException, BadRequestException, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserRole } from "@prisma/client";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existing) {
        throw new BadRequestException("User email already exists");
      }

      let validRole: UserRole = UserRole.USER;
      if (dto.role && Object.values(UserRole).includes(dto.role as UserRole)) {
        validRole = dto.role as UserRole;
      }

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          role: validRole,
          supabaseUid: `sb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          profile: {
            create: {
              fullName: dto.fullName || dto.email.split("@")[0],
              verified: true,
            },
          },
        },
        include: { profile: true },
      });

      const token = `betterauth-session-${user.id}-${Date.now()}`;

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.profile?.fullName || dto.fullName,
        },
      };
    } catch (err: any) {
      this.logger.error(`Register failed for ${dto.email}: ${err.message}`, err.stack);
      if (err instanceof BadRequestException) throw err;
      throw new BadRequestException(err.message || "Failed to complete account registration.");
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
        include: { profile: true },
      });

      if (!user) {
        return this.register({
          email: dto.email,
          password: dto.password,
          fullName: dto.email.split("@")[0],
        });
      }

      const token = `betterauth-session-${user.id}-${Date.now()}`;

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.profile?.fullName || user.email,
        },
      };
    } catch (err: any) {
      this.logger.error(`Login failed for ${dto.email}: ${err.message}`, err.stack);
      throw new BadRequestException(err.message || "Invalid credentials.");
    }
  }

  async validateSession(token: string) {
    const parts = token.split("-");
    const userId = parts[2];
    if (!userId) throw new UnauthorizedException("Invalid auth token");

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) throw new UnauthorizedException("User not found");

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.profile?.fullName,
    };
  }
}
