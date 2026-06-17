"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Bell, Clock, Eye, ChevronDown, Filter,
  ShoppingBag, TruckIcon, CheckCircle, XCircle,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

type Order = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  items: number;
  status: OrderStatus;
  date: string;
  location: string;
};

const ORDERS: Order[] = [
  { id: "CF-X8A2K", customer: "Amara Nkusi", email: "amara@email.com", amount: 85000, items: 2, status: "DELIVERED", date: "Jun 15, 2026", location: "Kigali, Rwanda" },
  { id: "CF-M3P7J", customer: "Jean-Pierre H.", email: "jp@email.com", amount: 180000, items: 1, status: "SHIPPED", date: "Jun 15, 2026", location: "Nairobi, Kenya" },
  { id: "CF-L9Q1R", customer: "Grace Uwimana", email: "grace@email.com", amount: 65000, items: 3, status: "PROCESSING", date: "Jun 14, 2026", location: "Kigali, Rwanda" },
  { id: "CF-T4N6Y", customer: "Sophie Laurent", email: "sophie@email.com", amount: 350000, items: 2, status: "CONFIRMED", date: "Jun 14, 2026", location: "Paris, France" },
  { id: "CF-B2K8P", customer: "Emmanuel K.", email: "ek@email.com", amount: 48000, items: 1, status: "PENDING", date: "Jun 13, 2026", location: "Kampala, Uganda" },
  { id: "CF-R7W3N", customer: "Fatima Diallo", email: "fatima@email.com", amount: 220000, items: 4, status: "DELIVERED", date: "Jun 12, 2026", location: "Dakar, Senegal" },
  { id: "CF-K5J2M", customer: "David Osei", email: "david@email.com", amount: 95000, items: 2, status: "CANCELLED", date: "Jun 11, 2026", location: "Accra, Ghana" },
  { id: "CF-N4H8L", customer: "Aisha Traore", email: "aisha@email.com", amount: 135000, items: 3, status: "SHIPPED", date: "Jun 10, 2026", location: "Abidjan, Ivory Coast" },
];

const STATUS_CONFIG: Record<OrderStatus, { color: string; bg: string; label: string }> = {
  PENDING: { color: "#888", bg: "#555/20", label: "Pending" },
  CONFIRMED: { color: "#3b82f6", bg: "#3b82f6/10", label: "Confirmed" },
  PROCESSING: { color: "#c9a84c", bg: "#c9a84c/10", label: "Processing" },
  SHIPPED: { color: "#1a6b3c", bg: "#1a6b3c/10", label: "Shipped" },
  DELIVERED: { color: "#22a85a", bg: "#22a85a/10", label: "Delivered" },
  CANCELLED: { color: "#c03030", bg: "#8b1a1a/10", label: "Cancelled" },
};

