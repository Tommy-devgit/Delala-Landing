import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/common/password";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

/**
 * Sets an account's password.
 *
 *   npm run set-password -- someone@example.com "correct horse battery staple"
 *
 * Passwords were never stored before, so every account that predates
 * `add-password-hash.ts` has a NULL digest and cannot sign in until this is run
 * for it — including whichever account holds the admin role. With no arguments
 * it lists the accounts and whether each has a password yet, which is the
 * quickest way to find out who is locked out.
 *
 * There is no self-service reset endpoint; this is the only way to set a
 * password for an existing account.
 */
async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email) {
    const users = await prisma.user.findMany({ include: { profile: true } });
    console.log("Pass an email and a password. Current accounts:\n");
    users.forEach((u: any) =>
      console.log(
        `   ${String(u.email).padEnd(34)} role=${String(u.profile?.role ?? "(no profile)").padEnd(10)} password=${
          u.profile?.passwordHash ? "set" : "NOT SET — cannot sign in"
        }`
      )
    );
    return;
  }

  if (!password || password.length < 6) {
    console.error("Pass a password of at least 6 characters as the second argument.");
    process.exit(1);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    console.error(`No account found for ${email}`);
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);

  await prisma.profile.upsert({
    where: { id: user.id },
    create: { id: user.id, firstName: email.split("@")[0], lastName: "", role: "user", passwordHash },
    update: { passwordHash },
  });

  console.log(`✅ Password set for ${email}.`);
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
