"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});
async function main() {
    const email = process.argv[2];
    if (!email) {
        const users = await prisma.user.findMany({ include: { profile: true } });
        console.log("Pass an email to promote. Current accounts:\n");
        users.forEach((u) => console.log(`   ${String(u.email).padEnd(34)} role=${u.profile?.role ?? "(no profile)"}`));
        return;
    }
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
        console.error(`No account found for ${email}`);
        process.exit(1);
    }
    await prisma.profile.upsert({
        where: { id: user.id },
        create: { id: user.id, firstName: "Admin", lastName: "", role: "admin" },
        update: { role: "admin" },
    });
    console.log(`✅ ${email} is now an admin.`);
}
main()
    .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=make-admin.js.map