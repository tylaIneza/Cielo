"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { formatPrice } from "@/lib/utils";

const DEMO_WISHLIST = [
  { id: "1", name: "Emerald Kitenge Evening Dress", price: 85000, comparePrice: 110000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b8e0b?w=600&q=80", category: "Women", slug: "emerald-kitenge-evening-dress", inStock: true },
  { id: "9", name: "Satin Wedding Gown", price: 350000, comparePrice: null, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", category: "Women", slug: "satin-wedding-gown", inStock: true },
  { id: "3", name: "Classic Linen Men's Suit", price: 180000, comparePrice: 220000, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", category: "Men", slug: "classic-linen-mens-suit", inStock: false },
];

export default function WishlistPage() {
  const [items, setItems] = useState(DEMO_WISHLIST);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] pt-6 pb-24">
        <div className="border-b border-[#c9a84c]/10 bg-[#050505] py-12">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.3em] mb-3">My Account</p>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-[#c9a84c] fill-[#c9a84c]" />
                <h1 className="font-display text-4xl font-semibold text-[#f5f0e8]">Wishlist</h1>
              </div>
              <p className="text-[#aaaaaa] text-sm mt-3">{items.length} saved {items.length === 1 ? "item" : "items"}</p>
            </motion.div>
          </div>
        </div>

        <div className="container-luxury mt-10">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <Heart className="w-16 h-16 text-[#2a2a2a] mx-auto mb-6" />
              <p className="font-display text-2xl text-[#f5f0e8] mb-3">Your wishlist is empty</p>
              <p className="text-[#555] text-sm mb-8">Save pieces you love and come back to them anytime.</p>
              <Link href="/shop">
                <LuxuryButton variant="gold">Browse Collections <ArrowRight className="w-4 h-4" /></LuxuryButton>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="card-luxury overflow-hidden">
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />

                        {!item.inStock && (
                          <div className="absolute inset-0 bg-[#0a0a0a]/60 flex items-center justify-center">
                            <span className="text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.2em] bg-[#0a0a0a]/80 px-3 py-1.5">Out of Stock</span>
                          </div>
                        )}

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-3 right-3 w-8 h-8 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#aaaaaa] hover:text-[#f44336] transition-colors opacity-0 group-hover:opacity-100 duration-200"
                          aria-label="Remove from wishlist"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        {/* Quick add */}
                        {item.inStock && (
                          <div className="absolute bottom-0 inset-x-0 py-3 bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] text-black text-[0.65rem] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <p className="text-[0.6rem] text-[#c9a84c] uppercase tracking-[0.2em] mb-1">{item.category}</p>
                        <Link href={`/shop/${item.slug}`}>
                          <h3 className="font-display text-[0.88rem] font-medium text-[#f5f0e8] mb-2 leading-tight hover:text-[#c9a84c] transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-[#f5f0e8]">{formatPrice(item.price)}</span>
                          {item.comparePrice && (
                            <span className="text-[0.8rem] text-[#555] line-through">{formatPrice(item.comparePrice)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 text-center"
            >
              <Link href="/shop">
                <LuxuryButton variant="outline-gold">
                  Continue Shopping <ArrowRight className="w-4 h-4" />
                </LuxuryButton>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
