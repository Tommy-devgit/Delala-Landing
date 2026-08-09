import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** `--dry-run` reports every change without writing anything. */
const DRY_RUN = process.argv.includes("--dry-run");
const planned: string[] = [];
/** Orphans this run adopts — tracked so the dry-run summary reflects the plan. */
const adoptedIds = new Set<string>();
const plan = (message: string) => {
  planned.push(message);
  console.log(`${DRY_RUN ? "would " : ""}${message}`);
};

/**
 * Finds an existing location for `name` at this level, adopting a matching
 * orphan (a row left with no parent by the pre-fix create() path) rather than
 * creating a duplicate beside it. Returns its id, or null when none exists.
 */
async function findOrAdopt(
  name: string,
  type: string,
  parentId: string | null
): Promise<string | null> {
  const attached = await prisma.location.findFirst({
    where: { name: { equals: name, mode: "insensitive" }, ...(parentId ? { parentId } : { type }) },
  });
  if (attached) return attached.id;

  if (!parentId) return null;

  const orphan = await prisma.location.findFirst({
    where: { name: { equals: name, mode: "insensitive" }, type, parentId: null },
  });
  if (!orphan) return null;

  plan(`adopt orphan ${type} "${orphan.name}" into parent ${parentId}`);
  adoptedIds.add(orphan.id);
  if (!DRY_RUN) {
    await prisma.location.update({ where: { id: orphan.id }, data: { parentId } });
  }
  return orphan.id;
}

type SubCitySeed = {
  name: string;
  latitude?: number;
  longitude?: number;
  neighborhoods?: string[];
};

type CitySeed = {
  name: string;
  latitude: number;
  longitude: number;
  subCities: SubCitySeed[];
};

