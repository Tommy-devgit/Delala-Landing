import { Controller, Get, Patch, Param, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("brokers")
@Controller("brokers")
export class BrokersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: "Get all certified Ethiopian real estate brokers" })
  findAll() {
    return this.prisma.broker.findMany({
      include: {
        user: { include: { profile: true } },
        properties: true,
      },
    });
  }

  @Patch(":id/verify")
  @UseGuards(RolesGuard)
  @Roles("ADMIN", "MODERATOR")
  @ApiOperation({ summary: "Toggle broker verification badge status" })
  verify(@Param("id") id: string, @Body() body: { verified: boolean }) {
    return this.prisma.broker.update({
      where: { id },
      data: { verified: body.verified },
    });
  }
}
