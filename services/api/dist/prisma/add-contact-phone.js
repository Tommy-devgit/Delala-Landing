"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("Adding contact_phone column to public.properties table...");
    await prisma.$executeRawUnsafe(`
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(30);
  `);
    console.log("✅ Successfully added contact_phone column!");
}
main()
    .catch((e) => {
    console.error("Migration error:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=add-contact-phone.js.map