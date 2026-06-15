"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, Tag, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { formatPrice } from "@/lib/utils";

const DEMO_CART = [
  {
    id: "1",
    name: "Emerald Kitenge Evening Dress",
    price: 85000,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b8e0b?w=300&q=80",
    size: "M",
    color: "Emerald",
    quantity: 1,
    stock: 5,
  },
  {
    id: "2",
    name: "Gold Ankara Two-Piece Set",
    price: 65000,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80",
    size: "S",
    color: "Gold",
    quantity: 2,
    stock: 3,
  },
];

export default function CartPage() {
  const [items, setItems] = useState(DEMO_CART);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.stock, item.quantity + delta)) }
          : item
      )
    );
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal - discount + shipping;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] py-12">
        <div className="container-luxury">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl font-semibold text-[#f5f0e8] mb-2">Shopping Cart</h1>
            <p className="text-[#aaaaaa] text-sm mb-10">{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
          </motion.div>

          {items.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <ShoppingBag className="w-16 h-16 text-[#c9a84c]/30 mx-auto mb-6" />
              <h2 className="font-display text-2xl text-[#f5f0e8] mb-4">Your cart is empty</h2>
              <p className="text-[#aaaaaa] mb-8">Discover our luxury collections and add some elegance to your wardrobe.</p>
              <Link href="/shop">
                <LuxuryButton variant="gold" size="lg">Continue Shopping</LuxuryButton>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-5 p-5 glass-dark border border-[#c9a84c]/10 hover:border-[#c9a84c]/25 transition-colors"
                    >
                      {/* Image */}
                      <div className="relative w-24 h-32 shrink-0 overflow-hidden bg-[#1a1a1a]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display text-[1rem] font-medium text-[#f5f0e8] mb-1 leading-tight">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-3 text-[0.72rem] text-[#aaaaaa]">
                              <span>Size: <strong className="text-[#f5f0e8]">{item.size}</strong></span>
                              <span>Color: <strong className="text-[#f5f0e8]">{item.color}</strong></span>
                            </div>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-[#555] hover:text-[#f5f0e8] transition-colors shrink-0">
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-[#c9a84c]/20">
                            <button onClick={() => updateQty(item.id, -1)} className="w-9 h-9 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] transition-colors">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-9 h-9 flex items-center justify-center text-[#f5f0e8] text-[0.85rem] font-medium border-x border-[#c9a84c]/20">
                              {item.quantity}
                            </span>
                            <button onClick={() => updateQty(item.id, 1)} className="w-9 h-9 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] transition-colors">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-semibold text-[#f5f0e8]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Continue shopping */}
                <Link href="/shop" className="inline-flex items-center gap-2 text-[0.75rem] text-[#c9a84c] hover:text-[#f0d98b] transition-colors mt-4">
                  ← Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-dark border border-[#c9a84c]/15 p-6 sticky top-24">
                  <h2 className="font-display text-xl font-semibold text-[#f5f0e8] mb-6">Order Summary</h2>

                  <div className="space-y-3 text-[0.85rem]">
                    <div className="flex justify-between text-[#aaaaaa]">
                      <span>Subtotal</span>
                      <span className="text-[#f5f0e8]">{formatPrice(subtotal)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-[#22a85a]">
                        <span>Discount (10%)</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#aaaaaa]">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" /> Shipping
                      </span>
                      <span className={shipping === 0 ? "text-[#22a85a]" : "text-[#f5f0e8]"}>
                        {shipping === 0 ? "FREE" : formatPrice(shipping)}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[0.7rem] text-[#555]">
                        Free delivery on orders above RWF 50,000
                      </p>
                    )}
                  </div>

                  <div className="divider-gold opacity-20 my-5" />

                  {/* Coupon */}
                  <div className="flex gap-2 mb-5">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Coupon code"
                        className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 pl-9 pr-3 py-2.5 text-[0.8rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40"
                      />
                    </div>
                    <button
                      onClick={() => coupon && setCouponApplied(true)}
                      className="px-4 py-2.5 bg-[#c9a84c]/15 border border-[#c9a84c]/30 text-[0.8rem] text-[#c9a84c] hover:bg-[#c9a84c]/25 transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[0.9rem] font-semibold text-[#f5f0e8] uppercase tracking-wider">Total</span>
                    <span className="font-display text-2xl font-bold text-[#c9a84c]">{formatPrice(total)}</span>
                  </div>

                  <Link href="/checkout">
                    <LuxuryButton variant="gold" size="lg" className="w-full">
                      Proceed to Checkout <ArrowRight className="w-4 h-4" />
                    </LuxuryButton>
                  </Link>

                  {/* Payment icons */}
                  <div className="mt-5 pt-5 border-t border-[#c9a84c]/10">
                    <p className="text-[0.65rem] text-[#555] text-center mb-3 uppercase tracking-wider">Secure Payment</p>
                    <div className="flex justify-center gap-3 flex-wrap">
                      {["MTN MoMo", "Airtel Money", "Visa", "Mastercard"].map((method) => (
                        <span key={method} className="px-2 py-1 bg-[#1a1a1a] border border-[#c9a84c]/10 text-[0.6rem] text-[#555] rounded-sm">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
