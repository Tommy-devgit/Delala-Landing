import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

type CityMeta = {
  tagline: string;
  startingRentETB: number;
  propertiesCount: number;
  image: string;
  latitude: number;
  longitude: number;
  subCities: string[];
};

const CITY_METADATA: Record<string, CityMeta> = {
  "Addis Ababa": {
    tagline: "Diplomatic Capital & Financial Hub",
    startingRentETB: 35000,
    propertiesCount: 24,
    image: "/images/hero-img.jpg",
    latitude: 9.0192,
    longitude: 38.7525,
    subCities: ["Bole", "Kazanchis", "Old Airport", "CMC", "Sarbet", "Atlas", "Nifas Silk", "Kirkos"],
  },
  "Hawassa": {
    tagline: "Rift Valley Lakeside Living",
    startingRentETB: 22000,
    propertiesCount: 12,
    image: "/images/hero_home_away.jpg",
    latitude: 7.0621,
    longitude: 38.4764,
    subCities: ["Tabor", "Haile Resort Area", "Industrial Park", "Bole Hawassa"],
  },
  "Adama": {
    tagline: "Fastest Growing Expressway Corridor",
    startingRentETB: 18000,
    propertiesCount: 9,
    image: "/images/hero_property.png",
    latitude: 8.5414,
    longitude: 39.2689,
    subCities: ["Posta Bet", "Expressway Junction", "Kebele 04", "Melka Adama"],
  },
  "Bahir Dar": {
    tagline: "Lake Tana Tourism & Commercial Hub",
    startingRentETB: 20000,
    propertiesCount: 8,
    image: "/images/hero_home_away.jpg",
    latitude: 11.5936,
    longitude: 37.3908,
    subCities: ["Tana Waterfront", "Kebele 14", "Poly", "Abay Mado"],
  },
  "Dire Dawa": {
    tagline: "Eastern Trade & Industrial Charter City",
    startingRentETB: 16000,
    propertiesCount: 7,
    image: "/images/hero_property.png",
    latitude: 9.5931,
    longitude: 41.8661,
    subCities: ["Kezira", "Megala", "Taiwan Market", "Sabian"],
  },
  "Gondar": {
    tagline: "Historic Royal City & Cultural Heritage",
    startingRentETB: 17000,
    propertiesCount: 6,
    image: "/images/hero_home_away.jpg",
    latitude: 12.603,
    longitude: 37.4521,
    subCities: ["Fasil Ghebbi Area", "Azezo", "Maraki", "Piazza"],
  },
};

const DEFAULT_META = {
  tagline: "Prime Real Estate Location",
  startingRentETB: 25000,
  propertiesCount: 5,
  image: "/images/hero_property.png",
};

const toSlug = (name: string): string => name.toLowerCase().replace(/\s+/g, "-");

const toCoordinate = (value: unknown, max: number): number | null => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed < -max || parsed > max) return null;
  return parsed;
};

/** A single node of the Country > City > Sub-city > Neighborhood hierarchy. */
export interface LocationNodeResponse {
  id: string;
  name: string;
  slug: string;
  latitude: number | null;
  longitude: number | null;
  children?: LocationNodeResponse[];
}

@ApiTags("cities")
@Controller("cities")
export class CitiesController {
  constructor(private prisma: PrismaService) {}

  private toNode(loc: any, children?: LocationNodeResponse[]): LocationNodeResponse {
    return {
      id: loc.id,
      name: loc.name,
      slug: toSlug(loc.name),
      latitude: toCoordinate(loc.latitude, 90),
      longitude: toCoordinate(loc.longitude, 180),
      ...(children ? { children } : {}),
    };
  }

  @Get()
  @ApiOperation({
    summary:
      "Get all Ethiopian cities with market statistics and their sub-city / neighborhood hierarchy",
  })
  async findAll() {
    const locations = await this.prisma.location.findMany({
      where: { type: "city" },
      include: {
        children: { include: { children: true } },
        properties: true,
      },
    });

    if (locations.length > 0) {
      return locations.map((loc: any) => {
        const meta = CITY_METADATA[loc.name];
        const fallbackLat = meta?.latitude ?? null;
        const fallbackLng = meta?.longitude ?? null;

        const subCities: LocationNodeResponse[] = (loc.children || []).map((sub: any) =>
          this.toNode(
            sub,
            (sub.children || []).map((n: any) => this.toNode(n))
          )
        );

        return {
          id: loc.id,
          name: loc.name,
          slug: toSlug(loc.name),
          tagline: meta?.tagline ?? DEFAULT_META.tagline,
          startingRentETB: meta?.startingRentETB ?? DEFAULT_META.startingRentETB,
          propertiesCount:
            loc.properties?.length > 0
              ? loc.properties.length
              : meta?.propertiesCount ?? DEFAULT_META.propertiesCount,
          image: meta?.image ?? DEFAULT_META.image,
          latitude: toCoordinate(loc.latitude, 90) ?? fallbackLat,
          longitude: toCoordinate(loc.longitude, 180) ?? fallbackLng,
          subCities,
        };
      });
    }

    // Default fallback cities list if DB locations are not populated
    return Object.entries(CITY_METADATA).map(([name, meta], index) => ({
      id: `c${index + 1}`,
      name,
      slug: toSlug(name),
      tagline: meta.tagline,
      startingRentETB: meta.startingRentETB,
      propertiesCount: meta.propertiesCount,
      image: meta.image,
      latitude: meta.latitude,
      longitude: meta.longitude,
      subCities: meta.subCities.map((subCityName) => ({
        id: `${toSlug(name)}-${toSlug(subCityName)}`,
        name: subCityName,
        slug: toSlug(subCityName),
        latitude: null,
        longitude: null,
        children: [],
      })),
    }));
  }

  @Get(":slug")
  @ApiOperation({ summary: "Get city overview by slug" })
  async findOne(@Param("slug") slug: string) {
    const all = await this.findAll();
    const city = all.find((c) => c.slug === slug) || all[0];
    return city;
  }
}
