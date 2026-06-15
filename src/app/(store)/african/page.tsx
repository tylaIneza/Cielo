"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SectionHeader } from "@/components/ui/section-header";

const AFRICAN_COLLECTIONS = [
  { name: "Kitenge Fashion", desc: "East African Kitenge in bold, beautiful patterns", image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80", href: "/shop?collection=kitenge" },
  { name: "Ankara Fashion", desc: "West African Ankara prints reimagined for modern royalty", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80", href: "/shop?collection=ankara" },
  { name: "Dashiki Fashion", desc: "Traditional Dashiki elevated to luxury status", image: "https://images.unsplash.com/photo-1614093302611-8efc4f0e25eb?w=600&q=80", href: "/shop?collection=dashiki" },
  { name: "Contemporary African", desc: "Pan-African fusion for the global modern woman", image: "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=600&q=80", href: "/shop?collection=contemporary" },
  { name: "Luxury Collections", desc: "Our most exclusive African luxury pieces", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80", href: "/shop?collection=luxury-african" },
];

export default function AfricanCollectionPage() {
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
            <Image src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=80" alt="African Collection" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/50 to-transparent" />
          </motion.div>

          <div className="container-luxury relative z-10 py-32">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <span className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.45em]">The African Collection</span>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-[#f5f0e8] mt-4 mb-6 leading-[1.05]">
                Africa&apos;s Luxury,<br />
                <span className="text-gold-gradient">Your Style.</span>
              </h1>
              <p className="text-[#aaaaaa] text-lg leading-relaxed mb-8 max-w-xl">
                Our African Collection celebrates the richness of the continent&apos;s textile heritage —
                Kitenge, Ankara, Dashiki, and beyond — elevated to world-class luxury fashion.
                Rooted in Rwanda, reaching the world.
              </p>
              <div className="flex gap-4">
                <Link href="/shop?collection=african">
                  <LuxuryButton variant="gold" size="lg">
                    Explore Collection <ArrowRight className="w-4 h-4" />
                  </LuxuryButton>
                </Link>
                <Link href="/tailoring">
                  <LuxuryButton variant="outline-gold" size="lg">Custom Tailoring</LuxuryButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story section */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeader
                  eyebrow="Our Heritage"
                  title="African Fabric, Global Standard."
                  subtitle="Every piece in our African Collection is a dialogue between tradition and modernity — honoring the visual language of Africa while meeting the demands of contemporary luxury fashion."
                  align="left"
                />
                <div className="mt-8 space-y-4">
                  {[
                    "Genuine hand-dyed and printed Kitenge from East African artisans",
                    "Authentic Ankara fabrics sourced from West African textile houses",
                    "Embroidery and beadwork by Rwandan craftspeople",
                    "Sustainable sourcing practices that support local communities",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-2.5 shrink-0" />
                      <p className="text-[0.85rem] text-[#aaaaaa] leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[500px]">
                <div className="absolute top-0 left-0 right-16 bottom-12 overflow-hidden rounded-sm">
                  <Image src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&q=80" alt="African textiles" fill className="object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-48 h-60 overflow-hidden rounded-sm border-4 border-[#050505]">
                  <Image src="https://images.unsplash.com/photo-1614093302611-8efc4f0e25eb?w=400&q=80" alt="African fashion detail" fill className="object-cover" />
                </div>
                <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#c9a84c]/40" />
              </div>
            </div>
          </div>
        </section>

        {/* Collections grid */}
        <section className="py-24 bg-[#050505]">
          <div className="container-luxury">
            <SectionHeader eyebrow="Browse by Style" title="African Collections" className="mb-14" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AFRICAN_COLLECTIONS.map((col, i) => (
                <motion.div
                  key={col.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`group ${i === 0 ? "md:col-span-2 lg:col-span-1 md:row-span-2" : ""}`}
                >
                  <Link href={col.href} className="block relative overflow-hidden aspect-[3/4] card-luxury">
                    <Image src={col.image} alt={col.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <h3 className="font-display text-xl font-semibold text-[#f5f0e8] mb-1">{col.name}</h3>
                      <p className="text-[0.78rem] text-[#aaaaaa]">{col.desc}</p>
                      <div className="flex items-center gap-2 mt-3 text-[0.7rem] text-[#c9a84c] font-medium uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Shop Now <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden">
                      <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-[#c9a84c]/30 group-hover:border-[#c9a84c] transition-colors" />
                    </div>
                  </Link>
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
