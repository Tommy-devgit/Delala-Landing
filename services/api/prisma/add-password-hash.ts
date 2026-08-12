import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

/**
 * Adds the column that holds the scrypt password digest.
 *
 * It lives on `public.profiles` rather than `auth.users` deliberately. The users
 * table belongs to Supabase's managed auth schema; this application does not use
 * Supabase Auth, and adding app columns to a schema GoTrue also writes to is a
 * collision waiting to happen. Everything else this app owns already hangs off
 * profiles, so the digest goes there too.
 *
 * Existing rows are left NULL on purpose. A NULL digest means "no password has
 * ever been set", which AuthService.login() refuses rather than treating as a
 * match — see prisma/set-password.ts for how to give an existing account one.
 */
async function main() {
  console.log("Adding password_hash column to public.profiles table...");
  await prisma.$executeRawUnsafe(`
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;
  `);
  console.log("✅ Successfully added profile password_hash column!");
}

main()
  .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
