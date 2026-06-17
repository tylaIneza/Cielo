"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Bell, Users, Mail, MapPin, ShoppingBag,
  Eye, XCircle, TrendingUp, Crown,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

type CustomerTier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

type Customer = {
  id: string;
  name: string;
  email: string;
  location: string;
  orders: number;
  totalSpent: number;
  tier: CustomerTier;
  joined: string;
  lastOrder: string;
};

const CUSTOMERS: Customer[] = [
  { id: "C001", name: "Amara Nkusi", email: "amara@email.com", location: "Kigali, Rwanda", orders: 12, totalSpent: 1450000, tier: "GOLD", joined: "Mar 2024", lastOrder: "Jun 15, 2026" },
  { id: "C002", name: "Jean-Pierre H.", email: "jp@email.com", location: "Nairobi, Kenya", orders: 8, totalSpent: 980000, tier: "SILVER", joined: "May 2024", lastOrder: "Jun 15, 2026" },
  { id: "C003", name: "Grace Uwimana", email: "grace@email.com", location: "Kigali, Rwanda", orders: 24, totalSpent: 3200000, tier: "PLATINUM", joined: "Jan 2024", lastOrder: "Jun 14, 2026" },
  { id: "C004", name: "Sophie Laurent", email: "sophie@email.com", location: "Paris, France", orders: 5, totalSpent: 780000, tier: "SILVER", joined: "Aug 2024", lastOrder: "Jun 14, 2026" },
  { id: "C005", name: "Emmanuel K.", email: "ek@email.com", location: "Kampala, Uganda", orders: 2, totalSpent: 95000, tier: "BRONZE", joined: "Nov 2024", lastOrder: "Jun 13, 2026" },
  { id: "C006", name: "Fatima Diallo", email: "fatima@email.com", location: "Dakar, Senegal", orders: 18, totalSpent: 2100000, tier: "GOLD", joined: "Feb 2024", lastOrder: "Jun 12, 2026" },
  { id: "C007", name: "David Osei", email: "david@email.com", location: "Accra, Ghana", orders: 3, totalSpent: 210000, tier: "BRONZE", joined: "Oct 2024", lastOrder: "Jun 11, 2026" },
  { id: "C008", name: "Aisha Traore", email: "aisha@email.com", location: "Abidjan, Ivory Coast", orders: 31, totalSpent: 4800000, tier: "PLATINUM", joined: "Jan 2024", lastOrder: "Jun 10, 2026" },
];

const TIER_CONFIG: Record<CustomerTier, { color: string; icon: string }> = {
  BRONZE: { color: "#8b6f2a", icon: "🥉" },
  SILVER: { color: "#aaaaaa", icon: "🥈" },
  GOLD: { color: "#c9a84c", icon: "🥇" },
  PLATINUM: { color: "#e2d5f8", icon: "💎" },
};

