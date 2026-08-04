import { Injectable, UnauthorizedException, BadRequestException, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { randomUUID } from "crypto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    try {
      const existing = await this.prisma.user.findFirst({
        where: { email: dto.email },
      });

      if (existing) {
        throw new BadRequestException("User email already exists");
      }

      const userId = randomUUID();
      const names = (dto.fullName || "User").trim().split(" ");
      const firstName = names[0] || "User";
      const lastName = names.slice(1).join(" ") || "";

      const user = await this.prisma.user.create({
        data: {
          id: userId,
          email: dto.email,
          profile: {
            create: {
              firstName,
              lastName,
              role: (dto.role || "user").toLowerCase(),
            },
          },
        },
        include: { profile: true },
      });

      const token = `betterauth-session-${user.id}-${Date.now()}`;
      const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || dto.email;

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.profile?.role || "user",
          fullName,
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
      const user = await this.prisma.user.findFirst({
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
      const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || user.email;

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.profile?.role || "user",
          fullName,
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

    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) throw new UnauthorizedException("User not found");
    const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || user.email;

    return {
      id: user.id,
      email: user.email,
      role: user.profile?.role || "user",
      fullName,
    };
  }
}
