"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Heart, ShoppingBag, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SectionHeader } from "@/components/ui/section-header";
import { LuxuryBadge } from "@/components/ui/luxury-badge";
import { formatPrice } from "@/lib/utils";

const CATEGORIES = [
  { name: "Suits", href: "/men/suits", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", count: 16 },
  { name: "Shirts", href: "/men/shirts", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80", count: 22 },
  { name: "Trousers", href: "/men/trousers", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80", count: 14 },
  { name: "Traditional Wear", href: "/men/traditional", image: "https://images.unsplash.com/photo-1614093302611-8efc4f0e25eb?w=600&q=80", count: 11 },
  { name: "Casual Wear", href: "/men/casual", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80", count: 19 },
  { name: "Jackets", href: "/men/jackets", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", count: 8 },
];

const FEATURED = [
  { id: "3", name: "Classic Linen Men's Suit", price: 180000, comparePrice: 220000, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", isNew: true, isBestSeller: true, rating: 5.0, reviews: 15, slug: "classic-linen-mens-suit" },
  { id: "8", name: "Traditional Dashiki Shirt", price: 38000, comparePrice: 45000, image: "https://images.unsplash.com/photo-1614093302611-8efc4f0e25eb?w=600&q=80", isNew: false, isBestSeller: false, rating: 4.7, reviews: 24, slug: "traditional-dashiki-shirt" },
  { id: "m3", name: "Tailored Slim-Fit Trousers", price: 62000, comparePrice: null, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80", isNew: true, isBestSeller: false, rating: 4.6, reviews: 17, slug: "tailored-slim-fit-trousers" },
  { id: "m4", name: "Premium Casual Shirt", price: 45000, comparePrice: 55000, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80", isNew: false, isBestSeller: true, rating: 4.8, reviews: 29, slug: "premium-casual-shirt" },
];

export default function MenPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      <Navbar />
      <main className="bg-[#050505]">
        {/* Hero */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80"
              alt="Men's Collection"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/50 to-transparent" />
          </motion.div>

          <div className="container-luxury relative z-10 py-32">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <span className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.45em]">Men&apos;s Collection</span>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-[#f5f0e8] mt-4 mb-6 leading-[1.05]">
                Refined.<br />
                <span className="text-gold-gradient">Powerful.</span>
              </h1>
              <p className="text-[#aaaaaa] text-lg leading-relaxed mb-8 max-w-xl">
                Precision tailoring meets African elegance. Our men&apos;s collection is built
                for the man who commands attention — in every room, on every occasion.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/shop?collection=MEN">
                  <LuxuryButton variant="gold" size="lg">
                    Shop Men <ArrowRight className="w-4 h-4" />
                  </LuxuryButton>
                </Link>
                <Link href="/tailoring">
                  <LuxuryButton variant="outline-gold" size="lg">Bespoke Suits</LuxuryButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="container-luxury">
            <SectionHeader eyebrow="Browse by Category" title="Men&apos;s Categories" className="mb-14" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <Link href={cat.href} className="group block relative overflow-hidden aspect-[3/4] card-luxury">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-5">
                      <h3 className="font-display text-lg font-semibold text-[#f5f0e8]">{cat.name}</h3>
                      <p className="text-[0.7rem] text-[#c9a84c] mt-0.5">{cat.count} pieces</p>
                      <div className="flex items-center gap-1.5 mt-3 text-[0.65rem] text-[#c9a84c] font-medium uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Shop Now <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="py-24 bg-[#050505]">
          <div className="container-luxury">
            <div className="flex items-end justify-between mb-12">
              <SectionHeader eyebrow="Curated For Him" title="Featured Pieces" align="left" className="mb-0" />
              <Link href="/shop?collection=MEN" className="text-[0.75rem] text-[#c9a84c] uppercase tracking-[0.15em] hover:text-[#f0d98b] transition-colors hidden md:flex items-center gap-1.5">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {FEATURED.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="group"
                >
                  <div className="card-luxury overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
                      <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.isNew && <LuxuryBadge variant="emerald">New</LuxuryBadge>}
                        {product.isBestSeller && <LuxuryBadge variant="gold">Best Seller</LuxuryBadge>}
                        {product.comparePrice && <LuxuryBadge variant="dark">Sale</LuxuryBadge>}
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="w-9 h-9 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#c9a84c]/20 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 py-3 bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] text-black text-[0.65rem] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                      </div>
                    </div>
                    <div className="p-4">
                      <Link href={`/shop/${product.slug}`}>
                        <h3 className="font-display text-[0.9rem] font-medium text-[#f5f0e8] mb-2 leading-tight hover:text-[#c9a84c] transition-colors line-clamp-2">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? "text-[#c9a84c] fill-[#c9a84c]" : "text-[#555]"}`} />
                        ))}
                        <span className="text-[0.65rem] text-[#555] ml-1">({product.reviews})</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-[#f5f0e8]">{formatPrice(product.price)}</span>
                        {product.comparePrice && <span className="text-[0.8rem] text-[#555] line-through">{formatPrice(product.comparePrice)}</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
