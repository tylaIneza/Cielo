"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { RevealSection } from "@/components/transitions/RevealSection";
import { COLLECTIONS } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80",
  "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
];

function CollectionCard({
  collection,
  image,
  index,
}: {
  collection: (typeof COLLECTIONS)[0];
  image: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.05]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 70, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      style={{ perspective: 1000 }}
    >
      <Link href={collection.href} className="block" data-cursor="hover">
        <div className="relative overflow-hidden aspect-[3/4] rounded-sm">
          {/* Parallax image */}
          <motion.div style={{ y, scale: imgScale }} className="absolute inset-0">
            <Image
              src={image}
              alt={collection.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/15 to-transparent" />

          {/* Hover tint */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ backgroundColor: `${collection.color}1a` }}
          />

          {/* Gold top-right accent */}
          <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full border-t-[1.5px] border-r-[1.5px] border-[#c9a84c]/35 group-hover:border-[#c9a84c] transition-colors duration-400" />
          </div>

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <motion.div
              initial={{ y: 6 }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[0.57rem] text-[#c9a84c] uppercase tracking-[0.28em] mb-1.5">Collection</p>
              <h3 className="font-display text-[1.5rem] font-semibold text-[#f5f0e8] mb-1.5 leading-tight">
                {collection.name}
              </h3>
              <p className="text-[0.78rem] text-[#7a7a7a] leading-relaxed max-w-[220px]">
                {collection.description}
              </p>
              <motion.div
                className="mt-4 flex items-center gap-2 text-[0.68rem] text-[#c9a84c] font-medium uppercase tracking-[0.18em] opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300"
              >
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedCollections() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP: header text reveal
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const eyebrow = section.querySelector(".eyebrow-text");
      const title = section.querySelector(".section-title");
      const subtitle = section.querySelector(".section-subtitle");

      if (eyebrow && title && subtitle) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        });
        tl.from([eyebrow], { opacity: 0, y: 20, duration: 0.6, ease: "expo.out" })
          .from(title, { opacity: 0, y: 40, duration: 0.9, ease: "expo.out" }, "-=0.3")
          .from(subtitle, { opacity: 0, y: 24, duration: 0.8, ease: "expo.out" }, "-=0.5");
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-28 bg-[#040404] overflow-hidden">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-18 max-w-2xl mx-auto" style={{ marginBottom: "5rem" }}>
          <p className="eyebrow-text text-[0.62rem] font-medium uppercase tracking-[0.38em] text-[#c9a84c] mb-4">
            Shop by Collection
          </p>
          <h2 className="section-title font-display text-[2.8rem] md:text-[3.8rem] font-semibold text-[#f5f0e8] leading-[1.1] mb-5">
            Dress for Every Occasion
          </h2>
          <p className="section-subtitle text-[#666] text-base leading-relaxed">
            From casual elegance to bespoke tailoring — explore curated collections
            celebrating the finest in African and contemporary fashion.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {COLLECTIONS.map((col, i) => (
            <CollectionCard key={col.id} collection={col} image={IMAGES[i]} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <RevealSection className="text-center mt-14" delay={0.3}>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 text-[0.72rem] font-medium text-[#555] hover:text-[#c9a84c] uppercase tracking-[0.22em] transition-all duration-300 group"
            data-cursor="hover"
          >
            View All Collections
            <motion.span
              className="h-px bg-[#444] group-hover:bg-[#c9a84c] transition-colors duration-300"
              initial={{ width: 32 }}
              whileHover={{ width: 60 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </RevealSection>
      </div>
    </section>
  );
}
