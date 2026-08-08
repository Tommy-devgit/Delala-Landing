import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        {
          name: "Bole",
          latitude: 8.9944,
          longitude: 38.7891,
          neighborhoods: ["Bole Medhanialem", "Bole Michael", "Gerji", "Bole Atlas", "Bole Bulbula"],
        },
        { name: "Kazanchis", latitude: 9.0155, longitude: 38.7684, neighborhoods: ["Kazanchis UN Quarter", "Kazanchis Ring Road"] },
        { name: "Old Airport", latitude: 8.9863, longitude: 38.7327, neighborhoods: ["Old Airport Villa Zone", "Bisrate Gabriel"] },
        { name: "CMC", latitude: 9.0349, longitude: 38.8291, neighborhoods: ["CMC Sunshine", "CMC Michael"] },
        { name: "Sarbet", latitude: 8.9911, longitude: 38.7412, neighborhoods: ["Sarbet Ethio-China", "Meskel Flower"] },
        { name: "Atlas", latitude: 9.0093, longitude: 38.7877, neighborhoods: ["Atlas Roundabout"] },
        { name: "Nifas Silk", latitude: 8.9612, longitude: 38.7397, neighborhoods: ["Gotera", "Saris"] },
        { name: "Kirkos", latitude: 9.0072, longitude: 38.7583, neighborhoods: ["Meskel Square", "Bole Road"] },
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

  for (const city of citiesData) {
    const existing = await prisma.location.findFirst({
      where: { name: city.name, type: "city" },
    });

    let cityRecord = existing;
    if (!cityRecord) {
      cityRecord = await prisma.location.create({
        data: {
          name: city.name,
          type: "city",
          latitude: city.latitude as any,
          longitude: city.longitude as any,
        },
      });
      console.log(`Created City: ${city.name}`);
    } else {
      // Backfill coordinates onto cities seeded before the map release.
      if (cityRecord.latitude === null || cityRecord.longitude === null) {
        await prisma.location.update({
          where: { id: cityRecord.id },
          data: { latitude: city.latitude as any, longitude: city.longitude as any },
        });
        console.log(`Backfilled coordinates for City: ${city.name}`);
      } else {
        console.log(`City already exists: ${city.name}`);
      }
    }

    for (const subCity of city.subCities) {
      const subExisting = await prisma.location.findFirst({
        where: { name: subCity.name, parentId: cityRecord.id },
      });

      let subCityRecord = subExisting;
      if (!subCityRecord) {
        subCityRecord = await prisma.location.create({
          data: {
            name: subCity.name,
            type: "sub_city",
            parentId: cityRecord.id,
            latitude: (subCity.latitude ?? null) as any,
            longitude: (subCity.longitude ?? null) as any,
          },
        });
        console.log(`  └─ Created Sub-City: ${subCity.name}`);
      } else if (
        (subCityRecord.latitude === null || subCityRecord.longitude === null) &&
        subCity.latitude !== undefined &&
        subCity.longitude !== undefined
      ) {
        await prisma.location.update({
          where: { id: subCityRecord.id },
          data: { latitude: subCity.latitude as any, longitude: subCity.longitude as any },
        });
        console.log(`  └─ Backfilled coordinates for Sub-City: ${subCity.name}`);
      }

      for (const neighborhoodName of subCity.neighborhoods || []) {
        const neighborhoodExists = await prisma.location.findFirst({
          where: { name: neighborhoodName, parentId: subCityRecord.id },
        });

        if (!neighborhoodExists) {
          await prisma.location.create({
            data: {
              name: neighborhoodName,
              type: "neighborhood",
              parentId: subCityRecord.id,
            },
          });
          console.log(`     └─ Created Neighborhood: ${neighborhoodName}`);
        }
      }
    }
  }

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
