import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

/**
 * Real verification state for posters.
 *
 * Every poster on the marketplace was previously labelled verified — the API
 * returned `broker.verified: true` unconditionally and the frontend client
 * hardcoded it a second time, alongside a 4.9 rating and a "Physically verified
 * by Delala field inspector" note for listings no inspector has ever seen. A
 * verification badge that is always on carries no information and actively
 * misleads the people it is supposed to protect.
 *
 * These default to `false`: nobody is verified until a human verifies them.
 * Expect every badge on the site to disappear after this migration, which is
 * the correct state, not a regression.
 *
 * `poster_type` distinguishes an individual owner from a broker or an agency.
 * It is separate from `role`, which is an authorization concern (user / admin /
 * moderator) and must not be overloaded to mean two different things.
 */
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
