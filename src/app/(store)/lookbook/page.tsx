"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryButton } from "@/components/ui/luxury-button";

const CAMPAIGNS = [
  { id: 1, title: "Emerald Dreams", season: "SS 2025", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80", description: "Where African heritage meets modern luxury" },
  { id: 2, title: "Gold Rush", season: "FW 2024", image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1200&q=80", description: "Bold, glamorous, unapologetically African" },
  { id: 3, title: "Kigali Nights", season: "Resort 2025", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80", description: "Elegant eveningwear inspired by Rwanda's vibrant capital" },
];

const EDITORIAL_GRID = [
  { id: 1, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b8e0b?w=600&q=80", size: "tall" },
  { id: 2, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80", size: "short" },
  { id: 3, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80", size: "short" },
  { id: 4, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", size: "tall" },
  { id: 5, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80", size: "short" },
  { id: 6, image: "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=600&q=80", size: "short" },
];

export default function LookbookPage() {
  const [activeCampaign, setActiveCampaign] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <Navbar />
      <main className="bg-[#050505]">
        {/* Hero Campaign */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0">
            <Image
              src={CAMPAIGNS[activeCampaign].image}
              alt={CAMPAIGNS[activeCampaign].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]" />
          </motion.div>

          <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center px-6">
            <motion.p key={activeCampaign} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.5em] mb-3">
              {CAMPAIGNS[activeCampaign].season}
            </motion.p>
            <motion.h1 key={`title-${activeCampaign}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-5xl md:text-7xl font-bold text-[#f5f0e8] mb-4">
              {CAMPAIGNS[activeCampaign].title}
            </motion.h1>
            <motion.p key={`desc-${activeCampaign}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[#aaaaaa] text-lg mb-8 max-w-sm">
              {CAMPAIGNS[activeCampaign].description}
            </motion.p>
            <Link href="/shop">
              <LuxuryButton variant="gold" size="lg">
                Shop the Campaign <ArrowRight className="w-4 h-4" />
              </LuxuryButton>
            </Link>
          </motion.div>

          {/* Campaign switcher */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {CAMPAIGNS.map((c, i) => (
              <button key={c.id} onClick={() => setActiveCampaign(i)} className={`transition-all duration-300 rounded-full ${i === activeCampaign ? "w-2 h-10 bg-[#c9a84c]" : "w-2 h-5 bg-[#555] hover:bg-[#aaaaaa]"}`} />
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="py-16 bg-[#0a0a0a]">
          <div className="container-luxury text-center">
            <span className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.4em]">The Edit</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#f5f0e8] mt-3 mb-6">
              Fashion Captured
            </h2>
            <p className="text-[#aaaaaa] max-w-lg mx-auto">
              An editorial journey through Cielo&apos;s most iconic looks. Each image tells a story of craftsmanship, elegance, and African identity.
            </p>
          </div>
        </div>

        {/* Editorial Grid */}
        <section className="bg-[#0a0a0a] pb-24">
          <div className="container-luxury">
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {EDITORIAL_GRID.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => setLightbox(item.image)}
                >
                  <div className={`relative overflow-hidden ${item.size === "tall" ? "aspect-[2/3]" : "aspect-[4/3]"}`}>
                    <Image src={item.image} alt={`Cielo Lookbook ${item.id}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-[#f5f0e8]/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-[200] bg-[#050505]/95 flex items-center justify-center p-6"
            >
              <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center text-[#f5f0e8] hover:border-[#c9a84c] transition-colors">
                <X className="w-5 h-5" />
              </button>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-3xl max-h-[85vh] w-full aspect-[3/4]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={lightbox} alt="Lookbook" fill className="object-contain" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
