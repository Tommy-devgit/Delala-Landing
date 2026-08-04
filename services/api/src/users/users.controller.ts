import { Controller, Get, Patch, Param, Body, UseGuards } from "@nestjs/common";
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

  @Patch(":id/role")
  @ApiOperation({ summary: "Assign platform role to user" })
  async updateRole(@Param("id") id: string, @Body() body: { role: string }) {
    return this.prisma.profile.update({
      where: { id },
      data: { role: body.role.toLowerCase() },
    });
  }
}
