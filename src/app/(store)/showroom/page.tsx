"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryButton } from "@/components/ui/luxury-button";

const ShowroomScene = dynamic(
  () => import("@/components/3d/ShowroomScene").then((m) => m.ShowroomScene),
  { ssr: false }
);

export default function ShowroomPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0a]">
        {/* 3D Showroom */}
        <section className="relative h-screen">
          <ShowroomScene />
          {/* Overlay UI */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.4em]">Virtual Experience</span>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#f5f0e8] mt-2">
                3D Fashion Showroom
              </h1>
              <p className="text-[#aaaaaa] text-sm mt-2">Explore our Kigali boutique in immersive 3D</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center pointer-events-auto"
            >
              <Link href="/shop">
                <LuxuryButton variant="gold" size="lg">
                  Shop the Collection <ArrowRight className="w-4 h-4" />
                </LuxuryButton>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Info below 3D */}
        <section className="py-20">
          <div className="container-luxury text-center">
            <p className="text-[0.7rem] text-[#c9a84c] uppercase tracking-[0.3em] mb-4">About the Showroom</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#f5f0e8] mb-6 max-w-2xl mx-auto">
              Step Inside Our Kigali Boutique
            </h2>
            <p className="text-[#aaaaaa] max-w-xl mx-auto leading-relaxed mb-10">
              Experience the elegance of Cielo Fashion Boutique from anywhere in the world.
              Our 3D showroom recreates the luxury atmosphere of our flagship Kigali store —
              complete with mannequins, clothing racks, gold accents, and warm boutique lighting.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { value: "200+", label: "Styles on Display" },
                { value: "4K", label: "3D Resolution" },
                { value: "360°", label: "Viewing Angles" },
                { value: "Real-time", label: "Lighting" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-2xl font-bold text-[#c9a84c]">{s.value}</p>
                  <p className="text-[0.7rem] text-[#555] uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
