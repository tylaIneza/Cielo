"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package, ChevronRight, CheckCircle, Clock, Truck, ShoppingBag, Scissors
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TAILORING_STATUSES } from "@/constants";
import { formatPrice, formatDate } from "@/lib/utils";

const DEMO_ORDERS = [
  { id: "CF-X8A2K", date: new Date("2025-06-10"), items: [{ name: "Emerald Kitenge Evening Dress", qty: 1, price: 85000 }], status: "DELIVERED", total: 85000 },
  { id: "CF-M3P7J", date: new Date("2025-06-08"), items: [{ name: "Classic Linen Men's Suit", qty: 1, price: 180000 }], status: "SHIPPED", total: 180000 },
  { id: "CF-L9Q1R", date: new Date("2025-06-05"), items: [{ name: "Gold Ankara Two-Piece Set", qty: 2, price: 65000 }, { name: "Silk Chiffon Blouse", qty: 1, price: 48000 }], status: "PROCESSING", total: 178000 },
];

const DEMO_TAILORING = [
  { id: "CF-TAI-K8XP2", requestNumber: "CF-TAI-K8XP2", garment: "Custom Wedding Dress", date: new Date("2025-06-01"), status: "SEWING" as const, quotedPrice: 350000 },
  { id: "CF-TAI-M3N7Q", requestNumber: "CF-TAI-M3N7Q", garment: "Men's Suit", date: new Date("2025-05-20"), status: "DELIVERED" as const, quotedPrice: 220000 },
];

const ORDER_STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  PENDING: { label: "Pending", color: "#555", icon: Clock },
  CONFIRMED: { label: "Confirmed", color: "#3b82f6", icon: CheckCircle },
  PROCESSING: { label: "Processing", color: "#c9a84c", icon: Package },
  SHIPPED: { label: "Shipped", color: "#1a6b3c", icon: Truck },
  DELIVERED: { label: "Delivered", color: "#22a85a", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", color: "#8b1a1a", icon: Clock },
};

function TailoringTimeline({ status }: { status: string }) {
  const currentStep = TAILORING_STATUSES.find(s => s.key === status)?.step || 1;
  return (
    <div className="relative">
      <div className="flex items-start gap-0 overflow-x-auto pb-2">
        {TAILORING_STATUSES.map((s) => (
          <div key={s.key} className="flex flex-col items-center min-w-[70px]">
            <div className="flex items-center w-full">
              <div className={`w-full h-0.5 ${s.step <= currentStep ? "bg-[#c9a84c]" : "bg-[#2a2a2a]"} ${s.step === 1 ? "opacity-0" : ""}`} />
              <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[0.6rem] font-bold ${
                s.step < currentStep ? "bg-[#22a85a] text-white" :
                s.step === currentStep ? "bg-[#c9a84c] text-black" :
                "bg-[#2a2a2a] text-[#555]"
              }`}>
                {s.step < currentStep ? "✓" : s.step}
              </div>
              <div className={`w-full h-0.5 ${s.step < currentStep ? "bg-[#c9a84c]" : "bg-[#2a2a2a]"} ${s.step === TAILORING_STATUSES.length ? "opacity-0" : ""}`} />
            </div>
            <p className={`text-[0.55rem] text-center mt-1.5 px-1 ${s.step === currentStep ? "text-[#c9a84c]" : "text-[#555]"}`}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [tab, setTab] = useState<"orders" | "tailoring">("orders");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] py-12">
        <div className="container-luxury max-w-4xl">
          <h1 className="font-display text-3xl font-semibold text-[#f5f0e8] mb-2">My Orders</h1>
          <p className="text-[#aaaaaa] text-sm mb-8">Track your purchases and tailoring requests</p>

          <div className="flex gap-0 border border-[#c9a84c]/20 mb-8 w-fit">
            {[
              { key: "orders", label: "Orders", icon: ShoppingBag },
              { key: "tailoring", label: "Tailoring Requests", icon: Scissors },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key as typeof tab)}
                className={`flex items-center gap-2 px-6 py-3 text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-all ${
                  tab === key ? "bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] text-black" : "text-[#aaaaaa] hover:text-[#f5f0e8]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {tab === "orders" && (
            <div className="space-y-4">
              {DEMO_ORDERS.map((order, i) => {
                const cfg = ORDER_STATUS_CONFIG[order.status];
                const StatusIcon = cfg.icon;
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-dark border border-[#c9a84c]/10 hover:border-[#c9a84c]/25 transition-colors"
                  >
                    <div className="flex items-center justify-between p-5 border-b border-[#c9a84c]/8">
                      <div>
                        <p className="font-mono text-[#c9a84c] text-[0.85rem] font-medium">{order.id}</p>
                        <p className="text-[0.72rem] text-[#555] mt-0.5">{formatDate(order.date)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 px-3 py-1 text-[0.7rem] uppercase tracking-wider rounded-sm" style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {cfg.label}
                        </span>
                        <span className="font-semibold text-[#f5f0e8]">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="space-y-2 mb-4">
                        {order.items.map((item) => (
                          <div key={item.name} className="flex items-center justify-between text-[0.82rem]">
                            <span className="text-[#aaaaaa]">{item.name} × {item.qty}</span>
                            <span className="text-[#f5f0e8]">{formatPrice(item.price * item.qty)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button className="text-[0.75rem] text-[#c9a84c] hover:text-[#f0d98b] transition-colors">View Details →</button>
                        {order.status === "DELIVERED" && (
                          <button className="text-[0.75rem] text-[#aaaaaa] hover:text-[#f5f0e8] transition-colors">Leave Review</button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {tab === "tailoring" && (
            <div className="space-y-6">
              {DEMO_TAILORING.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-dark border border-[#c9a84c]/10 p-6"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="font-mono text-[#c9a84c] text-[0.85rem]">{req.requestNumber}</p>
                      <h3 className="font-display text-lg font-semibold text-[#f5f0e8] mt-1">{req.garment}</h3>
                      <p className="text-[0.72rem] text-[#555] mt-0.5">{formatDate(req.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.65rem] text-[#aaaaaa] uppercase tracking-wider mb-1">Quoted Price</p>
                      <p className="font-display text-xl font-bold text-[#c9a84c]">{formatPrice(req.quotedPrice)}</p>
                    </div>
                  </div>
                  <TailoringTimeline status={req.status} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
