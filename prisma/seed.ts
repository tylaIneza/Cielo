import { PrismaClient, Role, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const email = process.env.SUPER_ADMIN_EMAIL ?? "inezapaccy4@gmail.com";
  const phone = process.env.SUPER_ADMIN_PHONE ?? "0788628417";
  const password = process.env.SUPER_ADMIN_PASSWORD ?? "Ineza@12!";

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { phoneNumber: phone }] },
  });

  if (existing) {
    console.log(`✅ Super Admin already exists: ${existing.email}`);
  } else {
    const passwordHash = await bcrypt.hash(password, 12);

    const superAdmin = await prisma.user.create({
      data: {
        fullName: "Ineza Paccy",
        email,
        phoneNumber: phone,
        passwordHash,
        role: Role.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
        emailVerified: new Date(),
        phoneVerified: true,
      },
    });

    console.log(`✅ Super Admin created: ${superAdmin.email}`);
  }

  // Seed default site settings
  const settings = [
    { key: "site_name", value: "Cielo Fashion", description: "Site display name" },
    { key: "site_tagline", value: "Luxury African Fashion, Made in Rwanda", description: "Site tagline" },
    { key: "currency", value: "RWF", description: "Default currency" },
    { key: "contact_email", value: "info@cielofashion.rw", description: "Contact email" },
    { key: "contact_phone", value: "+250 788 628 417", description: "Contact phone" },
  ];

  for (const s of settings) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  console.log("✅ Default site settings seeded");
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
