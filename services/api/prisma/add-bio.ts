import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Adding bio column to public.profiles table...");
  await prisma.$executeRawUnsafe(`
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
  `);
  console.log("✅ Successfully added bio column!");
}

main()
  .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
