"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});
const FEATURE_COLUMNS = [
    "generator",
    "water_tank",
    "parking",
    "furnished",
    "security_guard",
    "balcony",
    "internet",
];
async function main() {
    console.log("Adding feature columns to public.properties table...");
    for (const column of FEATURE_COLUMNS) {
        await prisma.$executeRawUnsafe(`
      ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS ${column} BOOLEAN;
    `);
        console.log(`   • ${column}`);
    }
    console.log("✅ Successfully added property feature columns!");
}
main()
    .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=add-property-features.js.map