async function main() {
  console.log("🌱 Seeding Ethiopian cities and locations into PostgreSQL database...");

  const citiesData: CitySeed[] = [
    {
      name: "Addis Ababa",
      latitude: 9.0192,
      longitude: 38.7525,
      subCities: [
        // The 11 official Addis Ababa administrative sub-cities.
        { name: "Bole", latitude: 8.9944, longitude: 38.7891, neighborhoods: ["Bole Medhanialem", "Bole Michael", "Gerji", "Goro", "Edna Mall", "Hayahulet", "Airport Area", "Atlas"] },
        { name: "Yeka", latitude: 9.05, longitude: 38.81, neighborhoods: ["CMC", "Kotebe", "Summit", "Megenagna", "Lamberet"] },
        { name: "Arada", latitude: 9.035, longitude: 38.753, neighborhoods: ["Piazza", "Mexico", "Sidist Kilo", "Arat Kilo"] },
        { name: "Kirkos", latitude: 9.0072, longitude: 38.7583, neighborhoods: ["Kazanchis", "Meskel Square", "Sar Bet", "Bole Road"] },
        { name: "Lideta", latitude: 9.013, longitude: 38.735, neighborhoods: ["Lideta", "Tewodros Square"] },
        { name: "Gulele", latitude: 9.064, longitude: 38.742, neighborhoods: ["Entoto", "Shiro Meda"] },
        { name: "Kolfe Keranio", latitude: 9.023, longitude: 38.69, neighborhoods: ["Kolfe", "Ayer Tena", "Asko"] },
        { name: "Akaky Kaliti", latitude: 8.89, longitude: 38.79, neighborhoods: ["Akaki", "Kaliti"] },
        { name: "Addis Ketema", latitude: 9.035, longitude: 38.735, neighborhoods: ["Merkato", "Piassa"] },
        { name: "Lemi Kura", latitude: 9.025, longitude: 38.86, neighborhoods: ["Woreda 12", "Bole Bulbula"] },
        { name: "Nifas Silk-Lafto", latitude: 8.9612, longitude: 38.7397, neighborhoods: ["Lafto", "Jemo", "Sarbet", "Bisrate Gabriel"] },

        // Informal area names an earlier seed created as sub-cities. They are
        // kept so listings already filed under them keep working and get a map
        // position; see prisma/README.md for the cleanup note.
        { name: "Kazanchis", latitude: 9.0155, longitude: 38.7684 },
        { name: "Old Airport", latitude: 8.9863, longitude: 38.7327 },
        { name: "CMC", latitude: 9.0349, longitude: 38.8291 },
        { name: "Sarbet", latitude: 8.9911, longitude: 38.7412 },
        { name: "Atlas", latitude: 9.0093, longitude: 38.7877 },
        { name: "Nifas Silk", latitude: 8.9612, longitude: 38.7397 },
        { name: "Bole Sub City", latitude: 8.9944, longitude: 38.7891 },
      ],
    },
    {
      name: "Hawassa",
      latitude: 7.0621,
      longitude: 38.4764,
      subCities: [
        { name: "Tabor", latitude: 7.0402, longitude: 38.4842, neighborhoods: ["Tabor Piazza", "Lake View Riviera"] },
        { name: "Haile Resort Area", latitude: 7.0509, longitude: 38.4523, neighborhoods: ["Lakeside Promenade"] },
        { name: "Industrial Park", latitude: 7.0206, longitude: 38.4998, neighborhoods: ["Industrial Park Quarter"] },
        { name: "Bole Hawassa", latitude: 7.0678, longitude: 38.4901, neighborhoods: ["Referral Area"] },
      ],
    },
    {
      name: "Adama",
      latitude: 8.5414,
      longitude: 39.2689,
      subCities: [
        { name: "Posta Bet", latitude: 8.5401, longitude: 39.2686, neighborhoods: ["Posta Bet Centre"] },
        { name: "Expressway Junction", latitude: 8.5602, longitude: 39.2423, neighborhoods: ["Expressway Gate"] },
        { name: "Kebele 04", latitude: 8.5488, longitude: 39.2751, neighborhoods: ["Kebele 04 Residential"] },
        { name: "Melka Adama", latitude: 8.5316, longitude: 39.2894, neighborhoods: ["Melka Adama Estate"] },
      ],
    },
    {
      name: "Bahir Dar",
      latitude: 11.5936,
      longitude: 37.3908,
      subCities: [
        { name: "Tana Waterfront", latitude: 11.5983, longitude: 37.3821, neighborhoods: ["Tana Promenade", "Palace Zone"] },
        { name: "Kebele 14", latitude: 11.5871, longitude: 37.3966, neighborhoods: ["Kebele 14 Residential"] },
        { name: "Poly", latitude: 11.6041, longitude: 37.4022, neighborhoods: ["Poly Campus Area"] },
        { name: "Abay Mado", latitude: 11.5789, longitude: 37.3735, neighborhoods: ["Abay Mado Estate"] },
      ],
    },
    {
      name: "Dire Dawa",
      latitude: 9.5931,
      longitude: 41.8661,
      subCities: [
        { name: "Kezira", latitude: 9.5942, longitude: 41.8563, neighborhoods: ["Kezira Centre"] },
        { name: "Megala", latitude: 9.6011, longitude: 41.8722, neighborhoods: ["Megala Market"] },
        { name: "Taiwan Market", latitude: 9.5883, longitude: 41.8608, neighborhoods: ["Taiwan Residential"] },
        { name: "Sabian", latitude: 9.6217, longitude: 41.8449, neighborhoods: ["Sabian Estate"] },
      ],
    },
    {
      name: "Gondar",
      latitude: 12.603,
      longitude: 37.4521,
      subCities: [
        { name: "Fasil Ghebbi Area", latitude: 12.6081, longitude: 37.4696, neighborhoods: ["Fasil Castle Quarter"] },
        { name: "Azezo", latitude: 12.5514, longitude: 37.4291, neighborhoods: ["Azezo Airport Road"] },
        { name: "Maraki", latitude: 12.6132, longitude: 37.4437, neighborhoods: ["Maraki Campus Area"] },
        { name: "Piazza", latitude: 12.6046, longitude: 37.4658, neighborhoods: ["Gondar Piazza"] },
      ],
    },
  ];

  /** Writes coordinates onto a location that is still missing them. */
  async function backfillCoordinates(
    id: string,
    label: string,
    current: { latitude: unknown; longitude: unknown },
    latitude?: number,
    longitude?: number
  ) {
    if (latitude === undefined || longitude === undefined) return;
    if (current.latitude !== null && current.longitude !== null) return;
    plan(`set coordinates on ${label} -> ${latitude}, ${longitude}`);
    if (!DRY_RUN) {
      await prisma.location.update({
        where: { id },
        data: { latitude: latitude as any, longitude: longitude as any },
      });
    }
  }

  for (const city of citiesData) {
    let cityId = await findOrAdopt(city.name, "city", null);

    if (!cityId) {
      plan(`create city "${city.name}"`);
      cityId = DRY_RUN
        ? `dry-run-city-${city.name}`
        : (
            await prisma.location.create({
              data: { name: city.name, type: "city", latitude: city.latitude as any, longitude: city.longitude as any },
            })
          ).id;
    } else {
      const current = await prisma.location.findUnique({ where: { id: cityId } });
      if (current) {
        await backfillCoordinates(cityId, `city "${city.name}"`, current, city.latitude, city.longitude);
      }
    }

    for (const subCity of city.subCities) {
      let subCityId = await findOrAdopt(subCity.name, "sub_city", cityId);

      if (!subCityId) {
        plan(`create sub-city "${subCity.name}" under "${city.name}"`);
        subCityId = DRY_RUN
          ? `dry-run-sub-${subCity.name}`
          : (
              await prisma.location.create({
                data: {
                  name: subCity.name,
                  type: "sub_city",
                  parentId: cityId,
                  latitude: (subCity.latitude ?? null) as any,
                  longitude: (subCity.longitude ?? null) as any,
                },
              })
            ).id;
      } else {
        const current = await prisma.location.findUnique({ where: { id: subCityId } });
        if (current) {
          await backfillCoordinates(
            subCityId,
            `sub-city "${subCity.name}"`,
            current,
            subCity.latitude,
            subCity.longitude
          );
        }
      }

      for (const neighborhoodName of subCity.neighborhoods || []) {
        const neighborhoodId = await findOrAdopt(neighborhoodName, "neighborhood", subCityId);
        if (neighborhoodId) continue;

        plan(`create neighborhood "${neighborhoodName}" under "${subCity.name}"`);
        if (!DRY_RUN) {
          await prisma.location.create({
            data: { name: neighborhoodName, type: "neighborhood", parentId: subCityId },
          });
        }
      }
    }
  }

  const remainingOrphans = await prisma.location.findMany({
    where: { parentId: null, type: { not: "country" } },
    select: { id: true, name: true, type: true },
  });
  // Cities may legitimately sit at the root; adopted rows are already accounted
  // for by this run even though a dry run has not written them yet.
  const strays = remainingOrphans.filter((o) => o.type !== "city" && !adoptedIds.has(o.id));

  console.log("");
  console.log(`${DRY_RUN ? "DRY RUN — " : ""}${planned.length} change(s) ${DRY_RUN ? "planned" : "applied"}.`);
  if (strays.length > 0) {
    console.log(`⚠️  ${strays.length} location(s) still have no parent and will not appear in the hierarchy:`);
    strays.forEach((o) => console.log(`   - ${o.type} "${o.name}"`));
  } else {
    console.log("✅ No stray locations outside the hierarchy.");
  }
}

main()
  .catch((e) => {
    console.error("Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
