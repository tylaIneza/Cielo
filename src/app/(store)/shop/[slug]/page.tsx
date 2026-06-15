"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Ruler,
  Truck,
  Shield,
  Scissors,
  Minus,
  Plus,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { LuxuryBadge } from "@/components/ui/luxury-badge";
import { formatPrice } from "@/lib/utils";

const Product360Viewer = dynamic(
  () => import("@/components/3d/Product360Viewer").then((m) => m.Product360Viewer),
  { ssr: false }
);

const DEMO_PRODUCT = {
  id: "1",
  name: "Emerald Kitenge Evening Dress",
  price: 85000,
  comparePrice: 110000,
  rating: 4.9,
  reviews: 42,
  isNew: true,
  isBestSeller: false,
  category: "Women",
  description:
    "An exquisite evening dress crafted from premium Rwandan Kitenge fabric, featuring intricate hand-embroidered goldwork at the neckline and hem. This piece celebrates the beauty of African textile art while delivering a silhouette that is both timeless and contemporary. Perfect for formal events, weddings, and celebrations.",
  details: [
    "Fabric: 100% Premium Kitenge (sourced locally from Kigali)",
    "Lining: Silk satin lining for comfort",
    "Embroidery: Hand-stitched goldwork on neckline and hem",
    "Closure: Concealed back zipper",
    "Care: Dry clean only",
    "Made in: Kigali, Rwanda",
  ],
  colors: [
    { name: "Emerald", hex: "#1a6b3c" },
    { name: "Gold", hex: "#c9a84c" },
    { name: "Royal Blue", hex: "#1a3b6b" },
    { name: "Crimson", hex: "#8b1a1a" },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  images: [
    "https://images.unsplash.com/photo-1594938298603-c8148c4b8e0b?w=800&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
  ],
};

const TESTIMONIALS = [
  { name: "Amara N.", rating: 5, text: "Absolutely stunning! The quality of the fabric and the craftsmanship is extraordinary. I wore this to a gala and received countless compliments.", date: "2 weeks ago" },
  { name: "Sophie L.", rating: 5, text: "This dress is a work of art. The attention to detail in the embroidery is remarkable. Truly worth every franc.", date: "1 month ago" },
  { name: "Grace U.", rating: 4, text: "Beautiful dress. The color is even more vibrant in person. Sizing runs slightly small — I'd recommend going up one size.", date: "1 month ago" },
];

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState(DEMO_PRODUCT.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [viewMode, setViewMode] = useState<"photos" | "3d">("photos");
  const [activeTab, setActiveTab] = useState<"details" | "care" | "reviews">("details");
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] py-8">
        <div className="container-luxury">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[0.7rem] text-[#555] mb-8">
            <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#c9a84c] transition-colors">Shop</Link>
            <span>/</span>
            <Link href="/women" className="hover:text-[#c9a84c] transition-colors">Women</Link>
            <span>/</span>
            <span className="text-[#aaaaaa]">{DEMO_PRODUCT.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
            {/* Left — Gallery / 3D Viewer */}
            <div className="flex flex-col gap-4">
              {/* View mode toggle */}
              <div className="flex gap-2">
                {(["photos", "3d"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.15em] transition-all ${
                      viewMode === mode
                        ? "bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] text-black"
                        : "border border-[#c9a84c]/20 text-[#aaaaaa] hover:border-[#c9a84c]/40"
                    }`}
                  >
                    {mode === "3d" ? "360° View" : "Photos"}
                  </button>
                ))}
              </div>

              {/* Main display */}
              <div className="relative aspect-[4/5] bg-[#0d0d0d] overflow-hidden">
                <AnimatePresence mode="wait">
                  {viewMode === "photos" ? (
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={DEMO_PRODUCT.images[activeImage]}
                        alt={DEMO_PRODUCT.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="3d"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      <Product360Viewer color={selectedColor.hex} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {DEMO_PRODUCT.isNew && <LuxuryBadge variant="emerald">New</LuxuryBadge>}
                </div>

                {/* Photo navigation */}
                {viewMode === "photos" && (
                  <>
                    <button
                      onClick={() => setActiveImage((i) => (i - 1 + DEMO_PRODUCT.images.length) % DEMO_PRODUCT.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#c9a84c]/20 flex items-center justify-center text-[#f5f0e8] hover:border-[#c9a84c]/50 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImage((i) => (i + 1) % DEMO_PRODUCT.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#c9a84c]/20 flex items-center justify-center text-[#f5f0e8] hover:border-[#c9a84c]/50 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {viewMode === "photos" && (
                <div className="flex gap-3">
                  {DEMO_PRODUCT.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-20 h-24 overflow-hidden border-2 transition-all ${
                        activeImage === i ? "border-[#c9a84c]" : "border-[#c9a84c]/15 hover:border-[#c9a84c]/40"
                      }`}
                    >
                      <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right — Product Info */}
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div>
                <p className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.25em] mb-2">
                  {DEMO_PRODUCT.category}
                </p>
                <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#f5f0e8] leading-tight mb-3">
                  {DEMO_PRODUCT.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.round(DEMO_PRODUCT.rating) ? "text-[#c9a84c] fill-[#c9a84c]" : "text-[#555]"}`} />
                    ))}
                  </div>
                  <span className="text-[0.8rem] text-[#aaaaaa]">{DEMO_PRODUCT.rating} ({DEMO_PRODUCT.reviews} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-[#f5f0e8]">
                  {formatPrice(DEMO_PRODUCT.price)}
                </span>
                {DEMO_PRODUCT.comparePrice && (
                  <span className="text-lg text-[#555] line-through">
                    {formatPrice(DEMO_PRODUCT.comparePrice)}
                  </span>
                )}
                {DEMO_PRODUCT.comparePrice && (
                  <LuxuryBadge variant="emerald">
                    Save {formatPrice(DEMO_PRODUCT.comparePrice - DEMO_PRODUCT.price)}
                  </LuxuryBadge>
                )}
              </div>

              <div className="divider-gold opacity-30" />

              {/* Colors */}
              <div>
                <p className="text-[0.75rem] font-medium text-[#aaaaaa] uppercase tracking-[0.15em] mb-3">
                  Color: <span className="text-[#f5f0e8]">{selectedColor.name}</span>
                </p>
                <div className="flex gap-3">
                  {DEMO_PRODUCT.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? "border-[#c9a84c] scale-110"
                          : "border-transparent hover:border-[#c9a84c]/50"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[0.75rem] font-medium text-[#aaaaaa] uppercase tracking-[0.15em]">
                    Size: <span className="text-[#f5f0e8]">{selectedSize || "Select"}</span>
                  </p>
                  <button className="flex items-center gap-1.5 text-[0.7rem] text-[#c9a84c] hover:text-[#f0d98b] transition-colors">
                    <Ruler className="w-3.5 h-3.5" />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {DEMO_PRODUCT.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 text-[0.8rem] font-medium transition-all ${
                        selectedSize === size
                          ? "bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] text-black"
                          : "border border-[#c9a84c]/20 text-[#aaaaaa] hover:border-[#c9a84c]/50 hover:text-[#f5f0e8]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-[0.75rem] font-medium text-[#aaaaaa] uppercase tracking-[0.15em] mb-3">Quantity</p>
                <div className="flex items-center gap-0 border border-[#c9a84c]/20 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center text-[#f5f0e8] font-medium border-x border-[#c9a84c]/20">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <LuxuryButton variant="gold" size="xl" className="w-full">
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart — {formatPrice(DEMO_PRODUCT.price * quantity)}
                </LuxuryButton>
                <div className="flex gap-3">
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.15em] border transition-all ${
                      wishlisted
                        ? "bg-[#c9a84c]/10 border-[#c9a84c]/50 text-[#c9a84c]"
                        : "border-[#c9a84c]/20 text-[#aaaaaa] hover:border-[#c9a84c]/50 hover:text-[#c9a84c]"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? "fill-[#c9a84c]" : ""}`} />
                    {wishlisted ? "Wishlisted" : "Wishlist"}
                  </button>
                  <Link href="/tailoring" className="flex-1">
                    <button className="w-full flex items-center justify-center gap-2 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.15em] border border-[#1a6b3c]/40 text-[#22a85a] hover:border-[#1a6b3c] hover:bg-[#1a6b3c]/10 transition-all">
                      <Scissors className="w-4 h-4" />
                      Custom Tailor
                    </button>
                  </Link>
                </div>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#c9a84c]/10">
                {[
                  { icon: Truck, label: "Free Delivery", sub: "Orders above RWF 50k" },
                  { icon: RotateCcw, label: "Easy Returns", sub: "14-day return policy" },
                  { icon: Shield, label: "Authentic", sub: "Made in Rwanda" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-1.5">
                    <Icon className="w-5 h-5 text-[#c9a84c]" />
                    <p className="text-[0.7rem] font-medium text-[#f5f0e8]">{label}</p>
                    <p className="text-[0.65rem] text-[#555]">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div>
                <div className="flex gap-0 border-b border-[#c9a84c]/10">
                  {(["details", "care", "reviews"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.12em] border-b-2 transition-all ${
                        activeTab === tab
                          ? "border-[#c9a84c] text-[#c9a84c]"
                          : "border-transparent text-[#555] hover:text-[#aaaaaa]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="pt-5">
                  {activeTab === "details" && (
                    <div>
                      <p className="text-[0.85rem] text-[#aaaaaa] leading-relaxed mb-4">{DEMO_PRODUCT.description}</p>
                      <ul className="space-y-2">
                        {DEMO_PRODUCT.details.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-[0.8rem] text-[#aaaaaa]">
                            <span className="w-1 h-1 rounded-full bg-[#c9a84c] mt-2 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === "care" && (
                    <div className="text-[0.85rem] text-[#aaaaaa] space-y-2">
                      <p>• Dry clean only</p>
                      <p>• Store hanging to preserve shape</p>
                      <p>• Avoid direct sunlight to prevent color fading</p>
                      <p>• Iron on low heat through a cloth</p>
                      <p>• Handle embroidery with care</p>
                    </div>
                  )}
                  {activeTab === "reviews" && (
                    <div className="space-y-4">
                      {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="glass-dark p-4 rounded-sm border border-[#c9a84c]/10">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-[0.85rem] font-medium text-[#f5f0e8]">{t.name}</p>
                              <p className="text-[0.65rem] text-[#555]">{t.date}</p>
                            </div>
                            <div className="flex gap-0.5">
                              {[1,2,3,4,5].map(s => (
                                <Star key={s} className={`w-3.5 h-3.5 ${s <= t.rating ? "text-[#c9a84c] fill-[#c9a84c]" : "text-[#555]"}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-[0.8rem] text-[#aaaaaa] leading-relaxed">{t.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
