"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { LuxuryBadge } from "@/components/ui/luxury-badge";
import { formatPrice } from "@/lib/utils";

const DEMO_PRODUCTS = [
  {
    id: "1",
    name: "Emerald Kitenge Evening Dress",
    price: 85000,
    comparePrice: 110000,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b8e0b?w=600&q=80",
    category: "Women",
    rating: 4.9,
    reviews: 42,
    isNew: true,
    slug: "emerald-kitenge-evening-dress",
  },
  {
    id: "2",
    name: "Gold Ankara Two-Piece Set",
    price: 65000,
    comparePrice: null,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    category: "Women",
    rating: 4.8,
    reviews: 28,
    isNew: true,
    slug: "gold-ankara-two-piece-set",
  },
  {
    id: "3",
    name: "Classic Linen Men's Suit",
    price: 180000,
    comparePrice: 220000,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    category: "Men",
    rating: 5.0,
    reviews: 15,
    isNew: true,
    slug: "classic-linen-mens-suit",
  },
  {
    id: "4",
    name: "Kente Pattern Maxi Dress",
    price: 72000,
    comparePrice: null,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    category: "African",
    rating: 4.7,
    reviews: 36,
    isNew: false,
    slug: "kente-pattern-maxi-dress",
  },
  {
    id: "5",
    name: "Silk Chiffon Blouse",
    price: 48000,
    comparePrice: null,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
    category: "Women",
    rating: 4.6,
    reviews: 22,
    isNew: true,
    slug: "silk-chiffon-blouse",
  },
  {
    id: "6",
    name: "Ankara Print Kaftan",
    price: 55000,
    comparePrice: 68000,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80",
    category: "Women",
    rating: 4.8,
    reviews: 31,
    isNew: false,
    slug: "ankara-print-kaftan",
  },
  {
    id: "7",
    name: "Boys Safari Set",
    price: 32000,
    comparePrice: null,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80",
    category: "Kids",
    rating: 4.9,
    reviews: 18,
    isNew: true,
    slug: "boys-safari-set",
  },
  {
    id: "8",
    name: "Traditional Dashiki Shirt",
    price: 38000,
    comparePrice: 45000,
    image: "https://images.unsplash.com/photo-1614093302611-8efc4f0e25eb?w=600&q=80",
    category: "Men",
    rating: 4.7,
    reviews: 24,
    isNew: false,
    slug: "traditional-dashiki-shirt",
  },
];

function ProductCard({
  product,
  index,
}: {
  product: (typeof DEMO_PRODUCTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        whileHover={{
          rotateY: 3,
          rotateX: -3,
          scale: 1.02,
          z: 20,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="card-luxury overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <LuxuryBadge variant="emerald">New</LuxuryBadge>
            )}
            {product.comparePrice && (
              <LuxuryBadge variant="gold">Sale</LuxuryBadge>
            )}
          </div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 right-3 flex flex-col gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#c9a84c]/20 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-colors rounded-sm"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </motion.button>
            <Link href={`/shop/${product.slug}`}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#c9a84c]/20 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-colors rounded-sm"
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Quick add to cart */}
          <motion.button
            initial={{ y: "100%", opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 inset-x-0 py-3 bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] text-black text-[0.65rem] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-[0.6rem] text-[#c9a84c] uppercase tracking-[0.2em] mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-[0.95rem] font-medium text-[#f5f0e8] mb-2 leading-tight group-hover:text-[#c9a84c] transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.round(product.rating)
                      ? "text-[#c9a84c] fill-[#c9a84c]"
                      : "text-[#555]"
                  }`}
                />
              ))}
            </div>
            <span className="text-[0.65rem] text-[#555]">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-[#f5f0e8] text-[0.95rem]">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-[0.8rem] text-[#555] line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function NewArrivals() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeader
            eyebrow="Just Landed"
            title="New Arrivals"
            subtitle="Fresh from our Kigali atelier — the latest pieces to elevate your wardrobe."
            align="left"
          />
          <Link
            href="/shop?filter=new"
            className="whitespace-nowrap text-[0.75rem] text-[#c9a84c] uppercase tracking-[0.2em] hover:text-[#f0d98b] transition-colors flex items-center gap-2 group"
          >
            View All
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {DEMO_PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
