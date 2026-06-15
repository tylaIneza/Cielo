"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/constants";

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconTwitterX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const footerLinks = {
  Collections: [
    { name: "Women", href: "/women" },
    { name: "Men", href: "/men" },
    { name: "Kids", href: "/kids" },
    { name: "African", href: "/african" },
    { name: "Fabrics", href: "/fabrics" },
    { name: "Lookbook", href: "/lookbook" },
  ],
  Services: [
    { name: "Custom Tailoring", href: "/tailoring" },
    { name: "Virtual Fitting", href: "/tailoring#fitting" },
    { name: "3D Showroom", href: "/showroom" },
    { name: "Fabric Collection", href: "/fabrics" },
    { name: "Gift Cards", href: "/gift-cards" },
  ],
  Company: [
    { name: "About Cielo", href: "/about" },
    { name: "Our Story", href: "/about#story" },
    { name: "Craftsmanship", href: "/about#craftsmanship" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
  Support: [
    { name: "FAQ", href: "/faq" },
    { name: "Shipping Policy", href: "/shipping" },
    { name: "Return Policy", href: "/returns" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Contact Us", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#c9a84c]/10">
      {/* Newsletter Section */}
      <div className="border-b border-[#c9a84c]/10">
        <div className="container-luxury py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-10"
          >
            <div className="max-w-xl">
              <p className="text-[0.7rem] tracking-[0.3em] uppercase text-[#c9a84c] mb-3">
                Stay in Style
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-[#f5f0e8] leading-tight">
                The Cielo Edit — Delivered to Your Inbox
              </h3>
              <p className="text-[#aaaaaa] text-sm mt-3">
                New collections, exclusive offers, and behind-the-scenes from our Kigali atelier.
              </p>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[420px]">
              <form className="flex gap-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-[#c9a84c]/20 border-r-0 px-5 py-4 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-4 bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] text-black text-[0.7rem] font-bold uppercase tracking-[0.15em] flex items-center gap-2 hover:from-[#c9a84c] hover:to-[#f0d98b] transition-all"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[0.65rem] text-[#555] mt-2">
                No spam. Unsubscribe anytime. Privacy protected.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-3xl font-bold text-[#f5f0e8]">CIELO</span>
              <span className="block text-[0.55rem] tracking-[0.35em] uppercase text-[#c9a84c] -mt-1">
                Fashion Boutique
              </span>
            </Link>
            <p className="text-[#aaaaaa] text-sm leading-relaxed max-w-xs mb-6">
              Rwanda&apos;s premier luxury fashion boutique. Celebrating African elegance
              with world-class craftsmanship, rooted in Kigali.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2.5 text-[0.8rem] text-[#aaaaaa] hover:text-[#c9a84c] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                {SITE_CONFIG.email}
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2.5 text-[0.8rem] text-[#aaaaaa] hover:text-[#c9a84c] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                {SITE_CONFIG.phone}
              </a>
              <div className="flex items-start gap-2.5 text-[0.8rem] text-[#aaaaaa]">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                {SITE_CONFIG.address}
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#c9a84c] mb-5">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[0.8rem] text-[#aaaaaa] hover:text-[#f5f0e8] transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#c9a84c]/10">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.7rem] text-[#555] tracking-wider">
            © {new Date().getFullYear()} Cielo Fashion Boutique. All rights reserved.
            <span className="text-[#c9a84c] ml-1">Crafted in Rwanda 🇷🇼</span>
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { Icon: IconInstagram, href: SITE_CONFIG.social.instagram, label: "Instagram" },
              { Icon: IconFacebook, href: SITE_CONFIG.social.facebook, label: "Facebook" },
              { Icon: IconTwitterX, href: SITE_CONFIG.social.twitter, label: "Twitter / X" },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full border border-[#c9a84c]/20 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-colors"
                aria-label={label}
              >
                <Icon className="w-3.5 h-3.5" />
              </motion.a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-[0.65rem] text-[#555] hover:text-[#aaaaaa] transition-colors tracking-wider"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
