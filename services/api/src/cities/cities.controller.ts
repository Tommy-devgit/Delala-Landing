import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

@ApiTags("cities")
@Controller("cities")
export class CitiesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: "Get all Ethiopian cities with market statistics" })
  async findAll() {
    const locations = await this.prisma.location.findMany({
      where: { type: "city" },
      include: { children: true },
    });

    if (locations.length > 0) {
      return locations.map((loc) => ({
        id: loc.id,
        name: loc.name,
        slug: loc.name.toLowerCase().replace(/\s+/g, "-"),
        tagline: "Prime Real Estate Location",
        startingRentETB: 35000,
        propertiesCount: 8,
        image: "/images/hero_property.png",
      }));
    }

    // Default fallback cities
    return [
      { id: "c1", name: "Addis Ababa", slug: "addis-ababa", tagline: "Diplomatic Capital & Financial Hub", startingRentETB: 35000, propertiesCount: 14, image: "/images/hero_property.png" },
      { id: "c2", name: "Hawassa", slug: "hawassa", tagline: "Rift Valley Lakeside Living", startingRentETB: 22000, propertiesCount: 6, image: "/images/hero_home_away.jpg" },
      { id: "c3", name: "Adama", slug: "adama", tagline: "Fastest Growing Expressway Corridor", startingRentETB: 18000, propertiesCount: 5, image: "/images/hero_property.png" },
      { id: "c4", name: "Bahir Dar", slug: "bahir-dar", tagline: "Lake Tana Tourism & Commercial Hub", startingRentETB: 20000, propertiesCount: 4, image: "/images/hero_home_away.jpg" },
    ];
  }

  @Get(":slug")
  @ApiOperation({ summary: "Get city overview by slug" })
  async findOne(@Param("slug") slug: string) {
    const all = await this.findAll();
    const city = all.find((c) => c.slug === slug) || all[0];
    return city;
  }
}
