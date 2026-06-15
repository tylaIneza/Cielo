"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, MapPin, CreditCard, Truck, Shield } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { PAYMENT_METHODS } from "@/constants";
import { formatPrice } from "@/lib/utils";

const STEPS = ["Shipping", "Payment", "Confirm"];

const ORDER_ITEMS = [
  { name: "Emerald Kitenge Evening Dress", size: "M", qty: 1, price: 85000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b8e0b?w=200&q=80" },
  { name: "Gold Ankara Two-Piece Set", size: "S", qty: 2, price: 65000, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&q=80" },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [momoPhone, setMomoPhone] = useState("");
  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", district: "", notes: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [placed, setPlaced] = useState(false);

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost = deliveryMethod === "express" ? 8000 : 0;
  const total = subtotal + shippingCost;

  if (placed) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md px-6"
          >
            <div className="w-24 h-24 rounded-full bg-[#1a6b3c]/20 border border-[#1a6b3c]/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-[#22a85a]" />
            </div>
            <h2 className="font-display text-3xl font-semibold text-[#f5f0e8] mb-4">Order Placed!</h2>
            <p className="text-[#aaaaaa] mb-6">Thank you for your order. You&apos;ll receive a confirmation SMS and email shortly.</p>
            <div className="glass-gold p-5 rounded-sm mb-8">
              <p className="text-[0.7rem] text-[#c9a84c] uppercase tracking-wider mb-1">Order Number</p>
              <p className="font-display text-2xl text-[#f5f0e8] font-bold">
                CF-{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/account/orders">
                <LuxuryButton variant="gold" size="lg" className="w-full">Track My Order</LuxuryButton>
              </Link>
              <Link href="/shop">
                <LuxuryButton variant="outline-gold" size="lg" className="w-full">Continue Shopping</LuxuryButton>
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] py-12">
        <div className="container-luxury">
          <h1 className="font-display text-4xl font-semibold text-[#f5f0e8] mb-10">Checkout</h1>

          {/* Step indicator */}
          <div className="flex items-center gap-0 mb-12">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2.5 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.15em] ${
                  i === step ? "text-[#c9a84c]" : i < step ? "text-[#22a85a]" : "text-[#555]"
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[0.65rem] font-bold ${
                    i < step ? "bg-[#1a6b3c] text-white" : i === step ? "bg-[#c9a84c] text-black" : "bg-[#1a1a1a] border border-[#555]"
                  }`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  {s}
                </div>
                {i < STEPS.length - 1 && <div className="h-px w-8 bg-[#c9a84c]/20 mx-1" />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left — Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div>
                      <h2 className="font-display text-xl font-semibold text-[#f5f0e8] mb-5 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#c9a84c]" /> Shipping Details
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        {(["firstName", "lastName"] as const).map((field) => (
                          <div key={field}>
                            <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">
                              {field === "firstName" ? "First Name" : "Last Name"}
                            </label>
                            <input
                              value={shipping[field]}
                              onChange={(e) => setShipping({ ...shipping, [field]: e.target.value })}
                              className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 px-4 py-3 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40"
                              placeholder={field === "firstName" ? "Amara" : "Nkusi"}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">Email</label>
                          <input value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} type="email" placeholder="your@email.com" className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 px-4 py-3 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40" />
                        </div>
                        <div>
                          <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">Phone</label>
                          <input value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} type="tel" placeholder="+250 7XX XXX XXX" className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 px-4 py-3 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">Address</label>
                        <input value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} placeholder="Street address, area" className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 px-4 py-3 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">City</label>
                          <input value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} placeholder="Kigali" className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 px-4 py-3 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40" />
                        </div>
                        <div>
                          <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">District</label>
                          <input value={shipping.district} onChange={(e) => setShipping({ ...shipping, district: e.target.value })} placeholder="Gasabo" className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 px-4 py-3 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40" />
                        </div>
                      </div>
                    </div>

                    {/* Delivery method */}
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[#f5f0e8] mb-4 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-[#c9a84c]" /> Delivery Method
                      </h3>
                      <div className="space-y-3">
                        {[
                          { id: "standard", label: "Standard Delivery", desc: "3-5 business days", price: 0 },
                          { id: "express", label: "Express Delivery", desc: "1-2 business days", price: 8000 },
                        ].map((d) => (
                          <button
                            key={d.id}
                            onClick={() => setDeliveryMethod(d.id)}
                            className={`w-full flex items-center justify-between p-4 border text-left transition-all ${
                              deliveryMethod === d.id ? "border-[#c9a84c] bg-[#c9a84c]/8" : "border-[#c9a84c]/15 hover:border-[#c9a84c]/35"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryMethod === d.id ? "border-[#c9a84c]" : "border-[#555]"}`}>
                                {deliveryMethod === d.id && <div className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]" />}
                              </div>
                              <div>
                                <p className="text-[0.9rem] font-medium text-[#f5f0e8]">{d.label}</p>
                                <p className="text-[0.75rem] text-[#aaaaaa]">{d.desc}</p>
                              </div>
                            </div>
                            <span className={`font-semibold ${d.price === 0 ? "text-[#22a85a]" : "text-[#f5f0e8]"}`}>
                              {d.price === 0 ? "FREE" : formatPrice(d.price)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <LuxuryButton variant="gold" size="lg" onClick={() => setStep(1)} className="w-full">
                      Continue to Payment →
                    </LuxuryButton>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="font-display text-xl font-semibold text-[#f5f0e8] mb-5 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#c9a84c]" /> Payment Method
                    </h2>
                    <div className="space-y-3 mb-8">
                      {PAYMENT_METHODS.map((pm) => (
                        <button
                          key={pm.id}
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`w-full flex items-center gap-4 p-4 border text-left transition-all ${
                            paymentMethod === pm.id ? "border-[#c9a84c] bg-[#c9a84c]/8" : "border-[#c9a84c]/15 hover:border-[#c9a84c]/35"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === pm.id ? "border-[#c9a84c]" : "border-[#555]"}`}>
                            {paymentMethod === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]" />}
                          </div>
                          <div>
                            <p className="text-[0.9rem] font-medium text-[#f5f0e8]">{pm.name}</p>
                            <p className="text-[0.75rem] text-[#aaaaaa]">{pm.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* MTN MoMo / Airtel number */}
                    {(paymentMethod === "MTN_MOMO" || paymentMethod === "AIRTEL_MONEY") && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                        <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">
                          {paymentMethod === "MTN_MOMO" ? "MTN" : "Airtel"} Phone Number
                        </label>
                        <input
                          value={momoPhone}
                          onChange={(e) => setMomoPhone(e.target.value)}
                          type="tel"
                          placeholder="+250 7XX XXX XXX"
                          className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 px-4 py-3 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40"
                        />
                        <p className="text-[0.7rem] text-[#555] mt-2">
                          You&apos;ll receive a payment prompt on this number.
                        </p>
                      </motion.div>
                    )}

                    <div className="flex gap-4">
                      <button onClick={() => setStep(0)} className="px-6 py-3 border border-[#c9a84c]/20 text-[0.8rem] text-[#aaaaaa] hover:border-[#c9a84c]/50 hover:text-[#f5f0e8] transition-all">
                        ← Back
                      </button>
                      <LuxuryButton variant="gold" size="lg" onClick={() => setStep(2)} disabled={!paymentMethod} className="flex-1">
                        Review Order →
                      </LuxuryButton>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="font-display text-xl font-semibold text-[#f5f0e8] mb-5 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#c9a84c]" /> Confirm Your Order
                    </h2>

                    {/* Summary blocks */}
                    {[
                      { title: "Shipping To", content: `${shipping.firstName} ${shipping.lastName}\n${shipping.address}, ${shipping.city}` },
                      { title: "Delivery", content: deliveryMethod === "express" ? "Express (1-2 days)" : "Standard (3-5 days)" },
                      { title: "Payment", content: PAYMENT_METHODS.find(p => p.id === paymentMethod)?.name || "" },
                    ].map(({ title, content }) => (
                      <div key={title} className="flex gap-4 py-4 border-b border-[#c9a84c]/10 mb-1">
                        <p className="text-[0.75rem] text-[#aaaaaa] uppercase tracking-wider w-28 shrink-0">{title}</p>
                        <p className="text-[0.9rem] text-[#f5f0e8] whitespace-pre-line">{content}</p>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button onClick={() => setStep(1)} className="px-6 py-3 border border-[#c9a84c]/20 text-[0.8rem] text-[#aaaaaa] hover:border-[#c9a84c]/50 hover:text-[#f5f0e8] transition-all">
                        ← Back
                      </button>
                      <LuxuryButton variant="emerald" size="lg" onClick={() => setPlaced(true)} className="flex-1">
                        <Shield className="w-4 h-4" />
                        Place Order — {formatPrice(total)}
                      </LuxuryButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right — Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-dark border border-[#c9a84c]/15 p-5 sticky top-24">
                <h3 className="font-display text-lg font-semibold text-[#f5f0e8] mb-5">Your Order</h3>
                <div className="space-y-4 mb-6">
                  {ORDER_ITEMS.map((item) => (
                    <div key={item.name} className="flex gap-3">
                      <div className="relative w-16 h-20 shrink-0 overflow-hidden bg-[#1a1a1a]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <span className="absolute top-1 right-1 w-5 h-5 bg-[#c9a84c] text-black text-[0.6rem] font-bold rounded-full flex items-center justify-center">
                          {item.qty}
                        </span>
                      </div>
                      <div>
                        <p className="text-[0.82rem] font-medium text-[#f5f0e8] leading-tight">{item.name}</p>
                        <p className="text-[0.7rem] text-[#aaaaaa] mt-0.5">Size: {item.size}</p>
                        <p className="text-[0.85rem] font-semibold text-[#c9a84c] mt-1">{formatPrice(item.price * item.qty)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="divider-gold opacity-20 mb-4" />
                <div className="space-y-2 text-[0.82rem]">
                  <div className="flex justify-between text-[#aaaaaa]"><span>Subtotal</span><span className="text-[#f5f0e8]">{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between text-[#aaaaaa]"><span>Shipping</span><span className={shippingCost === 0 ? "text-[#22a85a]" : "text-[#f5f0e8]"}>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span></div>
                </div>
                <div className="divider-gold opacity-20 my-4" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#f5f0e8] uppercase tracking-wider text-[0.85rem]">Total</span>
                  <span className="font-display text-xl font-bold text-[#c9a84c]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