const STATUSES: Array<OrderStatus | "ALL"> = ["ALL", "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = ORDERS.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = s === "ALL" ? ORDERS.length : ORDERS.filter((o) => o.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      {/* Top bar */}
      <div className="border-b border-[#c9a84c]/10 px-8 py-4 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <h1 className="font-display text-xl font-semibold text-[#f5f0e8]">Orders</h1>
          <p className="text-[0.7rem] text-[#555]">{ORDERS.length} total orders</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative w-9 h-9 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#c9a84c] rounded-full" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a6b3c] to-[#c9a84c] flex items-center justify-center text-[0.8rem] font-bold text-black">A</div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Pending", count: counts.PENDING, icon: Clock, color: "#888" },
            { label: "Processing", count: counts.PROCESSING, icon: ShoppingBag, color: "#c9a84c" },
            { label: "Shipped", count: counts.SHIPPED, icon: TruckIcon, color: "#1a6b3c" },
            { label: "Delivered", count: counts.DELIVERED, icon: CheckCircle, color: "#22a85a" },
          ].map(({ label, count, icon: Icon, color }) => (
            <div key={label} className="glass-dark border border-[#c9a84c]/10 p-4 rounded-sm">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4" style={{ color }} />
                <span className="font-display text-2xl font-bold text-[#f5f0e8]">{count}</span>
              </div>
              <p className="text-[0.7rem] text-[#555] uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.85rem] text-[#f5f0e8] placeholder-[#555] focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 text-[0.72rem] font-medium rounded-sm transition-colors border ${
                  statusFilter === s
                    ? "bg-[#c9a84c]/10 text-[#c9a84c] border-[#c9a84c]/30"
                    : "border-[#c9a84c]/10 text-[#aaaaaa] hover:text-[#f5f0e8] hover:bg-white/5"
                }`}
              >
                {s === "ALL" ? "All" : STATUS_CONFIG[s as OrderStatus].label}
                {counts[s] > 0 && <span className="ml-1.5 text-[0.65rem] opacity-60">({counts[s]})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass-dark border border-[#c9a84c]/10 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[0.82rem]">
              <thead>
                <tr className="border-b border-[#c9a84c]/10 bg-[#0a0a0a]/40">
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Order</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Customer</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Amount</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Items</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Status</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Date</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => {
                  const cfg = STATUS_CONFIG[order.status];
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-[#c9a84c]/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4 font-mono text-[#c9a84c] text-[0.8rem]">{order.id}</td>
                      <td className="px-5 py-4">
                        <p className="text-[#f5f0e8]">{order.customer}</p>
                        <p className="text-[0.7rem] text-[#555]">{order.location}</p>
                      </td>
                      <td className="px-5 py-4 font-semibold text-[#f5f0e8]">{formatPrice(order.amount)}</td>
                      <td className="px-5 py-4 text-[#aaaaaa]">{order.items} item{order.items !== 1 ? "s" : ""}</td>
                      <td className="px-5 py-4">
                        <span
                          className="px-2.5 py-1 text-[0.65rem] rounded-sm font-medium uppercase tracking-wider"
                          style={{ backgroundColor: `${cfg.color}18`, color: cfg.color }}
                        >
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#555]">{order.date}</td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 text-[#555] hover:text-[#c9a84c] transition-colors rounded-sm hover:bg-[#c9a84c]/10"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-[#555]">
              <ShoppingBag className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-[0.85rem]">No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Order detail panel */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-end z-50">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-full max-w-md h-full glass-dark border-l border-[#c9a84c]/20 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold text-[#f5f0e8]">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-[#555] hover:text-[#f5f0e8] transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-[0.65rem] text-[#555] uppercase tracking-[0.15em] mb-1">Order ID</p>
                <p className="font-mono text-[#c9a84c]">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-[0.65rem] text-[#555] uppercase tracking-[0.15em] mb-1">Customer</p>
                <p className="text-[#f5f0e8]">{selectedOrder.customer}</p>
                <p className="text-[0.75rem] text-[#555]">{selectedOrder.email}</p>
              </div>
              <div>
                <p className="text-[0.65rem] text-[#555] uppercase tracking-[0.15em] mb-1">Delivery Location</p>
                <p className="text-[#aaaaaa]">{selectedOrder.location}</p>
              </div>
              <div>
                <p className="text-[0.65rem] text-[#555] uppercase tracking-[0.15em] mb-1">Amount</p>
                <p className="font-display text-xl font-bold text-[#f5f0e8]">{formatPrice(selectedOrder.amount)}</p>
              </div>
              <div>
                <p className="text-[0.65rem] text-[#555] uppercase tracking-[0.15em] mb-2">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"] as OrderStatus[]).map((s) => (
                    <button
                      key={s}
                      className="py-2 text-[0.72rem] border border-[#c9a84c]/10 rounded-sm text-[#aaaaaa] hover:border-[#c9a84c]/30 hover:text-[#c9a84c] transition-colors"
                    >
                      {STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
