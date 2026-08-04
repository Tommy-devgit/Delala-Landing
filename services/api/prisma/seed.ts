import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Delala Platform Supabase Database Seed...");

  // 1. Seed Locations (Country -> City -> Neighborhood)
  const locEthiopia = await prisma.location.create({
    data: {
      id: randomUUID(),
      name: "Ethiopia",
      type: "country",
    },
  });

  const locAddis = await prisma.location.create({
    data: {
      id: randomUUID(),
      name: "Addis Ababa",
      type: "city",
      parentId: locEthiopia.id,
    },
  });

  const locHawassa = await prisma.location.create({
    data: {
      id: randomUUID(),
      name: "Hawassa",
      type: "city",
      parentId: locEthiopia.id,
    },
  });

  const locBole = await prisma.location.create({
    data: {
      id: randomUUID(),
      name: "Bole Medhanialem",
      type: "neighborhood",
      parentId: locAddis.id,
    },
  });

  const locKazanchis = await prisma.location.create({
    data: {
      id: randomUUID(),
      name: "Kazanchis UN Quarter",
      type: "neighborhood",
      parentId: locAddis.id,
    },
  });

  const locOldAirport = await prisma.location.create({
    data: {
      id: randomUUID(),
      name: "Old Airport",
      type: "neighborhood",
      parentId: locAddis.id,
    },
  });

  // 2. Seed Users & Profiles
  const userAbebeId = randomUUID();
  const userAbebe = await prisma.user.create({
    data: {
      id: userAbebeId,
      email: "abebe@bolepremier.et",
      profile: {
        create: {
          id: userAbebeId,
          firstName: "Abebe",
          lastName: "Tesfaye",
          phone: "+251 911 234 567",
          role: "broker",
        },
      },
    },
  });

  const userBethlehemId = randomUUID();
  const userBethlehem = await prisma.user.create({
    data: {
      id: userBethlehemId,
      email: "bethlehem@capitalhomes.et",
      profile: {
        create: {
          id: userBethlehemId,
          firstName: "Bethlehem",
          lastName: "Worku",
          phone: "+251 922 888 777",
          role: "broker",
        },
      },
    },
  });

  // 3. Seed Properties & Property Images
  await prisma.property.create({
    data: {
      id: randomUUID(),
      ownerId: userAbebe.id,
      locationId: locBole.id,
      title: "Bole Medhanialem Luxury Villa Compound",
      description: "Exquisite 4-bedroom executive villa compound in Bole Medhanialem. Features automatic 45kVA standby generator and water tanks.",
      propertyType: "villa",
      listingType: "rent",
      price: 65000 as any,
      bedrooms: 4,
      bathrooms: 3.5 as any,
      area: 320 as any,
      address: "Bole Medhanialem, Addis Ababa",
      status: "approved",
      images: {
        create: [
          { imageUrl: "/images/hero_property.png" },
          { imageUrl: "/images/hero_home_away.jpg" },
        ],
      },
    },
  });

  await prisma.property.create({
    data: {
      id: randomUUID(),
      ownerId: userBethlehem.id,
      locationId: locKazanchis.id,
      title: "Kazanchis UN Quarter Executive Studio",
      description: "Modern fully-serviced studio apartment 2 minutes walk from UNECA headquarters.",
      propertyType: "apartment",
      listingType: "rent",
      price: 28000 as any,
      bedrooms: 1,
      bathrooms: 1 as any,
      area: 65 as any,
      address: "Kazanchis, Addis Ababa",
      status: "approved",
      images: {
        create: [
          { imageUrl: "/images/hero_home_away.jpg" },
        ],
      },
    },
  });

  await prisma.property.create({
    data: {
      id: randomUUID(),
      ownerId: userAbebe.id,
      locationId: locOldAirport.id,
      title: "Old Airport Diplomatic G+2 Compound",
      description: "Exquisite diplomatic compound with private lush garden, 65kVA silent generator, and guardhouse.",
      propertyType: "house",
      listingType: "sale",
      price: 18500000 as any,
      bedrooms: 5,
      bathrooms: 4.5 as any,
      area: 520 as any,
      address: "Old Airport, Addis Ababa",
      status: "approved",
      images: {
        create: [
          { imageUrl: "/images/hero_property.png" },
        ],
      },
    },
  });

  console.log("✅ Supabase PostgreSQL Database Seeded Cleanly into Custom SQL Schema!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