const TIERS: Array<CustomerTier | "ALL"> = ["ALL", "PLATINUM", "GOLD", "SILVER", "BRONZE"];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<CustomerTier | "ALL">("ALL");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === "ALL" || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const totalRevenue = CUSTOMERS.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <>
      {/* Top bar */}
      <div className="border-b border-[#c9a84c]/10 px-8 py-4 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <h1 className="font-display text-xl font-semibold text-[#f5f0e8]">Customers</h1>
          <p className="text-[0.7rem] text-[#555]">{CUSTOMERS.length} registered customers</p>
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
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Customers", value: CUSTOMERS.length, icon: Users, color: "#c9a84c" },
            { label: "Platinum Members", value: CUSTOMERS.filter((c) => c.tier === "PLATINUM").length, icon: Crown, color: "#e2d5f8" },
            { label: "Avg. Order Value", value: formatPrice(Math.round(totalRevenue / CUSTOMERS.reduce((s, c) => s + c.orders, 0))), icon: TrendingUp, color: "#22a85a" },
            { label: "Total Revenue", value: formatPrice(totalRevenue), icon: ShoppingBag, color: "#1a6b3c" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass-dark border border-[#c9a84c]/10 p-4 rounded-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" style={{ color }} />
                <p className="text-[0.65rem] text-[#555] uppercase tracking-wider">{label}</p>
              </div>
              <p className="font-display text-xl font-bold text-[#f5f0e8]">{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
            <input
              type="text"
              placeholder="Search by name, email, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.85rem] text-[#f5f0e8] placeholder-[#555] focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
            />
          </div>
          <div className="flex gap-1">
            {TIERS.map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`px-3 py-2 text-[0.72rem] font-medium rounded-sm transition-colors border ${
                  tierFilter === t
                    ? "bg-[#c9a84c]/10 text-[#c9a84c] border-[#c9a84c]/30"
                    : "border-[#c9a84c]/10 text-[#aaaaaa] hover:text-[#f5f0e8] hover:bg-white/5"
                }`}
              >
                {t === "ALL" ? "All Tiers" : t}
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
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Customer</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Location</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Orders</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Total Spent</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Tier</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Last Order</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const tier = TIER_CONFIG[c.tier];
                  return (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-[#c9a84c]/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-[0.8rem] font-bold text-black shrink-0"
                            style={{ background: `linear-gradient(135deg, ${tier.color}80, ${tier.color})` }}>
                            {c.name[0]}
                          </div>
                          <div>
                            <p className="text-[#f5f0e8] font-medium">{c.name}</p>
                            <p className="text-[0.7rem] text-[#555]">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-[#aaaaaa]">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          {c.location}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#f5f0e8]">{c.orders}</td>
                      <td className="px-5 py-4 font-semibold text-[#f5f0e8]">{formatPrice(c.totalSpent)}</td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 text-[0.65rem] rounded-sm font-medium uppercase tracking-wider"
                          style={{ backgroundColor: `${tier.color}18`, color: tier.color }}>
                          {tier.icon} {c.tier}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#555]">{c.lastOrder}</td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setSelected(c)}
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
              <Users className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-[0.85rem]">No customers found</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer detail panel */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-end z-50">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-full max-w-md h-full glass-dark border-l border-[#c9a84c]/20 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold text-[#f5f0e8]">Customer Profile</h2>
              <button onClick={() => setSelected(null)} className="text-[#555] hover:text-[#f5f0e8] transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-6 pb-6 border-b border-[#c9a84c]/10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-black mx-auto mb-3"
                style={{ background: `linear-gradient(135deg, ${TIER_CONFIG[selected.tier].color}80, ${TIER_CONFIG[selected.tier].color})` }}>
                {selected.name[0]}
              </div>
              <h3 className="font-display text-lg font-semibold text-[#f5f0e8]">{selected.name}</h3>
              <p className="text-[0.78rem] text-[#555] mb-2">{selected.email}</p>
              <span className="px-3 py-1 text-[0.65rem] rounded-sm font-medium uppercase tracking-wider"
                style={{ backgroundColor: `${TIER_CONFIG[selected.tier].color}18`, color: TIER_CONFIG[selected.tier].color }}>
                {TIER_CONFIG[selected.tier].icon} {selected.tier} Member
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: "Total Orders", value: selected.orders },
                { label: "Total Spent", value: formatPrice(selected.totalSpent) },
                { label: "Member Since", value: selected.joined },
                { label: "Last Order", value: selected.lastOrder },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 p-3 rounded-sm">
                  <p className="text-[0.65rem] text-[#555] uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-[#f5f0e8] font-semibold text-[0.85rem]">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-2.5 flex items-center justify-center gap-2 border border-[#c9a84c]/20 text-[#c9a84c] text-[0.82rem] rounded-sm hover:bg-[#c9a84c]/10 transition-colors">
                <Mail className="w-4 h-4" />
                Email Customer
              </button>
              <button className="flex-1 py-2.5 border border-[#c9a84c]/10 text-[#aaaaaa] text-[0.82rem] rounded-sm hover:bg-white/5 transition-colors">
                View Orders
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
