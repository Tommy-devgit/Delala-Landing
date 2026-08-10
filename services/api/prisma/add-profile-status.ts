import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

async function main() {
  console.log("Adding status column to public.profiles table...");
  await prisma.$executeRawUnsafe(`
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';
  `);
  // Rows created before the column existed come back NULL rather than the default.
  await prisma.$executeRawUnsafe(`
    UPDATE public.profiles SET status = 'active' WHERE status IS NULL;
  `);
  console.log("✅ Successfully added profile status column!");
}

main()
  .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
