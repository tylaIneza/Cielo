"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SectionHeader } from "@/components/ui/section-header";
import { formatPrice } from "@/lib/utils";

const FABRICS = [
  {
    name: "Kitenge",
    origin: "East Africa",
    description: "Bold geometric and floral prints woven into vibrant cotton canvas. A staple of East African fashion celebrated across the continent.",
    pricePerMeter: 8500,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80",
    colors: ["#c8400d", "#1a6b3c", "#c9a84c", "#2d3a8c", "#7b2d8c"],
    tag: "Most Popular",
  },
  {
    name: "Ankara",
    origin: "West Africa",
    description: "Wax-print cotton with rich, layered patterns rooted in West African tradition. Versatile, vibrant, and unmistakably African.",
    pricePerMeter: 9200,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    colors: ["#e8490d", "#c9a84c", "#1a6b3c", "#0d3a7b", "#8c2d2d"],
    tag: "New Arrivals",
  },
  {
    name: "Satin",
    origin: "Luxury Weave",
    description: "Silky smooth with a subtle sheen — our premium satin is perfect for evening wear, bridal gowns, and luxury loungewear.",
    pricePerMeter: 14000,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    colors: ["#f5f0e8", "#c9a84c", "#2d1a0d", "#0a0a0a", "#7b3030"],
    tag: "Premium",
  },
  {
    name: "Silk",
    origin: "Luxury Weave",
    description: "Natural silk with a breathtaking drape and luminous finish. The pinnacle of luxury fabric for those who demand the finest.",
    pricePerMeter: 22000,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
    colors: ["#f5f0e8", "#c9a84c", "#e8b4b8", "#a8d5e2", "#2d1a0d"],
    tag: "Exclusive",
  },
  {
    name: "Chiffon",
    origin: "Sheer Weave",
    description: "Lightweight and ethereal — chiffon adds grace and movement to any garment. Ideal for flowing dresses, blouses, and overlays.",
    pricePerMeter: 7800,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    colors: ["#f5f0e8", "#e8b4b8", "#a8d5e2", "#c9a84c", "#b8e0c8"],
    tag: "Best Seller",
  },
  {
    name: "Lace",
    origin: "Artisan Weave",
    description: "Intricate lacework that adds refinement and femininity. Available in delicate floral patterns, perfect for formal and bridal wear.",
    pricePerMeter: 16500,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    colors: ["#f5f0e8", "#c9a84c", "#2d1a0d", "#e8d5b8"],
    tag: "Bridal",
  },
];

export default function FabricsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050505]">
        {/* Header */}
        <section className="relative py-32 bg-[#050505] border-b border-[#c9a84c]/10 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <Image src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=80" alt="" fill className="object-cover" />
          </div>
          <div className="container-luxury relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <span className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.45em]">Our Materials</span>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f5f0e8] mt-4 mb-6 leading-[1.05]">
                The Fabric<br />
                <span className="text-gold-gradient">Collection.</span>
              </h1>
              <p className="text-[#aaaaaa] text-lg leading-relaxed max-w-xl">
                Every garment begins with the right fabric. Browse our curated selection of
                African heritage textiles and luxury weaves — available for custom tailoring
                or purchase by the meter.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Fabrics Grid */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="container-luxury">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FABRICS.map((fabric, i) => (
                <motion.div
                  key={fabric.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group"
                >
                  <div className="card-luxury overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
                      <Image src={fabric.image} alt={fabric.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-[#c9a84c] text-black text-[0.6rem] font-bold uppercase tracking-[0.15em]">
                          {fabric.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display text-xl font-semibold text-[#f5f0e8]">{fabric.name}</h3>
                          <p className="text-[0.7rem] text-[#c9a84c] uppercase tracking-[0.15em] mt-0.5">{fabric.origin}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#f5f0e8] font-semibold">{formatPrice(fabric.pricePerMeter)}</p>
                          <p className="text-[0.65rem] text-[#555]">per meter</p>
                        </div>
                      </div>
                      <p className="text-[0.82rem] text-[#aaaaaa] leading-relaxed mb-5">{fabric.description}</p>
                      <div className="flex items-center gap-2 mb-5">
                        <span className="text-[0.65rem] text-[#555] uppercase tracking-wider">Colors:</span>
                        <div className="flex gap-1.5">
                          {fabric.colors.map((color) => (
                            <div
                              key={color}
                              className="w-4 h-4 rounded-full border border-white/10"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <Link href="/tailoring">
                        <LuxuryButton variant="outline-gold" size="sm" className="w-full justify-center">
                          Use for Custom Tailoring <ArrowRight className="w-3.5 h-3.5" />
                        </LuxuryButton>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#050505] border-t border-[#c9a84c]/10">
          <div className="container-luxury text-center">
            <SectionHeader
              eyebrow="Custom Tailoring"
              title="Choose Your Fabric. We&apos;ll Do the Rest."
              subtitle="Work with our master tailors to turn any fabric from our collection into a bespoke garment crafted precisely to your measurements."
              className="mb-10"
            />
            <Link href="/tailoring">
              <LuxuryButton variant="gold" size="lg">
                Start a Tailoring Request <ArrowRight className="w-4 h-4" />
              </LuxuryButton>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
