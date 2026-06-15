"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const HERO_WORDS = ["Luxury", "Elegance", "Craftsmanship", "Heritage", "Excellence"];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % HERO_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]"
    >
      {/* Radial background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#1a6b3c]/8 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#c9a84c]/6 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-[#1a6b3c]/5 blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-luxury relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen py-24">
          {/* Left — Text Content */}
          <motion.div style={{ opacity }} className="flex flex-col gap-8 lg:pr-12">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-12 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#c9a84c]">
                Kigali, Rwanda
              </span>
            </motion.div>

            {/* Main Title */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.0] text-[#f5f0e8]"
              >
                African{" "}
                <span className="block">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-gold-gradient"
                  >
                    {HERO_WORDS[wordIndex]}
                  </motion.span>
                </span>
                <span className="block">Redefined.</span>
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-[#aaaaaa] text-lg leading-relaxed max-w-md font-light"
            >
              Discover Rwanda&apos;s most exclusive fashion boutique. Premium collections,
              bespoke tailoring, and contemporary African luxury — all crafted with heart
              in Kigali.
            </motion.p>

            {/* Tagline badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-[#c9a84c]/50" />
              <span className="text-[0.7rem] italic font-display text-[#c9a84c] tracking-wider">
                &ldquo;Crafted in Rwanda, Inspired by Style.&rdquo;
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <Link href="/shop">
                <LuxuryButton variant="gold" size="lg">
                  Shop Collection
                  <ArrowRight className="w-4 h-4" />
                </LuxuryButton>
              </Link>
              <Link href="/tailoring">
                <LuxuryButton variant="outline-gold" size="lg">
                  Book Tailoring
                </LuxuryButton>
              </Link>
              <button className="flex items-center gap-2.5 text-[0.75rem] font-medium text-[#aaaaaa] hover:text-[#f5f0e8] transition-colors uppercase tracking-[0.15em] group">
                <span className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center group-hover:border-[#c9a84c] transition-colors">
                  <Play className="w-3.5 h-3.5 text-[#c9a84c] ml-0.5" />
                </span>
                Watch Story
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex gap-8 pt-4 border-t border-[#c9a84c]/10"
            >
              {[
                { label: "Happy Clients", value: "2,400+" },
                { label: "Collections", value: "500+" },
                { label: "Tailored Pieces", value: "800+" },
                { label: "Years of Craft", value: "8+" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-display text-2xl font-bold text-[#c9a84c]">
                    {stat.value}
                  </span>
                  <span className="text-[0.65rem] text-[#555] uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ y }}
            className="relative h-[600px] lg:h-screen max-h-[800px]"
          >
            {/* Glow behind 3D canvas */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-[#c9a84c]/10 blur-[80px]" />
            </div>

            <HeroScene />

            {/* Floating label overlay */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="absolute top-1/4 -left-4 glass-gold rounded-sm px-4 py-3"
            >
              <p className="text-[0.6rem] text-[#c9a84c] uppercase tracking-[0.2em]">New Arrival</p>
              <p className="text-[0.85rem] font-display text-[#f5f0e8] font-medium">
                Kitenge Collection
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="absolute bottom-1/4 -right-4 glass-gold rounded-sm px-4 py-3"
            >
              <p className="text-[0.6rem] text-[#c9a84c] uppercase tracking-[0.2em]">Premium</p>
              <p className="text-[0.85rem] font-display text-[#f5f0e8] font-medium">
                Custom Tailoring
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.6rem] text-[#555] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#c9a84c] to-transparent"
        />
      </motion.div>
    </section>
  );
}
