import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

/**
 * Widens the status vocabulary a viewing request may use.
 *
 * `visits.status` carries a CHECK constraint that predates the API and allows
 * only requested / approved / completed / cancelled. Nothing in the codebase
 * mentioned it, so writing "accepted" failed at the database with a 500 rather
 * than anywhere a reader would look:
 *
 *   new row for relation "visits" violates check constraint "visits_status_check"
 *
 * `accepted` and `declined` are added because they are distinct outcomes that
 * the old list could not express — "declined" (the owner said no) is not
 * "cancelled" (somebody called it off), and collapsing them loses the reason.
 * `approved` stays allowed so any existing row remains valid.
 *
 * There is no `IF NOT EXISTS` for constraints, so this drops and recreates.
 * That is safe to re-run: the new constraint is a superset of the old one and
 * every existing row already satisfies it.
 */
const ALLOWED = ["requested", "approved", "accepted", "declined", "completed", "cancelled"];

async function main() {
  console.log("Widening the visits.status check constraint...");

  const values = ALLOWED.map((status) => `'${status}'`).join(", ");

  await prisma.$executeRawUnsafe(`
    ALTER TABLE public.visits DROP CONSTRAINT IF EXISTS visits_status_check;
  `);
  await prisma.$executeRawUnsafe(`
    ALTER TABLE public.visits ADD CONSTRAINT visits_status_check
      CHECK (status::text = ANY (ARRAY[${values}]::text[]));
  `);

  console.log(`✅ visits.status now accepts: ${ALLOWED.join(", ")}`);
}

main()
  .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
