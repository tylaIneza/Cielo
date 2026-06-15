"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Scissors, Heart, Award, Globe } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { RevealSection } from "@/components/transitions/RevealSection";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    icon: Scissors,
    title: "Handpicked Fabrics",
    description:
      "We source the finest Kitenge, Ankara, silk, and satin — chosen for quality, texture, and beauty.",
  },
  {
    icon: Heart,
    title: "Master Tailors",
    description:
      "Each piece is crafted by expert tailors with decades of experience in traditional and contemporary fashion.",
  },
  {
    icon: Award,
    title: "Quality Control",
    description:
      "Every garment passes a rigorous 10-step quality check before reaching your hands.",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description:
      "Rwandan craftsmanship meets international luxury — built with pride, shipped worldwide.",
  },
];

export function MadeInRwanda() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // GSAP: animated divider line + heading
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const line = lineRef.current;
      const heading = section.querySelector(".mir-heading");
      const body = section.querySelectorAll(".mir-body");
      const cards = section.querySelectorAll(".step-card");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });

      if (line) {
        tl.from(line, { scaleX: 0, duration: 0.8, ease: "expo.out", transformOrigin: "left" });
      }
      if (heading) {
        tl.from(heading, { y: 50, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.4");
      }
      if (body.length) {
        tl.from(body, { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" }, "-=0.6");
      }
      if (cards.length) {
        tl.from(
          cards,
          { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: "expo.out" },
          "-=0.5"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-28 bg-[#030303] overflow-hidden">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: Images ─────────────────────────────── */}
          <div ref={imageRef} className="relative h-[580px] order-2 lg:order-1">
            {/* Main image with parallax */}
            <motion.div style={{ y: imgY }} className="absolute top-0 left-0 right-16 bottom-16">
              <div className="relative h-full overflow-hidden rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                <Image
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80"
                  alt="Cielo Fashion tailoring atelier"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/50 to-transparent" />
              </div>
            </motion.div>

            {/* Secondary image */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 right-0 w-[180px] h-[240px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="relative h-full overflow-hidden rounded-sm border-[3px] border-[#030303]">
                <Image
                  src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&q=80"
                  alt="Fabric detail"
                  fill
                  className="object-cover"
                />
                {/* Gold shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/10 to-transparent" />
              </div>
            </motion.div>

            {/* Corner frame accents */}
            <div className="absolute top-3 left-3 w-20 h-20 border-l-[1.5px] border-t-[1.5px] border-[#c9a84c]/35 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-20 h-20 border-r-[1.5px] border-b-[1.5px] border-[#c9a84c]/35 pointer-events-none" />

            {/* Rwanda badge */}
            <motion.div
              initial={{ scale: 0, rotate: -30, opacity: 0 }}
              whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-5 right-5 w-[72px] h-[72px] rounded-full glass-gold border border-[#c9a84c]/30 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.15)]"
            >
              <span className="text-xl">🇷🇼</span>
              <span className="text-[0.48rem] text-[#c9a84c] uppercase tracking-[0.15em] mt-0.5">Rwanda</span>
            </motion.div>
          </div>

          {/* ── Right: Content ───────────────────────────── */}
          <div className="flex flex-col gap-8 order-1 lg:order-2">
            <div>
              <div ref={lineRef} className="h-px w-14 bg-gradient-to-r from-[#c9a84c] to-transparent mb-5" />
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#c9a84c]">
                Our Craft
              </span>
              <h2 className="mir-heading font-display text-[2.6rem] md:text-[3.4rem] font-semibold text-[#f5f0e8] mt-4 mb-6 leading-[1.08]">
                Made in Rwanda,{" "}
                <span className="text-gold-gradient">Loved Worldwide.</span>
              </h2>
              <p className="mir-body text-[#666] leading-relaxed mb-4">
                At Cielo Fashion Boutique, every stitch tells a story. We combine Rwanda&apos;s
                rich textile heritage with contemporary luxury design to create garments
                that are not just clothes — they are works of art.
              </p>
              <p className="mir-body text-[#666] leading-relaxed">
                From our Kigali atelier, master tailors transform premium fabrics into
                heirloom-quality pieces, each carrying the warmth of African craftsmanship
                and the precision of international fashion standards.
              </p>
            </div>

            {/* Craftsmanship steps */}
            <div className="grid grid-cols-2 gap-3">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    className="step-card group flex flex-col gap-3 p-4 rounded-sm border border-[#ffffff06] bg-[#0d0d0d] hover:border-[#c9a84c]/20 transition-all duration-300 hover:bg-[#111]"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-9 h-9 rounded-sm bg-[#c9a84c]/08 border border-[#c9a84c]/15 flex items-center justify-center group-hover:bg-[#c9a84c]/15 transition-colors">
                      <Icon className="w-4 h-4 text-[#c9a84c]" />
                    </div>
                    <h4 className="font-medium text-[0.83rem] text-[#e0e0e0]">{step.title}</h4>
                    <p className="text-[0.73rem] text-[#555] leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <RevealSection className="flex gap-4 flex-wrap" delay={0.2}>
              <Link href="/tailoring">
                <LuxuryButton variant="gold" size="lg">
                  Book Custom Tailoring
                  <ArrowRight className="w-4 h-4" />
                </LuxuryButton>
              </Link>
              <LuxuryButton variant="ghost" size="lg">
                Our Story
              </LuxuryButton>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
}
