"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});
async function main() {
    console.log("Creating public.notifications table...");
    await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS public.notifications (
      id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      type        VARCHAR(40) NOT NULL,
      title       VARCHAR(200) NOT NULL,
      body        TEXT,
      property_id UUID,
      read        BOOLEAN DEFAULT FALSE,
      created_at  TIMESTAMP DEFAULT NOW()
    );
  `);
    await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS notifications_user_read_idx
      ON public.notifications (user_id, read);
  `);
    console.log("✅ notifications table ready!");
}
main()
    .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=add-notifications.js.map