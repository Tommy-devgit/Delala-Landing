"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Starting Delala Platform Supabase Database Seed...");
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
    const cityAdama = await prisma.city.upsert({
        where: { slug: "adama" },
        update: {},
        create: {
            slug: "adama",
            name: "Adama",
            tagline: "Commercial nexus & rift valley gateway",
            startingRentETB: 15000,
            propertiesCount: 45,
        },
    });
    const cityBahirDar = await prisma.city.upsert({
        where: { slug: "bahir-dar" },
        update: {},
        create: {
            slug: "bahir-dar",
            name: "Bahir Dar",
            tagline: "Scenic Lake Tana palm avenue city",
            startingRentETB: 16000,
            propertiesCount: 52,
        },
    });
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
            name: "Kazanchis UN Quarter",
            subCity: "Kirkos",
            cityId: cityAddis.id,
            securityScore: 4.8,
            generatorPenetration: "88%",
            waterReliability: "95%",
            averageRentETB: 38000,
        },
    });
    const neighOldAirport = await prisma.neighborhood.upsert({
        where: { slug: "old-airport" },
        update: {},
        create: {
            slug: "old-airport",
            name: "Old Airport Diplomatic Zone",
            subCity: "Nifas Silk",
            cityId: cityAddis.id,
            securityScore: 4.95,
            generatorPenetration: "96%",
            waterReliability: "99%",
            averageRentETB: 95000,
        },
    });
    const neighCMC = await prisma.neighborhood.upsert({
        where: { slug: "cmc-sunshine" },
        update: {},
        create: {
            slug: "cmc-sunshine",
            name: "CMC Sunshine Real Estate",
            subCity: "Yeka",
            cityId: cityAddis.id,
            securityScore: 4.7,
            generatorPenetration: "84%",
            waterReliability: "92%",
            averageRentETB: 45000,
        },
    });
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
    const userBethlehem = await prisma.user.upsert({
        where: { email: "bethlehem@capitalhomes.et" },
        update: {},
        create: {
            email: "bethlehem@capitalhomes.et",
            role: "BROKER",
            supabaseUid: "sb-uid-bethlehem-002",
            profile: {
                create: {
                    fullName: "Bethlehem Worku",
                    phone: "+251 922 888 777",
                    verified: true,
                },
            },
        },
    });
    const brokerBethlehem = await prisma.broker.upsert({
        where: { userId: userBethlehem.id },
        update: {},
        create: {
            slug: "bethlehem-worku",
            userId: userBethlehem.id,
            agencyName: "Capital Verified Homes",
            licenseNumber: "ETH-RE-2024-0142",
            verified: true,
            rating: 4.85,
            specializedAreas: ["Kazanchis", "CMC Sunshine", "Old Airport"],
        },
    });
    await prisma.property.upsert({
        where: { slug: "bole-medhanialem-luxury-residence" },
        update: {},
        create: {
            slug: "bole-medhanialem-luxury-residence",
            title: "Bole Medhanialem Modern G+1 Villa",
            description: "Luxury 4-bedroom villa featuring automatic 45kVA standby generator, dual 12,000L water tanks, and 24/7 perimeter security guard.",
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
    await prisma.property.upsert({
        where: { slug: "kazanchis-un-serviced-studio" },
        update: {},
        create: {
            slug: "kazanchis-un-serviced-studio",
            title: "Kazanchis UN Quarter Executive Studio",
            description: "Modern fully-serviced studio apartment 2 minutes walk from UNECA headquarters. Features continuous standby power and High-speed fiber Wi-Fi.",
            propertyType: "Studio",
            rentETB: 28000,
            cityId: cityAddis.id,
            neighborhoodId: neighKazanchis.id,
            bedrooms: 1,
            bathrooms: 1,
            areaSqm: 65,
            generator: true,
            waterTank: true,
            parking: true,
            furnished: true,
            securityGuard: true,
            balcony: true,
            status: "APPROVED",
            brokerId: brokerBethlehem.id,
            images: {
                create: [
                    { url: "/images/hero_home_away.jpg", displayOrder: 1, isHero: true },
                ],
            },
        },
    });
    await prisma.property.upsert({
        where: { slug: "old-airport-diplomatic-compound" },
        update: {},
        create: {
            slug: "old-airport-diplomatic-compound",
            title: "Old Airport Diplomatic G+2 Compound",
            description: "Exquisite diplomatic compound with private lush garden, swimming pool, 65kVA silent generator, and guardhouse.",
            propertyType: "G+1 Residence",
            rentETB: 95000,
            cityId: cityAddis.id,
            neighborhoodId: neighOldAirport.id,
            bedrooms: 5,
            bathrooms: 4.5,
            areaSqm: 520,
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
                ],
            },
        },
    });
    console.log("✅ Supabase PostgreSQL Database Seeded Cleanly with Authentic Ethiopian Real Estate Data!");
}
main()
    .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map