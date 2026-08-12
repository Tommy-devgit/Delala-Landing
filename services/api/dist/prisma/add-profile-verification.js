"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});
async function main() {
    console.log("Adding verification columns to public.profiles table...");
    for (const column of ["phone_verified", "identity_verified", "business_verified"]) {
        await prisma.$executeRawUnsafe(`
      ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ${column} BOOLEAN NOT NULL DEFAULT false;
    `);
        console.log(`   • ${column}`);
    }
    await prisma.$executeRawUnsafe(`
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS poster_type VARCHAR(20);
  `);
    console.log("   • poster_type");
    console.log("✅ Successfully added profile verification columns!");
}
main()
    .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=add-profile-verification.js.map