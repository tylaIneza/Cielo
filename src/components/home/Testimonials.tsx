"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Amara Nkusi",
    role: "Fashion Blogger, Kigali",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    rating: 5,
    text: "Cielo Fashion is unlike anything I've experienced in Rwanda. The quality rivals international brands, but the Rwandan soul in each piece makes it extraordinary. My custom Kitenge gown was absolutely breathtaking.",
  },
  {
    id: 2,
    name: "Jean-Pierre Habimana",
    role: "CEO, Kigali Business Hub",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    text: "I ordered a tailored suit for my daughter's wedding and the result exceeded every expectation. The attention to detail, the fabric quality, and the customer service were all world-class. Cielo has earned a customer for life.",
  },
  {
    id: 3,
    name: "Grace Uwimana",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    rating: 5,
    text: "The 3D shopping experience on the website is incredible — I could really visualize the fabrics and styles before ordering. The custom tailoring process was seamless and the final result was perfection. Highly recommended!",
  },
  {
    id: 4,
    name: "Emmanuel Kagame",
    role: "Hotel Manager",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    rating: 5,
    text: "I've dressed my entire family in Cielo for the past two years. From school uniforms to wedding attire, every piece is crafted with incredible care. The African Collection is particularly stunning — I'm always getting compliments.",
  },
  {
    id: 5,
    name: "Sophie Laurent",
    role: "French Ambassador's Wife",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "As someone who shops in Paris and Milan, discovering Cielo Fashion was a revelation. The craftsmanship is truly on par with European luxury houses, with the added magic of authentic African artistry. Magnifique!",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a84c]/4 blur-[120px]" />
      </div>

      <div className="container-luxury relative z-10">
        <SectionHeader
          eyebrow="Client Stories"
          title="What Our Clients Say"
          subtitle="Trusted by thousands across Rwanda and beyond."
          className="mb-16"
        />

        {/* Main testimonial card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-dark rounded-sm border border-[#c9a84c]/15 p-10 md:p-14 relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-8 right-8 w-12 h-12 text-[#c9a84c]/10" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-[#c9a84c] fill-[#c9a84c]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="font-display text-xl md:text-2xl text-[#f5f0e8] leading-relaxed italic mb-10">
                &ldquo;{active.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#c9a84c]/30">
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#f5f0e8] text-[0.95rem]">
                    {active.name}
                  </h4>
                  <p className="text-[0.75rem] text-[#c9a84c]">{active.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? "w-8 h-2 bg-[#c9a84c]"
                      : "w-2 h-2 bg-[#555] hover:bg-[#aaaaaa]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goPrev}
                className="w-12 h-12 rounded-sm border border-[#c9a84c]/25 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goNext}
                className="w-12 h-12 rounded-sm bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] flex items-center justify-center text-black hover:from-[#c9a84c] hover:to-[#f0d98b] transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Floating mini cards */}
        <div className="hidden lg:flex justify-center gap-4 mt-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => {
                setDirection(i > activeIndex ? 1 : -1);
                setActiveIndex(i);
              }}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm border transition-all duration-300 ${
                i === activeIndex
                  ? "border-[#c9a84c]/40 glass-gold"
                  : "border-[#c9a84c]/10 glass hover:border-[#c9a84c]/25"
              }`}
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden">
                <Image src={t.avatar} alt={t.name} fill className="object-cover" />
              </div>
              <div className="text-left">
                <p className="text-[0.75rem] font-medium text-[#f5f0e8] leading-none">
                  {t.name}
                </p>
                <p className="text-[0.65rem] text-[#aaaaaa] mt-0.5">{t.role.split(",")[0]}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
