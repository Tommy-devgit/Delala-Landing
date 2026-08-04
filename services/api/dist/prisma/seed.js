"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Starting Delala Platform Supabase Database Seed...");
    const locEthiopia = await prisma.location.create({
        data: {
            id: (0, crypto_1.randomUUID)(),
            name: "Ethiopia",
            type: "country",
        },
    });
    const locAddis = await prisma.location.create({
        data: {
            id: (0, crypto_1.randomUUID)(),
            name: "Addis Ababa",
            type: "city",
            parentId: locEthiopia.id,
        },
    });
    const locHawassa = await prisma.location.create({
        data: {
            id: (0, crypto_1.randomUUID)(),
            name: "Hawassa",
            type: "city",
            parentId: locEthiopia.id,
        },
    });
    const locBole = await prisma.location.create({
        data: {
            id: (0, crypto_1.randomUUID)(),
            name: "Bole Medhanialem",
            type: "neighborhood",
            parentId: locAddis.id,
        },
    });
    const locKazanchis = await prisma.location.create({
        data: {
            id: (0, crypto_1.randomUUID)(),
            name: "Kazanchis UN Quarter",
            type: "neighborhood",
            parentId: locAddis.id,
        },
    });
    const locOldAirport = await prisma.location.create({
        data: {
            id: (0, crypto_1.randomUUID)(),
            name: "Old Airport",
            type: "neighborhood",
            parentId: locAddis.id,
        },
    });
    const userAbebeId = (0, crypto_1.randomUUID)();
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
    const userBethlehemId = (0, crypto_1.randomUUID)();
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
    await prisma.property.create({
        data: {
            id: (0, crypto_1.randomUUID)(),
            ownerId: userAbebe.id,
            locationId: locBole.id,
            title: "Bole Medhanialem Luxury Villa Compound",
            description: "Exquisite 4-bedroom executive villa compound in Bole Medhanialem. Features automatic 45kVA standby generator and water tanks.",
            propertyType: "villa",
            listingType: "rent",
            price: 65000,
            bedrooms: 4,
            bathrooms: 3.5,
            area: 320,
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
            id: (0, crypto_1.randomUUID)(),
            ownerId: userBethlehem.id,
            locationId: locKazanchis.id,
            title: "Kazanchis UN Quarter Executive Studio",
            description: "Modern fully-serviced studio apartment 2 minutes walk from UNECA headquarters.",
            propertyType: "apartment",
            listingType: "rent",
            price: 28000,
            bedrooms: 1,
            bathrooms: 1,
            area: 65,
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
            id: (0, crypto_1.randomUUID)(),
            ownerId: userAbebe.id,
            locationId: locOldAirport.id,
            title: "Old Airport Diplomatic G+2 Compound",
            description: "Exquisite diplomatic compound with private lush garden, 65kVA silent generator, and guardhouse.",
            propertyType: "house",
            listingType: "sale",
            price: 18500000,
            bedrooms: 5,
            bathrooms: 4.5,
            area: 520,
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
//# sourceMappingURL=seed.js.map