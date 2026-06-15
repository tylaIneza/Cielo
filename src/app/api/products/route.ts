import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const collection = searchParams.get("collection");
    const categorySlug = searchParams.get("category");
    const featured = searchParams.get("featured") === "true";
    const newArrivals = searchParams.get("new") === "true";
    const bestSellers = searchParams.get("bestsellers") === "true";
    const search = searchParams.get("q");
    const sortBy = searchParams.get("sort") || "newest";
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;

    const where: Record<string, unknown> = { isActive: true };
    if (collection) where.collection = collection;
    if (featured) where.isFeatured = true;
    if (newArrivals) where.isNewArrival = true;
    if (bestSellers) where.isBestSeller = true;
    if (categorySlug) where.category = { slug: categorySlug };
    if (search) where.name = { contains: search };
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) (where.price as Record<string, number>).gte = minPrice;
      if (maxPrice !== undefined) (where.price as Record<string, number>).lte = maxPrice;
    }

    const orderBy: Record<string, string> = {};
    switch (sortBy) {
      case "price-asc": orderBy.price = "asc"; break;
      case "price-desc": orderBy.price = "desc"; break;
      case "rating": orderBy.createdAt = "desc"; break;
      default: orderBy.createdAt = "desc";
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          images: { where: { isPrimary: true }, take: 1 },
          category: true,
          variants: { take: 5 },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.product.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        items: products,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
