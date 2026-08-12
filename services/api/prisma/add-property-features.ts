import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

/**
 * Gives the amenity flags somewhere real to live.
 *
 * These were previously fiction in three places at once: the publish form
 * defaulted generator/waterTank/parking to true without asking, the create DTO
 * declared all six fields, `create()` dropped them on the floor because there
 * were no columns, and `mapPropertyResponse()` hardcoded every one of them back
 * to `true` on read. Every listing therefore advertised a generator, a water
 * tank, parking, furnishing, a guard and a balcony regardless of the truth.
 *
 * The columns are deliberately NULLABLE rather than `DEFAULT false`. Three
 * states are meaningful and collapsing them loses information:
 *
 *   NULL   the poster was never asked — every listing that predates this
 *   false  the poster was asked and said no
 *   true   the poster said yes
 *
 * The UI shows an amenity only when it is true, and says "not specified" for
 * NULL, so a backfill to `false` would silently assert that 30-odd existing
 * listings have no water — which is exactly the kind of invented fact this
 * migration exists to stop.
 */
const FEATURE_COLUMNS = [
  "generator",
  "water_tank",
  "parking",
  "furnished",
  "security_guard",
  "balcony",
  "internet",
] as const;

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
