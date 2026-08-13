"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});
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
//# sourceMappingURL=add-visit-statuses.js.map