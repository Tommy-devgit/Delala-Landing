"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const password_1 = require("../src/common/password");
const prisma = new client_1.PrismaClient({
    datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});
async function main() {
    const email = process.argv[2];
    const password = process.argv[3];
    if (!email) {
        const users = await prisma.user.findMany({ include: { profile: true } });
        console.log("Pass an email and a password. Current accounts:\n");
        users.forEach((u) => console.log(`   ${String(u.email).padEnd(34)} role=${String(u.profile?.role ?? "(no profile)").padEnd(10)} password=${u.profile?.passwordHash ? "set" : "NOT SET — cannot sign in"}`));
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
    const passwordHash = await (0, password_1.hashPassword)(password);
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
//# sourceMappingURL=set-password.js.map