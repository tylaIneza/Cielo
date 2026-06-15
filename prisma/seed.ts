import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Cielo Fashion database...");

  // Roles
  const roles = await Promise.all([
    prisma.role.upsert({ where: { name: "super_admin" }, update: {}, create: { name: "super_admin", label: "Super Admin" } }),
    prisma.role.upsert({ where: { name: "admin" }, update: {}, create: { name: "admin", label: "Admin" } }),
    prisma.role.upsert({ where: { name: "manager" }, update: {}, create: { name: "manager", label: "Manager" } }),
    prisma.role.upsert({ where: { name: "tailor" }, update: {}, create: { name: "tailor", label: "Tailor" } }),
    prisma.role.upsert({ where: { name: "sales_staff" }, update: {}, create: { name: "sales_staff", label: "Sales Staff" } }),
    prisma.role.upsert({ where: { name: "customer" }, update: {}, create: { name: "customer", label: "Customer" } }),
  ]);
  console.log("✅ Roles seeded");

  // Super Admin user
  const passwordHash = await bcrypt.hash("Admin@Cielo2025!", 12);
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@cielofashion.rw" },
    update: {},
    create: {
      firstName: "Cielo",
      lastName: "Admin",
      email: "admin@cielofashion.rw",
      passwordHash,
      roleId: roles[0].id,
      isVerified: true,
      isActive: true,
    },
  });
  console.log("✅ Super admin seeded:", superAdmin.email);

  // Categories
  const womenCat = await prisma.category.upsert({ where: { slug: "women" }, update: {}, create: { name: "Women", slug: "women", description: "Women's fashion collection" } });
  const menCat = await prisma.category.upsert({ where: { slug: "men" }, update: {}, create: { name: "Men", slug: "men", description: "Men's fashion collection" } });
  const kidsCat = await prisma.category.upsert({ where: { slug: "kids" }, update: {}, create: { name: "Kids", slug: "kids", description: "Children's fashion collection" } });
  const africanCat = await prisma.category.upsert({ where: { slug: "african" }, update: {}, create: { name: "African", slug: "african", description: "African luxury fashion collection" } });

  const dressCat = await prisma.category.upsert({ where: { slug: "dresses" }, update: {}, create: { name: "Dresses", slug: "dresses", parentId: womenCat.id } });
  const suitsCat = await prisma.category.upsert({ where: { slug: "suits" }, update: {}, create: { name: "Suits", slug: "suits", parentId: menCat.id } });
  console.log("✅ Categories seeded");

  // Fabrics
  const fabrics = await Promise.all([
    prisma.fabric.upsert({ where: { slug: "kitenge-premium" }, update: {}, create: { name: "Premium Kitenge", slug: "kitenge-premium", type: "KITENGE", pricePerMeter: 8500, description: "Finest East African Kitenge fabric with bold geometric patterns" } }),
    prisma.fabric.upsert({ where: { slug: "ankara-royal" }, update: {}, create: { name: "Royal Ankara", slug: "ankara-royal", type: "ANKARA", pricePerMeter: 7500, description: "Authentic West African Ankara wax prints" } }),
    prisma.fabric.upsert({ where: { slug: "silk-pure" }, update: {}, create: { name: "Pure Silk", slug: "silk-pure", type: "SILK", pricePerMeter: 25000, description: "Lustrous pure silk imported from premium suppliers" } }),
    prisma.fabric.upsert({ where: { slug: "cotton-premium" }, update: {}, create: { name: "Premium Cotton", slug: "cotton-premium", type: "COTTON", pricePerMeter: 4500, description: "High-thread-count premium cotton blend" } }),
  ]);
  console.log("✅ Fabrics seeded");

  // Sample products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: "emerald-kitenge-evening-dress" },
      update: {},
      create: {
        name: "Emerald Kitenge Evening Dress",
        slug: "emerald-kitenge-evening-dress",
        description: "An exquisite evening dress crafted from premium Rwandan Kitenge fabric.",
        price: 85000,
        comparePrice: 110000,
        categoryId: dressCat.id,
        collection: "WOMEN",
        isFeatured: true,
        isNewArrival: true,
        isBestSeller: false,
        totalStock: 15,
      },
    }),
    prisma.product.upsert({
      where: { slug: "classic-linen-mens-suit" },
      update: {},
      create: {
        name: "Classic Linen Men's Suit",
        slug: "classic-linen-mens-suit",
        description: "Sharp tailoring meets Rwandan craftsmanship in this premium linen suit.",
        price: 180000,
        comparePrice: 220000,
        categoryId: suitsCat.id,
        collection: "MEN",
        isFeatured: true,
        isNewArrival: true,
        isBestSeller: true,
        totalStock: 8,
      },
    }),
  ]);
  console.log("✅ Products seeded");

  // Coupons
  await prisma.coupon.upsert({
    where: { code: "CIELO10" },
    update: {},
    create: { code: "CIELO10", description: "10% off your first order", type: "PERCENTAGE", value: 10, isActive: true },
  });
  await prisma.coupon.upsert({
    where: { code: "WELCOME5K" },
    update: {},
    create: { code: "WELCOME5K", description: "RWF 5,000 off orders above 50,000", type: "FIXED_AMOUNT", value: 5000, minOrderValue: 50000, isActive: true },
  });
  console.log("✅ Coupons seeded");

  console.log("🎉 Seeding complete! Cielo Fashion is ready.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
