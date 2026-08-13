"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});
async function main() {
    console.log("Adding password reset columns to public.profiles table...");
    await prisma.$executeRawUnsafe(`
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_reset_hash TEXT;
  `);
    console.log("   • password_reset_hash");
    await prisma.$executeRawUnsafe(`
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMP;
  `);
    console.log("   • password_reset_expires");
    console.log("✅ Successfully added password reset columns!");
}
main()
    .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=add-password-reset.js.map