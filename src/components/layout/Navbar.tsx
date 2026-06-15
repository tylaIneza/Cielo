"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  Globe,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG, LANGUAGES } from "@/constants";

const NAV_LINKS = [
  {
    label: "Women",
    href: "/women",
    mega: true,
    categories: [
      { name: "Dresses", href: "/women/dresses" },
      { name: "Maxi Dresses", href: "/women/maxi-dresses" },
      { name: "Skirts", href: "/women/skirts" },
      { name: "Blouses", href: "/women/blouses" },
      { name: "Two-Piece Sets", href: "/women/two-piece-sets" },
      { name: "Jumpsuits", href: "/women/jumpsuits" },
      { name: "Kaftans", href: "/women/kaftans" },
      { name: "Jackets", href: "/women/jackets" },
    ],
  },
  {
    label: "Men",
    href: "/men",
    mega: true,
    categories: [
      { name: "Suits", href: "/men/suits" },
      { name: "Shirts", href: "/men/shirts" },
      { name: "Trousers", href: "/men/trousers" },
      { name: "Traditional Wear", href: "/men/traditional" },
      { name: "Casual Wear", href: "/men/casual" },
      { name: "Jackets", href: "/men/jackets" },
    ],
  },
  {
    label: "Kids",
    href: "/kids",
    mega: false,
    categories: [
      { name: "Boys", href: "/kids/boys" },
      { name: "Girls", href: "/kids/girls" },
      { name: "Custom Kids Wear", href: "/kids/custom" },
    ],
  },
  {
    label: "African",
    href: "/african",
    mega: false,
    categories: [
      { name: "Kitenge Fashion", href: "/african/kitenge" },
      { name: "Ankara Fashion", href: "/african/ankara" },
      { name: "Dashiki Fashion", href: "/african/dashiki" },
      { name: "Contemporary", href: "/african/contemporary" },
      { name: "Luxury Collections", href: "/african/luxury" },
    ],
  },
  { label: "Fabrics", href: "/fabrics", mega: false, categories: [] },
  { label: "Lookbook", href: "/lookbook", mega: false, categories: [] },
  { label: "Tailoring", href: "/tailoring", mega: false, categories: [] },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  const handleMenuEnter = (label: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  };

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        className="bg-[#1a6b3c] text-white text-center py-2 text-[0.7rem] tracking-[0.2em] uppercase font-medium"
      >
        Free delivery on orders above RWF 50,000 &nbsp;|&nbsp;
        <Link href="/tailoring" className="underline underline-offset-2 hover:text-[#c9a84c] transition-colors">
          Book Custom Tailoring
        </Link>
      </motion.div>

      {/* Main Navbar */}
      <motion.header
        initial={{ y: 0 }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#c9a84c]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-[#0a0a0a] to-transparent"
        )}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-display text-2xl font-bold tracking-wider text-[#f5f0e8] group-hover:text-[#c9a84c] transition-colors duration-300">
                  CIELO
                </span>
                <span className="block text-[0.55rem] tracking-[0.35em] uppercase text-[#c9a84c] -mt-1">
                  Fashion Boutique
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.categories.length > 0 && handleMenuEnter(link.label)
                  }
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 text-[0.72rem] font-medium uppercase tracking-[0.15em] transition-colors duration-200",
                      activeMenu === link.label
                        ? "text-[#c9a84c]"
                        : "text-[#aaaaaa] hover:text-[#f5f0e8]"
                    )}
                  >
                    {link.label}
                    {link.categories.length > 0 && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          activeMenu === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown Mega Menu */}
                  <AnimatePresence>
                    {activeMenu === link.label && link.categories.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 glass-dark rounded-sm border border-[#c9a84c]/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6 min-w-[220px]"
                        onMouseEnter={() => handleMenuEnter(link.label)}
                        onMouseLeave={handleMenuLeave}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[#1a1a1a] border-l border-t border-[#c9a84c]/15" />
                        <div className="flex flex-col gap-1">
                          {link.categories.map((cat) => (
                            <Link
                              key={cat.name}
                              href={cat.href}
                              className="text-[0.8rem] text-[#aaaaaa] hover:text-[#c9a84c] hover:translate-x-1 transition-all duration-200 py-1.5"
                              onClick={() => setActiveMenu(null)}
                            >
                              {cat.name}
                            </Link>
                          ))}
                          <div className="mt-3 pt-3 border-t border-[#c9a84c]/10">
                            <Link
                              href={link.href}
                              className="text-[0.7rem] text-[#c9a84c] font-medium uppercase tracking-[0.15em] hover:text-[#f0d98b] transition-colors"
                            >
                              View All →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[#aaaaaa] hover:text-[#c9a84c] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Language */}
              <div className="relative hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setLangOpen(!langOpen)}
                  className="p-2 text-[#aaaaaa] hover:text-[#c9a84c] transition-colors flex items-center gap-1"
                  aria-label="Language"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-[0.65rem] uppercase tracking-wider">
                    {currentLang}
                  </span>
                </motion.button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-full mt-2 glass-dark rounded-sm border border-[#c9a84c]/15 p-2 min-w-[140px] shadow-luxury"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setLangOpen(false);
                          }}
                          className={cn(
                            "flex items-center gap-2 w-full px-3 py-2 text-[0.75rem] rounded-sm transition-colors",
                            currentLang === lang.code
                              ? "text-[#c9a84c] bg-[#c9a84c]/10"
                              : "text-[#aaaaaa] hover:text-[#f5f0e8] hover:bg-white/5"
                          )}
                        >
                          <span>{lang.flag}</span>
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <Link href="/account/wishlist">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-[#aaaaaa] hover:text-[#c9a84c] transition-colors hidden md:block"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                </motion.div>
              </Link>

              {/* Account */}
              <Link href="/account">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-[#aaaaaa] hover:text-[#c9a84c] transition-colors hidden md:block"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </motion.div>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8f6f2a] via-[#c9a84c] to-[#f0d98b] text-black text-[0.7rem] font-semibold uppercase tracking-[0.15em]"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Cart</span>
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#1a6b3c] text-white text-[0.6rem] rounded-full flex items-center justify-center font-bold">
                    0
                  </span>
                </motion.div>
              </Link>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-[#f5f0e8]"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Gold Divider Line */}
        <div className="divider-gold opacity-30" />
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a]/90 backdrop-blur-xl flex items-start justify-center pt-28 px-6"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-2xl"
            >
              <div className="flex items-center gap-4 border-b border-[#c9a84c]/40 pb-4">
                <Search className="w-6 h-6 text-[#c9a84c]" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search collections, fabrics, tailoring..."
                  className="flex-1 bg-transparent text-[#f5f0e8] text-xl placeholder-[#555555] outline-none font-display"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-[#aaaaaa] hover:text-[#f5f0e8] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-[0.75rem] text-[#555555] mt-4 tracking-wider uppercase">
                Popular: Kitenge Dress · Men Suit · Wedding Dress · Ankara Set
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[320px] bg-[#0a0a0a] border-l border-[#c9a84c]/15 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#c9a84c]/10">
                <span className="font-display text-xl text-[#f5f0e8]">CIELO</span>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-6 h-6 text-[#aaaaaa]" />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8] hover:text-[#c9a84c] transition-colors border-b border-[#c9a84c]/10"
                    >
                      {link.label}
                    </Link>
                    {link.categories.length > 0 && (
                      <div className="ml-4 mt-1 mb-2 flex flex-col gap-0.5">
                        {link.categories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            onClick={() => setMobileOpen(false)}
                            className="py-2 text-[0.75rem] text-[#aaaaaa] hover:text-[#c9a84c] transition-colors"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-[#c9a84c]/10 flex flex-col gap-3">
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-[0.8rem] text-[#aaaaaa] hover:text-[#c9a84c] transition-colors"
                >
                  <User className="w-4 h-4" /> My Account
                </Link>
                <Link
                  href="/account/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-[0.8rem] text-[#aaaaaa] hover:text-[#c9a84c] transition-colors"
                >
                  <Heart className="w-4 h-4" /> Wishlist
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-[0.8rem] text-[#aaaaaa] hover:text-[#c9a84c] transition-colors"
                >
                  <Phone className="w-4 h-4" /> {SITE_CONFIG.phone}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
