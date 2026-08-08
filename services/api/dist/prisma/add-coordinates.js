"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("Adding latitude/longitude columns to public.properties and public.locations...");
    await prisma.$executeRawUnsafe(`
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS latitude NUMERIC(10, 7);
  `);
    await prisma.$executeRawUnsafe(`
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS longitude NUMERIC(10, 7);
  `);
    await prisma.$executeRawUnsafe(`
    ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS latitude NUMERIC(10, 7);
  `);
    await prisma.$executeRawUnsafe(`
    ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS longitude NUMERIC(10, 7);
  `);
    console.log("✅ Successfully added geographic coordinate columns!");
}
main()
    .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=add-coordinates.js.map