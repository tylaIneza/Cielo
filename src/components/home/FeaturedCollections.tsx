"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { COLLECTIONS } from "@/constants";

const collectionImages = [
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
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <Link href={collection.href} className="block">
        {/* Image container */}
        <div className="relative overflow-hidden aspect-[3/4]">
          {/* Parallax image */}
          <motion.div style={{ y }} className="absolute inset-0 scale-110">
            <Image
              src={image}
              alt={collection.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
            style={{ backgroundColor: `${collection.color}20` }}
          />

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <motion.div
              initial={{ y: 10, opacity: 0.8 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[0.6rem] text-[#c9a84c] uppercase tracking-[0.25em] mb-1">
                Collection
              </p>
              <h3 className="font-display text-2xl font-semibold text-[#f5f0e8] mb-2">
                {collection.name}
              </h3>
              <p className="text-[0.8rem] text-[#aaaaaa] leading-relaxed max-w-xs">
                {collection.description}
              </p>
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-4 flex items-center gap-2 text-[0.7rem] text-[#c9a84c] font-medium uppercase tracking-[0.15em]"
              >
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            </motion.div>
          </div>

          {/* Gold corner accent */}
          <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-[#c9a84c]/40 group-hover:border-[#c9a84c] transition-colors duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedCollections() {
  return (
    <section className="py-24 bg-[#050505]">
      <div className="container-luxury">
        <SectionHeader
          eyebrow="Shop by Collection"
          title="Dress for Every Occasion"
          subtitle="From casual elegance to bespoke tailoring — explore our curated collections celebrating the finest in African and contemporary fashion."
          className="mb-16"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {COLLECTIONS.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              image={collectionImages[index]}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-14"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 text-[0.75rem] font-medium text-[#aaaaaa] hover:text-[#c9a84c] uppercase tracking-[0.2em] transition-colors group"
          >
            View All Collections
            <span className="h-px w-8 bg-[#555] group-hover:w-14 group-hover:bg-[#c9a84c] transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
