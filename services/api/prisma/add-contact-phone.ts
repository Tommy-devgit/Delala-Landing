import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Adding contact_phone column to public.properties table...");
  await prisma.$executeRawUnsafe(`
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(30);
  `);
  console.log("✅ Successfully added contact_phone column!");
}

main()
  .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
