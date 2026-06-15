"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Scissors, Heart, Award, Globe } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";

const CRAFTSMANSHIP_STEPS = [
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
      "Each piece is crafted by expert tailors with decades of experience in both traditional and contemporary fashion.",
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
      "Rwandan craftsmanship meets international luxury standards — built with pride, shipped worldwide.",
  },
];

export function MadeInRwanda() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="py-24 bg-[#050505] overflow-hidden">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Images */}
          <motion.div
            style={{ opacity }}
            className="relative h-[600px]"
          >
            {/* Main image */}
            <motion.div
              style={{ y }}
              className="absolute top-0 left-0 right-16 bottom-16"
            >
              <div className="relative h-full rounded-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
                  alt="Cielo Fashion tailoring"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
              </div>
            </motion.div>

            {/* Secondary image */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute bottom-0 right-0 w-48 h-64"
            >
              <div className="relative h-full rounded-sm overflow-hidden border-4 border-[#050505]">
                <Image
                  src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&q=80"
                  alt="Cielo Fashion detail"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Gold frame accent */}
            <div className="absolute top-4 left-4 w-24 h-24 border-l-2 border-t-2 border-[#c9a84c]/40" />
            <div className="absolute bottom-4 right-4 w-24 h-24 border-r-2 border-b-2 border-[#c9a84c]/40" />

            {/* Rwanda badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute top-6 right-6 w-20 h-20 rounded-full glass-gold border border-[#c9a84c]/30 flex flex-col items-center justify-center"
            >
              <span className="text-2xl">🇷🇼</span>
              <span className="text-[0.5rem] text-[#c9a84c] uppercase tracking-[0.15em] mt-1">
                Rwanda
              </span>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[#c9a84c]">
                Our Craft
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#f5f0e8] mt-4 mb-6 leading-[1.1]">
                Made in Rwanda,{" "}
                <span className="text-gold-gradient">Loved Worldwide.</span>
              </h2>
              <p className="text-[#aaaaaa] leading-relaxed">
                At Cielo Fashion Boutique, every stitch tells a story. We combine Rwanda&apos;s
                rich textile heritage with contemporary luxury design to create garments
                that are not just clothes — they are works of art.
              </p>
              <p className="text-[#aaaaaa] leading-relaxed mt-4">
                From our Kigali atelier, our master tailors transform premium fabrics into
                heirloom-quality pieces, each carrying the warmth of African craftsmanship
                and the precision of international fashion standards.
              </p>
            </motion.div>

            {/* Craftsmanship steps */}
            <div className="grid grid-cols-2 gap-4">
              {CRAFTSMANSHIP_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex flex-col gap-3 p-4 glass rounded-sm border border-[#c9a84c]/10 hover:border-[#c9a84c]/25 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-sm bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center group-hover:bg-[#c9a84c]/20 transition-colors">
                      <Icon className="w-4 h-4 text-[#c9a84c]" />
                    </div>
                    <h4 className="font-medium text-[0.85rem] text-[#f5f0e8]">{step.title}</h4>
                    <p className="text-[0.75rem] text-[#aaaaaa] leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-4"
            >
              <Link href="/tailoring">
                <LuxuryButton variant="gold" size="lg">
                  Book Custom Tailoring
                  <ArrowRight className="w-4 h-4" />
                </LuxuryButton>
              </Link>
              <Link href="/about">
                <LuxuryButton variant="ghost" size="lg">
                  Our Story
                </LuxuryButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
