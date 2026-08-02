import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

@ApiTags("cities")
@Controller("cities")
export class CitiesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: "Get all Ethiopian cities with market statistics" })
  findAll() {
    return this.prisma.city.findMany({
      include: { neighborhoods: true },
    });
  }

  @Get(":slug")
  @ApiOperation({ summary: "Get city overview by slug" })
  findOne(@Param("slug") slug: string) {
    return this.prisma.city.findUnique({
      where: { slug },
      include: { neighborhoods: true, properties: true },
    });
  }
}
