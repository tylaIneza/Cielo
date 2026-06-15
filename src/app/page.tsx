import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { NewArrivals } from "@/components/home/NewArrivals";
import { MadeInRwanda } from "@/components/home/MadeInRwanda";
import { Testimonials } from "@/components/home/Testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cielo Fashion Boutique | Crafted in Rwanda, Inspired by Style",
  description:
    "Rwanda's premier luxury fashion boutique. Shop exclusive women's, men's, kids' and African fashion collections. Custom tailoring available.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedCollections />
        <NewArrivals />
        <MadeInRwanda />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
