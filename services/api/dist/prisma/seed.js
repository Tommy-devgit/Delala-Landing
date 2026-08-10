"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});
const DRY_RUN = process.argv.includes("--dry-run");
const planned = [];
const adoptedIds = new Set();
const plan = (message) => {
    planned.push(message);
    console.log(`${DRY_RUN ? "would " : ""}${message}`);
};
async function findOrAdopt(name, type, parentId) {
    const attached = await prisma.location.findFirst({
        where: { name: { equals: name, mode: "insensitive" }, ...(parentId ? { parentId } : { type }) },
    });
    if (attached)
        return attached.id;
    if (!parentId)
        return null;
    const orphan = await prisma.location.findFirst({
        where: { name: { equals: name, mode: "insensitive" }, type, parentId: null },
    });
    if (!orphan)
        return null;
    plan(`adopt orphan ${type} "${orphan.name}" into parent ${parentId}`);
    adoptedIds.add(orphan.id);
    if (!DRY_RUN) {
        await prisma.location.update({ where: { id: orphan.id }, data: { parentId } });
    }
    return orphan.id;
}
async function main() {
    console.log("🌱 Seeding Ethiopian cities and locations into PostgreSQL database...");
    const citiesData = [
        {
            name: "Addis Ababa",
            latitude: 9.0192,
            longitude: 38.7525,
            subCities: [
                { name: "Bole", latitude: 8.9944, longitude: 38.7891, neighborhoods: [{ name: "Bole Medhanialem", latitude: 8.995, longitude: 38.787 }, { name: "Bole Michael", latitude: 8.988, longitude: 38.796 }, { name: "Gerji", latitude: 9.006, longitude: 38.82 }, { name: "Goro", latitude: 8.997, longitude: 38.839 }, { name: "Edna Mall", latitude: 8.994, longitude: 38.788 }, { name: "Hayahulet", latitude: 9.018, longitude: 38.798 }, { name: "Airport Area", latitude: 8.979, longitude: 38.799 }, { name: "Atlas", latitude: 9.0093, longitude: 38.7877 }] },
                { name: "Yeka", latitude: 9.05, longitude: 38.81, neighborhoods: [{ name: "CMC", latitude: 9.0349, longitude: 38.8291 }, { name: "Kotebe", latitude: 9.029, longitude: 38.856 }, { name: "Summit", latitude: 8.999, longitude: 38.86 }, { name: "Megenagna", latitude: 9.018, longitude: 38.803 }, { name: "Lamberet", latitude: 9.043, longitude: 38.818 }] },
                { name: "Arada", latitude: 9.035, longitude: 38.753, neighborhoods: [{ name: "Piazza", latitude: 9.035, longitude: 38.752 }, { name: "Mexico", latitude: 9.01, longitude: 38.739 }, { name: "Sidist Kilo", latitude: 9.04, longitude: 38.762 }, { name: "Arat Kilo", latitude: 9.034, longitude: 38.762 }] },
                { name: "Kirkos", latitude: 9.0072, longitude: 38.7583, neighborhoods: [{ name: "Kazanchis", latitude: 9.0155, longitude: 38.7684 }, { name: "Meskel Square", latitude: 9.011, longitude: 38.762 }, { name: "Sar Bet", latitude: 8.9911, longitude: 38.7412 }, { name: "Bole Road", latitude: 9.005, longitude: 38.77 }, { name: "Bole Road Area", latitude: 9.005, longitude: 38.77 }] },
                { name: "Lideta", latitude: 9.013, longitude: 38.735, neighborhoods: [{ name: "Lideta", latitude: 9.013, longitude: 38.735 }, { name: "Tewodros Square", latitude: 9.023, longitude: 38.748 }] },
                { name: "Gulele", latitude: 9.064, longitude: 38.742, neighborhoods: [{ name: "Entoto", latitude: 9.08, longitude: 38.76 }, { name: "Shiro Meda", latitude: 9.062, longitude: 38.758 }] },
                { name: "Kolfe Keranio", latitude: 9.023, longitude: 38.69, neighborhoods: [{ name: "Kolfe", latitude: 9.023, longitude: 38.69 }, { name: "Ayer Tena", latitude: 8.997, longitude: 38.683 }, { name: "Asko", latitude: 9.048, longitude: 38.687 }] },
                { name: "Akaky Kaliti", latitude: 8.89, longitude: 38.79, neighborhoods: [{ name: "Akaki", latitude: 8.879, longitude: 38.8 }, { name: "Kaliti", latitude: 8.907, longitude: 38.776 }] },
                { name: "Addis Ketema", latitude: 9.035, longitude: 38.735, neighborhoods: [{ name: "Merkato", latitude: 9.033, longitude: 38.74 }, { name: "Piassa", latitude: 9.035, longitude: 38.752 }] },
                { name: "Lemi Kura", latitude: 9.025, longitude: 38.86, neighborhoods: [{ name: "Woreda 12", latitude: 9.025, longitude: 38.86 }, { name: "Bole Bulbula", latitude: 8.95, longitude: 38.78 }] },
                { name: "Nifas Silk-Lafto", latitude: 8.9612, longitude: 38.7397, neighborhoods: [{ name: "Lafto", latitude: 8.95, longitude: 38.73 }, { name: "Jemo", latitude: 8.942, longitude: 38.708 }, { name: "Sarbet", latitude: 8.9911, longitude: 38.7412 }, { name: "Bisrate Gabriel", latitude: 8.988, longitude: 38.748 }] },
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
                { name: "Tabor", latitude: 7.0402, longitude: 38.4842, neighborhoods: [{ name: "Tabor Piazza", latitude: 7.045, longitude: 38.482 }, { name: "Lake View Riviera", latitude: 7.056, longitude: 38.464 }] },
                { name: "Haile Resort Area", latitude: 7.0509, longitude: 38.4523, neighborhoods: [{ name: "Lakeside Promenade", latitude: 7.0509, longitude: 38.4523 }] },
                { name: "Industrial Park", latitude: 7.0206, longitude: 38.4998, neighborhoods: [{ name: "Industrial Park Quarter", latitude: 7.0206, longitude: 38.4998 }] },
                { name: "Bole Hawassa", latitude: 7.0678, longitude: 38.4901, neighborhoods: [{ name: "Referral Area", latitude: 7.0678, longitude: 38.4901 }] },
            ],
        },
        {
            name: "Adama",
            latitude: 8.5414,
            longitude: 39.2689,
            subCities: [
                { name: "Posta Bet", latitude: 8.5401, longitude: 39.2686, neighborhoods: [{ name: "Posta Bet Centre", latitude: 8.5401, longitude: 39.2686 }] },
                { name: "Expressway Junction", latitude: 8.5602, longitude: 39.2423, neighborhoods: [{ name: "Expressway Gate", latitude: 8.5602, longitude: 39.2423 }] },
                { name: "Kebele 04", latitude: 8.5488, longitude: 39.2751, neighborhoods: [{ name: "Kebele 04 Residential", latitude: 8.5488, longitude: 39.2751 }] },
                { name: "Melka Adama", latitude: 8.5316, longitude: 39.2894, neighborhoods: [{ name: "Melka Adama Estate", latitude: 8.5316, longitude: 39.2894 }] },
            ],
        },
        {
            name: "Bahir Dar",
            latitude: 11.5936,
            longitude: 37.3908,
            subCities: [
                { name: "Tana Waterfront", latitude: 11.5983, longitude: 37.3821, neighborhoods: [{ name: "Tana Promenade", latitude: 11.5983, longitude: 37.3821 }, { name: "Palace Zone", latitude: 11.595, longitude: 37.386 }] },
                { name: "Kebele 14", latitude: 11.5871, longitude: 37.3966, neighborhoods: [{ name: "Kebele 14 Residential", latitude: 11.5871, longitude: 37.3966 }] },
                { name: "Poly", latitude: 11.6041, longitude: 37.4022, neighborhoods: [{ name: "Poly Campus Area", latitude: 11.6041, longitude: 37.4022 }] },
                { name: "Abay Mado", latitude: 11.5789, longitude: 37.3735, neighborhoods: [{ name: "Abay Mado Estate", latitude: 11.5789, longitude: 37.3735 }] },
            ],
        },
        {
            name: "Dire Dawa",
            latitude: 9.5931,
            longitude: 41.8661,
            subCities: [
                { name: "Kezira", latitude: 9.5942, longitude: 41.8563, neighborhoods: [{ name: "Kezira Centre", latitude: 9.5942, longitude: 41.8563 }] },
                { name: "Megala", latitude: 9.6011, longitude: 41.8722, neighborhoods: [{ name: "Megala Market", latitude: 9.6011, longitude: 41.8722 }] },
                { name: "Taiwan Market", latitude: 9.5883, longitude: 41.8608, neighborhoods: [{ name: "Taiwan Residential", latitude: 9.5883, longitude: 41.8608 }] },
                { name: "Sabian", latitude: 9.6217, longitude: 41.8449, neighborhoods: [{ name: "Sabian Estate", latitude: 9.6217, longitude: 41.8449 }] },
            ],
        },
        {
            name: "Gondar",
            latitude: 12.603,
            longitude: 37.4521,
            subCities: [
                { name: "Fasil Ghebbi Area", latitude: 12.6081, longitude: 37.4696, neighborhoods: [{ name: "Fasil Castle Quarter", latitude: 12.6081, longitude: 37.4696 }] },
                { name: "Azezo", latitude: 12.5514, longitude: 37.4291, neighborhoods: [{ name: "Azezo Airport Road", latitude: 12.5514, longitude: 37.4291 }] },
                { name: "Maraki", latitude: 12.6132, longitude: 37.4437, neighborhoods: [{ name: "Maraki Campus Area", latitude: 12.6132, longitude: 37.4437 }] },
                { name: "Piazza", latitude: 12.6046, longitude: 37.4658, neighborhoods: [{ name: "Gondar Piazza", latitude: 12.6046, longitude: 37.4658 }] },
            ],
        },
    ];
    async function backfillCoordinates(id, label, current, latitude, longitude) {
        if (latitude === undefined || longitude === undefined)
            return;
        if (current.latitude !== null && current.longitude !== null)
            return;
        plan(`set coordinates on ${label} -> ${latitude}, ${longitude}`);
        if (!DRY_RUN) {
            await prisma.location.update({
                where: { id },
                data: { latitude: latitude, longitude: longitude },
            });
        }
    }
    for (const city of citiesData) {
        let cityId = await findOrAdopt(city.name, "city", null);
        if (!cityId) {
            plan(`create city "${city.name}"`);
            cityId = DRY_RUN
                ? `dry-run-city-${city.name}`
                : (await prisma.location.create({
                    data: { name: city.name, type: "city", latitude: city.latitude, longitude: city.longitude },
                })).id;
        }
        else {
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
                    : (await prisma.location.create({
                        data: {
                            name: subCity.name,
                            type: "sub_city",
                            parentId: cityId,
                            latitude: (subCity.latitude ?? null),
                            longitude: (subCity.longitude ?? null),
                        },
                    })).id;
            }
            else {
                const current = await prisma.location.findUnique({ where: { id: subCityId } });
                if (current) {
                    await backfillCoordinates(subCityId, `sub-city "${subCity.name}"`, current, subCity.latitude, subCity.longitude);
                }
            }
            for (const entry of subCity.neighborhoods || []) {
                const neighborhood = typeof entry === "string" ? { name: entry } : entry;
                const { name, latitude, longitude } = neighborhood;
                const neighborhoodId = await findOrAdopt(name, "neighborhood", subCityId);
                if (neighborhoodId) {
                    const current = await prisma.location.findUnique({ where: { id: neighborhoodId } });
                    if (current) {
                        await backfillCoordinates(neighborhoodId, `neighborhood "${name}"`, current, latitude, longitude);
                    }
                    continue;
                }
                plan(`create neighborhood "${name}" under "${subCity.name}"`);
                if (!DRY_RUN) {
                    await prisma.location.create({
                        data: {
                            name,
                            type: "neighborhood",
                            parentId: subCityId,
                            latitude: (latitude ?? null),
                            longitude: (longitude ?? null),
                        },
                    });
                }
            }
        }
    }
    const remainingOrphans = await prisma.location.findMany({
        where: { parentId: null, type: { not: "country" } },
        select: { id: true, name: true, type: true },
    });
    const strays = remainingOrphans.filter((o) => o.type !== "city" && !adoptedIds.has(o.id));
    console.log("");
    console.log(`${DRY_RUN ? "DRY RUN — " : ""}${planned.length} change(s) ${DRY_RUN ? "planned" : "applied"}.`);
    if (strays.length > 0) {
        console.log(`⚠️  ${strays.length} location(s) still have no parent and will not appear in the hierarchy:`);
        strays.forEach((o) => console.log(`   - ${o.type} "${o.name}"`));
    }
    else {
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
//# sourceMappingURL=seed.js.map