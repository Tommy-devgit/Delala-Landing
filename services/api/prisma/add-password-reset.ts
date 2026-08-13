import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

/**
 * Columns for the password reset flow.
 *
 * Delala does not use Supabase Auth. It writes rows into `auth.users` but rolls
 * its own authentication, so `auth.users.encrypted_password`, `recovery_token`
 * and every piece of GoTrue's email machinery sit unused — which is why nothing
 * appears in the Supabase dashboard and why no recovery email is ever sent.
 *
 * The reset token is stored **hashed**, exactly like a password. A reset token
 * is a bearer credential: anyone holding it can take over the account, so a
 * leaked database backup should not hand out working ones.
 */
async function main() {
  console.log("Adding password reset columns to public.profiles table...");

  await prisma.$executeRawUnsafe(`
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_reset_hash TEXT;
  `);
  console.log("   • password_reset_hash");

  await prisma.$executeRawUnsafe(`
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMP;
  `);
  console.log("   • password_reset_expires");

  console.log("✅ Successfully added password reset columns!");
}

main()
  .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
