import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

/**
 * Geographic reference data only.
 *
 * This used to carry `tagline`, `startingRentETB`, `propertiesCount` and
 * `image` per city. All four were invented: "starting ETB 35,000/mo" was a
 * number nobody measured, `propertiesCount` was a hardcoded 24/12/9 used
 * whenever the real count came back empty — so a city with no listings
 * advertised two dozen — and the images pointed at generated city photographs
 * that have since been deleted.
 *
 * Coordinates and sub-city names stay because they are ordinary geographic
 * fact and do not change with the contents of the database.
 */
type CityMeta = {
  latitude: number;
  longitude: number;
  subCities: string[];
};

const CITY_METADATA: Record<string, CityMeta> = {
  "Addis Ababa": {
    latitude: 9.0192,
    longitude: 38.7525,
    subCities: ["Bole", "Kazanchis", "Old Airport", "CMC", "Sarbet", "Atlas", "Nifas Silk", "Kirkos"],
  },
  "Hawassa": {
    latitude: 7.0621,
    longitude: 38.4764,
    subCities: ["Tabor", "Haile Resort Area", "Industrial Park", "Bole Hawassa"],
  },
  "Adama": {
    latitude: 8.5414,
    longitude: 39.2689,
    subCities: ["Posta Bet", "Expressway Junction", "Kebele 04", "Melka Adama"],
  },
  "Bahir Dar": {
    latitude: 11.5936,
    longitude: 37.3908,
    subCities: ["Tana Waterfront", "Kebele 14", "Poly", "Abay Mado"],
  },
  "Dire Dawa": {
    latitude: 9.5931,
    longitude: 41.8661,
    subCities: ["Kezira", "Megala", "Taiwan Market", "Sabian"],
  },
  "Gondar": {
    latitude: 12.603,
    longitude: 37.4521,
    subCities: ["Fasil Ghebbi Area", "Azezo", "Maraki", "Piazza"],
  },
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
        // Properties hang off whichever level the poster chose, so counting
        // `loc.properties` alone missed everything attached to a sub-city or a
        // neighborhood — which is most of them. That is why the count so often
        // came back zero and fell through to the hardcoded figure.
        properties: { select: { price: true } },
        children: {
          include: {
            properties: { select: { price: true } },
            children: { include: { properties: { select: { price: true } } } },
          },
        },
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

        // Every property in the city, at whatever depth it is attached.
        const prices = [
          ...(loc.properties || []),
          ...(loc.children || []).flatMap((sub: any) => [
            ...(sub.properties || []),
            ...(sub.children || []).flatMap((n: any) => n.properties || []),
          ]),
        ].map((p: any) => Number(p.price)).filter((n: number) => Number.isFinite(n) && n > 0);

        return {
          id: loc.id,
          name: loc.name,
          slug: toSlug(loc.name),
          // The real count, including zero. A city with nothing in it says so.
          propertiesCount: prices.length,
          // The genuine cheapest listing, or null when there is nothing to
          // measure — never a placeholder, and never rounded into a claim
          // about the market as a whole.
          startingRentETB: prices.length > 0 ? Math.min(...prices) : null,
          latitude: toCoordinate(loc.latitude, 90) ?? fallbackLat,
          longitude: toCoordinate(loc.longitude, 180) ?? fallbackLng,
          subCities,
        };
      });
    }

    // Default fallback cities list if DB locations are not populated
    // Only reached when the locations table is empty. These are place names
    // and coordinates, with no listings behind them, and they say so.
    return Object.entries(CITY_METADATA).map(([name, meta], index) => ({
      id: `c${index + 1}`,
      name,
      slug: toSlug(name),
      propertiesCount: 0,
      startingRentETB: null,
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
