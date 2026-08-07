import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Altering avatar_url column to TEXT in public.profiles table...");
  await prisma.$executeRawUnsafe(`
    ALTER TABLE public.profiles ALTER COLUMN avatar_url TYPE TEXT;
  `);
  console.log("✅ Successfully altered avatar_url column to TEXT!");
}

main()
  .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
