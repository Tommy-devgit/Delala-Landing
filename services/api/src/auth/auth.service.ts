import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new BadRequestException("User email already exists");
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        role: (dto.role as any) || "USER",
        supabaseUid: `sb-${Date.now()}`,
        profile: {
          create: {
            fullName: dto.fullName,
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
        fullName: user.profile?.fullName,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { profile: true },
    });

    if (!user) {
      // Auto-create user for demo/testing convenience if not present
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
        fullName: user.profile?.fullName,
      },
    };
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
