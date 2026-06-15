"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useMobileDetect } from "@/hooks/useMobileDetect";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const WORDS = ["Luxury", "Elegance", "Craftsmanship", "Heritage", "Excellence"];

// ─── Animated word rotator ────────────────────────────────────────────────────

function WordRotator() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden" style={{ height: "1.1em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="text-gold-gradient absolute left-0 top-0"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ─── Scroll progress bar ─────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8f6f2a] via-[#c9a84c] to-[#f0d98b] origin-left z-[9998]"
      style={{ scaleX }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetect();

  const { scrollYProgress } = useScroll({ target: sectionRef });

  // Parallax + fade-out of the entire content block as user scrolls away
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.08]);

  // GSAP: stagger-reveal headline words + eyebrow on mount
  useGSAP(
    () => {
      const el = headlineRef.current;
      if (!el) return;

      // Split each line into words for stagger
      const lines = el.querySelectorAll(".hero-line");
      gsap.from(lines, {
        y: 90,
        opacity: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "expo.out",
        delay: 0.5,
      });
    },
    { scope: sectionRef }
  );

  // GSAP: stats counter animation on scroll
  useGSAP(
    () => {
      const el = statsRef.current;
      if (!el) return;

      const values = el.querySelectorAll(".stat-value");
      const targets = [2400, 500, 800, 8];
      const suffixes = ["+", "+", "+", "+"];

      values.forEach((v, i) => {
        const obj = { n: 0 };
        gsap.to(obj, {
          n: targets[i],
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          onUpdate() {
            v.textContent = Math.round(obj.n).toLocaleString() + suffixes[i];
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      <ScrollProgressBar />

      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden bg-[#030303]"
        style={{ isolation: "isolate" }}
      >
        {/* ── Full-screen 3D Canvas ───────────────────────── */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: canvasScale }}
        >
          <HeroScene isMobile={isMobile} />
        </motion.div>

        {/* ── Gradient veil for text legibility ──────────── */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, rgba(3,3,3,0.88) 0%, rgba(3,3,3,0.55) 55%, rgba(3,3,3,0.1) 100%),
              linear-gradient(to top, rgba(3,3,3,0.7) 0%, transparent 50%)
            `,
          }}
        />

        {/* ── Subtle grid overlay ─────────────────────────── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── Text content overlay ────────────────────────── */}
        <motion.div
          ref={contentRef}
          className="relative z-[2] flex flex-col justify-center min-h-screen"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="container-luxury py-28">
            <div className="max-w-2xl">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 mb-7"
              >
                <motion.div
                  className="h-px bg-gradient-to-r from-[#c9a84c] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.42em] text-[#c9a84c]">
                  Kigali, Rwanda — Est. 2016
                </span>
              </motion.div>

              {/* Headline */}
              <h1
                ref={headlineRef}
                className="font-display text-[3.6rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] font-bold leading-[1.0] text-[#f5f0e8] mb-8"
                style={{ letterSpacing: "-0.02em" }}
              >
                <span className="hero-line block">African</span>
                <span className="hero-line block">
                  <WordRotator />
                </span>
                <span className="hero-line block text-[#f5f0e8]">
                  Redefined.
                </span>
              </h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#9a9a9a] text-base md:text-lg leading-relaxed max-w-md mb-3 font-light"
              >
                Rwanda&apos;s most exclusive fashion boutique. Premium collections,
                bespoke tailoring, and contemporary African luxury — crafted in Kigali.
              </motion.p>

              {/* Italic tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="h-px w-7 bg-[#c9a84c]/40" />
                <span className="text-[0.72rem] italic font-display text-[#c9a84c]/80 tracking-wider">
                  &ldquo;Crafted in Rwanda, Inspired by Style.&rdquo;
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-4 items-center mb-14"
              >
                <Link href="/shop">
                  <LuxuryButton variant="gold" size="lg" className="shadow-[0_0_30px_rgba(201,168,76,0.25)]">
                    Shop Collection
                    <ArrowRight className="w-4 h-4" />
                  </LuxuryButton>
                </Link>
                <Link href="/tailoring">
                  <LuxuryButton variant="outline-gold" size="lg">
                    Book Tailoring
                  </LuxuryButton>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2.5 text-[0.72rem] font-medium text-[#666] hover:text-[#f5f0e8] uppercase tracking-[0.18em] transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full border border-[#c9a84c]/25 flex items-center justify-center group-hover:border-[#c9a84c]/60 transition-all group-hover:shadow-[0_0_15px_rgba(201,168,76,0.2)]">
                    <Play className="w-3 h-3 text-[#c9a84c] ml-0.5" />
                  </span>
                  Our Story
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                ref={statsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="flex gap-8 sm:gap-12 pt-6 border-t border-[#ffffff08]"
              >
                {[
                  { label: "Happy Clients", suffix: "+", target: 2400 },
                  { label: "Collections", suffix: "+", target: 500 },
                  { label: "Tailored Pieces", suffix: "+", target: 800 },
                  { label: "Years of Craft", suffix: "+", target: 8 },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-1">
                    <span className="stat-value font-display text-[1.8rem] font-bold text-[#c9a84c] tabular-nums">
                      {s.target.toLocaleString() + s.suffix}
                    </span>
                    <span className="text-[0.6rem] text-[#444] uppercase tracking-[0.2em]">
                      {s.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Floating glass badges (right side) ─────────── */}
        <motion.div
          className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-[3] hidden lg:flex flex-col gap-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { label: "New Arrival", value: "Kitenge SS26", pulse: true },
            { label: "Bestseller", value: "Bridal Collection", pulse: false },
            { label: "Premium", value: "Bespoke Tailoring", pulse: false },
          ].map((badge, i) => (
            <motion.div
              key={badge.label}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3.5 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              className="glass-gold rounded-sm px-5 py-3.5 border border-[#c9a84c]/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-2">
                {badge.pulse && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a84c] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a84c]" />
                  </span>
                )}
                <p className="text-[0.58rem] text-[#c9a84c] uppercase tracking-[0.22em]">{badge.label}</p>
              </div>
              <p className="text-[0.85rem] font-display text-[#f5f0e8] font-medium mt-0.5">
                {badge.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Scroll indicator ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
        >
          <span className="text-[0.58rem] text-[#333] uppercase tracking-[0.35em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-px h-10 bg-gradient-to-b from-[#c9a84c] to-transparent" />
            <ChevronDown className="w-3.5 h-3.5 text-[#c9a84c]/50" />
          </motion.div>
        </motion.div>

        {/* ── Side label ──────────────────────────────────── */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-[3] hidden xl:flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a84c]/25 to-transparent" />
          <span
            className="text-[0.55rem] text-[#333] uppercase tracking-[0.35em]"
            style={{ writingMode: "vertical-rl" }}
          >
            Cielo Fashion Boutique — 2026
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a84c]/25 to-transparent" />
        </div>
      </section>
    </>
  );
}
