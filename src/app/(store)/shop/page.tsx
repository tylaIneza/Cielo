"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Heart,
  ShoppingBag,
  Eye,
  Star,
  ChevronDown,
  X,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryBadge } from "@/components/ui/luxury-badge";
import { formatPrice } from "@/lib/utils";

const PRODUCTS = [
  { id: "1", name: "Emerald Kitenge Evening Dress", price: 85000, comparePrice: 110000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b8e0b?w=600&q=80", category: "Women", collection: "WOMEN", isNew: true, isBestSeller: false, rating: 4.9, reviews: 42, slug: "emerald-kitenge-evening-dress" },
  { id: "2", name: "Gold Ankara Two-Piece Set", price: 65000, comparePrice: null, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", category: "Women", collection: "WOMEN", isNew: true, isBestSeller: true, rating: 4.8, reviews: 28, slug: "gold-ankara-two-piece-set" },
  { id: "3", name: "Classic Linen Men's Suit", price: 180000, comparePrice: 220000, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", category: "Men", collection: "MEN", isNew: true, isBestSeller: true, rating: 5.0, reviews: 15, slug: "classic-linen-mens-suit" },
  { id: "4", name: "Kente Pattern Maxi Dress", price: 72000, comparePrice: null, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80", category: "African", collection: "AFRICAN", isNew: false, isBestSeller: true, rating: 4.7, reviews: 36, slug: "kente-pattern-maxi-dress" },
  { id: "5", name: "Silk Chiffon Blouse", price: 48000, comparePrice: null, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80", category: "Women", collection: "WOMEN", isNew: true, isBestSeller: false, rating: 4.6, reviews: 22, slug: "silk-chiffon-blouse" },
  { id: "6", name: "Ankara Print Kaftan", price: 55000, comparePrice: 68000, image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80", category: "Women", collection: "WOMEN", isNew: false, isBestSeller: false, rating: 4.8, reviews: 31, slug: "ankara-print-kaftan" },
  { id: "7", name: "Boys Safari Set", price: 32000, comparePrice: null, image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80", category: "Kids", collection: "KIDS", isNew: true, isBestSeller: false, rating: 4.9, reviews: 18, slug: "boys-safari-set" },
  { id: "8", name: "Traditional Dashiki Shirt", price: 38000, comparePrice: 45000, image: "https://images.unsplash.com/photo-1614093302611-8efc4f0e25eb?w=600&q=80", category: "Men", collection: "MEN", isNew: false, isBestSeller: false, rating: 4.7, reviews: 24, slug: "traditional-dashiki-shirt" },
  { id: "9", name: "Satin Wedding Gown", price: 350000, comparePrice: null, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", category: "Women", collection: "WOMEN", isNew: false, isBestSeller: true, rating: 5.0, reviews: 9, slug: "satin-wedding-gown" },
  { id: "10", name: "Luxury African Jumpsuit", price: 95000, comparePrice: 120000, image: "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=600&q=80", category: "African", collection: "AFRICAN", isNew: true, isBestSeller: false, rating: 4.8, reviews: 14, slug: "luxury-african-jumpsuit" },
  { id: "11", name: "Girls Party Dress", price: 28000, comparePrice: null, image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80", category: "Kids", collection: "KIDS", isNew: false, isBestSeller: false, rating: 4.6, reviews: 21, slug: "girls-party-dress" },
  { id: "12", name: "Tailored Lace Skirt Set", price: 78000, comparePrice: 95000, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80", category: "Women", collection: "WOMEN", isNew: true, isBestSeller: true, rating: 4.9, reviews: 33, slug: "tailored-lace-skirt-set" },
];

const COLLECTIONS = ["All", "WOMEN", "MEN", "KIDS", "AFRICAN"];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
  { label: "Best Sellers", value: "bestseller" },
];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [activeCollection, setActiveCollection] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 400000]);

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCollection = activeCollection === "All" || p.collection === activeCollection;
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchSearch && matchCollection && matchPrice;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "bestseller") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    return 0;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] pt-6 pb-24">
        {/* Page Header */}
        <div className="border-b border-[#c9a84c]/10 bg-[#050505] py-12">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.3em] mb-3">
                Our Collections
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#f5f0e8]">
                Shop All
              </h1>
              <p className="text-[#aaaaaa] text-sm mt-3">
                {filtered.length} pieces available
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container-luxury mt-8">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 pl-10 pr-4 py-2.5 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40 transition-colors"
              />
            </div>

            <div className="flex gap-3 items-center">
              {/* Collection filters */}
              <div className="hidden md:flex gap-2">
                {COLLECTIONS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCollection(c)}
                    className={`px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-all ${
                      activeCollection === c
                        ? "bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] text-black"
                        : "border border-[#c9a84c]/20 text-[#aaaaaa] hover:border-[#c9a84c]/40 hover:text-[#f5f0e8]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#1a1a1a] border border-[#c9a84c]/15 px-4 py-2.5 pr-8 text-[0.8rem] text-[#aaaaaa] outline-none focus:border-[#c9a84c]/40 cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#555] pointer-events-none" />
              </div>

              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 border border-[#c9a84c]/20 text-[0.8rem] text-[#aaaaaa] hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="group"
                >
                  <div className="card-luxury overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.isNew && <LuxuryBadge variant="emerald">New</LuxuryBadge>}
                        {product.isBestSeller && <LuxuryBadge variant="gold">Best Seller</LuxuryBadge>}
                        {product.comparePrice && <LuxuryBadge variant="dark">Sale</LuxuryBadge>}
                      </div>

                      {/* Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="w-9 h-9 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#c9a84c]/20 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <Link href={`/shop/${product.slug}`}>
                          <div className="w-9 h-9 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#c9a84c]/20 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] transition-colors">
                            <Eye className="w-4 h-4" />
                          </div>
                        </Link>
                      </div>

                      {/* Quick add */}
                      <div className="absolute bottom-0 inset-x-0 py-3 bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] text-black text-[0.65rem] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-[0.6rem] text-[#c9a84c] uppercase tracking-[0.2em] mb-1">{product.category}</p>
                      <Link href={`/shop/${product.slug}`}>
                        <h3 className="font-display text-[0.9rem] font-medium text-[#f5f0e8] mb-2 leading-tight hover:text-[#c9a84c] transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? "text-[#c9a84c] fill-[#c9a84c]" : "text-[#555]"}`} />
                        ))}
                        <span className="text-[0.65rem] text-[#555] ml-1">({product.reviews})</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-[#f5f0e8]">{formatPrice(product.price)}</span>
                        {product.comparePrice && (
                          <span className="text-[0.8rem] text-[#555] line-through">{formatPrice(product.comparePrice)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-[#555] text-lg font-display mb-4">No products found</p>
              <button
                onClick={() => { setSearch(""); setActiveCollection("All"); }}
                className="text-[0.8rem] text-[#c9a84c] underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
