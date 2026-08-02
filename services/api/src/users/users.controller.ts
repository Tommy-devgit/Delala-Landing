import { Controller, Get, Patch, Param, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("users")
@Controller("users")
@UseGuards(RolesGuard)
@Roles("ADMIN", "MODERATOR")
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: "Get all platform users (Admin only)" })
  findAll() {
    return this.prisma.user.findMany({
      include: { profile: true, broker: true },
      orderBy: { createdAt: "desc" },
    });
  }

  @Patch(":id/role")
  @ApiOperation({ summary: "Assign platform role to user (Admin only)" })
  updateRole(@Param("id") id: string, @Body() body: { role: "GUEST" | "USER" | "OWNER" | "BROKER" | "MODERATOR" | "ADMIN" }) {
    return this.prisma.user.update({
      where: { id },
      data: { role: body.role },
    });
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Toggle user account status (ACTIVE / SUSPENDED)" })
  updateStatus(@Param("id") id: string, @Body() body: { status: "ACTIVE" | "SUSPENDED" }) {
    return this.prisma.user.update({
      where: { id },
      data: { status: body.status },
    });
  }
}
