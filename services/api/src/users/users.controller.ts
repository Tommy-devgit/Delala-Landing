import { Controller, Get, Patch, Param, Body, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: "Get all platform users" })
  findAll() {
    return this.prisma.user.findMany({
      include: { profile: true },
      orderBy: { createdAt: "desc" },
    });
  }

  @Get("profile/:id")
  @ApiOperation({ summary: "Get user profile by ID" })
  async getProfile(@Param("id") id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const profile: any = user.profile || {};
    const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ") || user.email || "User";

    return {
      id: user.id,
      email: user.email,
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      fullName,
      phone: profile.phone || "",
      avatarUrl: profile.avatarUrl || "/images/hero_home_away.jpg",
      bio: profile.bio || "",
      role: profile.role || "user",
      createdAt: user.createdAt,
    };
  }

  @Patch("profile/:id")
  @ApiOperation({ summary: "Update user profile details" })
  async updateProfile(
    @Param("id") id: string,
    @Body() body: {
      firstName?: string;
      lastName?: string;
      fullName?: string;
      phone?: string;
      avatarUrl?: string;
      bio?: string;
      role?: string;
    }
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    let firstName = body.firstName;
    let lastName = body.lastName;

    if (!firstName && body.fullName) {
      const parts = body.fullName.trim().split(" ");
      firstName = parts[0];
      lastName = parts.slice(1).join(" ");
    }

    const profileData: any = {};
    if (firstName !== undefined) profileData.firstName = firstName;
    if (lastName !== undefined) profileData.lastName = lastName;
    if (body.phone !== undefined) profileData.phone = body.phone;
    if (body.avatarUrl !== undefined) profileData.avatarUrl = body.avatarUrl;
    if (body.bio !== undefined) profileData.bio = body.bio;
    if (body.role !== undefined) profileData.role = body.role.toLowerCase();

    const updatedProfile: any = await this.prisma.profile.upsert({
      where: { id },
      create: {
        id,
        firstName: firstName || "User",
        lastName: lastName || "",
        phone: body.phone || null,
        avatarUrl: body.avatarUrl || null,
        bio: body.bio || null,
        role: body.role ? body.role.toLowerCase() : "user",
      } as any,
      update: profileData,
    });

    const fullName = [updatedProfile.firstName, updatedProfile.lastName].filter(Boolean).join(" ") || user.email || "User";

    return {
      id: user.id,
      email: user.email,
      firstName: updatedProfile.firstName || "",
      lastName: updatedProfile.lastName || "",
      fullName,
      phone: updatedProfile.phone || "",
      avatarUrl: updatedProfile.avatarUrl || "/images/hero_home_away.jpg",
      bio: updatedProfile.bio || "",
      role: updatedProfile.role || "user",
      createdAt: user.createdAt,
    };
  }

  @Patch(":id/role")
  @ApiOperation({ summary: "Assign platform role to user" })
  async updateRole(@Param("id") id: string, @Body() body: { role: string }) {
    return this.prisma.profile.update({
      where: { id },
      data: { role: body.role.toLowerCase() },
    });
  }
}
