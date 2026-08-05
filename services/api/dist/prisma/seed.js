"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Seeding Ethiopian cities and locations into PostgreSQL database...");
    const citiesData = [
        {
            name: "Addis Ababa",
            type: "city",
            subCities: ["Bole", "Kazanchis", "Old Airport", "CMC", "Sarbet", "Atlas", "Nifas Silk", "Kirkos"],
        },
        {
            name: "Hawassa",
            type: "city",
            subCities: ["Tabor", "Haile Resort Area", "Industrial Park", "Bole Hawassa"],
        },
        {
            name: "Adama",
            type: "city",
            subCities: ["Posta Bet", "Expressway Junction", "Kebele 04", "Melka Adama"],
        },
        {
            name: "Bahir Dar",
            type: "city",
            subCities: ["Tana Waterfront", "Kebele 14", "Poly", "Abay Mado"],
        },
        {
            name: "Dire Dawa",
            type: "city",
            subCities: ["Kezira", "Megala", "Taiwan Market", "Sabian"],
        },
        {
            name: "Gondar",
            type: "city",
            subCities: ["Fasil Ghebbi Area", "Azezo", "Maraki", "Piazza"],
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
                },
            });
            console.log(`Created City: ${city.name}`);
        }
        else {
            console.log(`City already exists: ${city.name}`);
        }
        for (const subCityName of city.subCities) {
            const subExisting = await prisma.location.findFirst({
                where: { name: subCityName, parentId: cityRecord.id },
            });
            if (!subExisting) {
                await prisma.location.create({
                    data: {
                        name: subCityName,
                        type: "sub_city",
                        parentId: cityRecord.id,
                    },
                });
                console.log(`  └─ Created Sub-City: ${subCityName}`);
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
//# sourceMappingURL=seed.js.map