import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

const CITY_METADATA: Record<string, { tagline: string; startingRentETB: number; propertiesCount: number; image: string }> = {
  "Addis Ababa": {
    tagline: "Diplomatic Capital & Financial Hub",
    startingRentETB: 35000,
    propertiesCount: 24,
    image: "/images/hero-img.jpg",
  },
  "Hawassa": {
    tagline: "Rift Valley Lakeside Living",
    startingRentETB: 22000,
    propertiesCount: 12,
    image: "/images/hero_home_away.jpg",
  },
  "Adama": {
    tagline: "Fastest Growing Expressway Corridor",
    startingRentETB: 18000,
    propertiesCount: 9,
    image: "/images/hero_property.png",
  },
  "Bahir Dar": {
    tagline: "Lake Tana Tourism & Commercial Hub",
    startingRentETB: 20000,
    propertiesCount: 8,
    image: "/images/hero_home_away.jpg",
  },
  "Dire Dawa": {
    tagline: "Eastern Trade & Industrial Charter City",
    startingRentETB: 16000,
    propertiesCount: 7,
    image: "/images/hero_property.png",
  },
  "Gondar": {
    tagline: "Historic Royal City & Cultural Heritage",
    startingRentETB: 17000,
    propertiesCount: 6,
    image: "/images/hero_home_away.jpg",
  },
};

@ApiTags("cities")
@Controller("cities")
export class CitiesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: "Get all Ethiopian cities with market statistics" })
  async findAll() {
    const locations = await this.prisma.location.findMany({
      where: { type: "city" },
      include: { children: true, properties: true },
    });

    if (locations.length > 0) {
      return locations.map((loc) => {
        const meta = CITY_METADATA[loc.name] || {
          tagline: "Prime Real Estate Location",
          startingRentETB: 25000,
          propertiesCount: loc.properties?.length || 5,
          image: "/images/hero_property.png",
        };

        return {
          id: loc.id,
          name: loc.name,
          slug: loc.name.toLowerCase().replace(/\s+/g, "-"),
          tagline: meta.tagline,
          startingRentETB: meta.startingRentETB,
          propertiesCount: loc.properties?.length > 0 ? loc.properties.length : meta.propertiesCount,
          image: meta.image,
        };
      });
    }

    // Default fallback cities list if DB locations are not populated
    return [
      { id: "c1", name: "Addis Ababa", slug: "addis-ababa", tagline: CITY_METADATA["Addis Ababa"].tagline, startingRentETB: 35000, propertiesCount: 24, image: CITY_METADATA["Addis Ababa"].image },
      { id: "c2", name: "Hawassa", slug: "hawassa", tagline: CITY_METADATA["Hawassa"].tagline, startingRentETB: 22000, propertiesCount: 12, image: CITY_METADATA["Hawassa"].image },
      { id: "c3", name: "Adama", slug: "adama", tagline: CITY_METADATA["Adama"].tagline, startingRentETB: 18000, propertiesCount: 9, image: CITY_METADATA["Adama"].image },
      { id: "c4", name: "Bahir Dar", slug: "bahir-dar", tagline: CITY_METADATA["Bahir Dar"].tagline, startingRentETB: 20000, propertiesCount: 8, image: CITY_METADATA["Bahir Dar"].image },
      { id: "c5", name: "Dire Dawa", slug: "dire-dawa", tagline: CITY_METADATA["Dire Dawa"].tagline, startingRentETB: 16000, propertiesCount: 7, image: CITY_METADATA["Dire Dawa"].image },
      { id: "c6", name: "Gondar", slug: "gondar", tagline: CITY_METADATA["Gondar"].tagline, startingRentETB: 17000, propertiesCount: 6, image: CITY_METADATA["Gondar"].image },
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
