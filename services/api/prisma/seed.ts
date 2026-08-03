import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Delala Platform Supabase Database Seed...");

  // 1. Seed Cities
  const cityAddis = await prisma.city.upsert({
    where: { slug: "addis-ababa" },
    update: {},
    create: {
      slug: "addis-ababa",
      name: "Addis Ababa",
      tagline: "Diplomatic capital & modern urban core of Ethiopia",
      startingRentETB: 28000,
      propertiesCount: 412,
    },
  });

  const cityHawassa = await prisma.city.upsert({
    where: { slug: "hawassa" },
    update: {},
    create: {
      slug: "hawassa",
      name: "Hawassa",
      tagline: "Lakeside resort city & industrial hub",
      startingRentETB: 18000,
      propertiesCount: 68,
    },
  });

  // 2. Seed Neighborhoods
  const neighBole = await prisma.neighborhood.upsert({
    where: { slug: "bole-medhanialem" },
    update: {},
    create: {
      slug: "bole-medhanialem",
      name: "Bole Medhanialem",
      subCity: "Bole",
      cityId: cityAddis.id,
      securityScore: 4.9,
      generatorPenetration: "92%",
      waterReliability: "98%",
      averageRentETB: 65000,
    },
  });

  const neighKazanchis = await prisma.neighborhood.upsert({
    where: { slug: "kazanchis" },
    update: {},
    create: {
      slug: "kazanchis",
      name: "Kazanchis",
      subCity: "Kirkos",
      cityId: cityAddis.id,
      securityScore: 4.8,
      generatorPenetration: "88%",
      waterReliability: "95%",
      averageRentETB: 38000,
    },
  });

  // 3. Seed User & Broker
  const userAbebe = await prisma.user.upsert({
    where: { email: "abebe@bolepremier.et" },
    update: {},
    create: {
      email: "abebe@bolepremier.et",
      role: "BROKER",
      supabaseUid: "sb-uid-abebe-001",
      profile: {
        create: {
          fullName: "Abebe Tesfaye",
          phone: "+251 911 234 567",
          verified: true,
        },
      },
    },
  });

  const brokerAbebe = await prisma.broker.upsert({
    where: { userId: userAbebe.id },
    update: {},
    create: {
      slug: "abebe-tesfaye",
      userId: userAbebe.id,
      agencyName: "Bole Premier Real Estate",
      licenseNumber: "ETH-RE-2024-0091",
      verified: true,
      rating: 4.9,
      specializedAreas: ["Bole Medhanialem", "Kazanchis", "Old Airport"],
    },
  });

  // 4. Seed Verified Property
  await prisma.property.upsert({
    where: { slug: "bole-medhanialem-luxury-residence" },
    update: {},
    create: {
      slug: "bole-medhanialem-luxury-residence",
      title: "Bole Medhanialem Modern G+1 Villa",
      description: "Luxury 4-bedroom villa featuring automatic 45kVA standby generator and dual 12,000L water tanks.",
      propertyType: "Villa",
      rentETB: 65000,
      cityId: cityAddis.id,
      neighborhoodId: neighBole.id,
      bedrooms: 4,
      bathrooms: 3.5,
      areaSqm: 320,
      generator: true,
      waterTank: true,
      parking: true,
      furnished: true,
      securityGuard: true,
      balcony: true,
      status: "APPROVED",
      brokerId: brokerAbebe.id,
      images: {
        create: [
          { url: "/images/hero_property.png", displayOrder: 1, isHero: true },
          { url: "/images/hero_home_away.jpg", displayOrder: 2, isHero: false },
        ],
      },
    },
  });

  console.log("✅ Seed completed cleanly!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
