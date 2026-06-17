"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Download, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Scissors } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { formatPrice } from "@/lib/utils";

const MONTHLY = [
  { month: "Jan", revenue: 1850000, orders: 42, customers: 38 },
  { month: "Feb", revenue: 2200000, orders: 58, customers: 51 },
  { month: "Mar", revenue: 1950000, orders: 47, customers: 44 },
  { month: "Apr", revenue: 2800000, orders: 71, customers: 65 },
  { month: "May", revenue: 3200000, orders: 84, customers: 79 },
  { month: "Jun", revenue: 2900000, orders: 76, customers: 70 },
  { month: "Jul", revenue: 3800000, orders: 98, customers: 92 },
];

const CATEGORIES = [
  { name: "Women", value: 38, color: "#c9a84c" },
  { name: "African Print", value: 29, color: "#1a6b3c" },
  { name: "Men", value: 18, color: "#3b82f6" },
  { name: "Tailoring", value: 11, color: "#8b5cf6" },
  { name: "Kids", value: 4, color: "#888" },
];

const TOP_PRODUCTS = [
  { name: "Silk Evening Gown", revenue: 1920000, units: 6 },
  { name: "Kente Blazer", revenue: 1595000, units: 11 },
  { name: "Ankara Wrap Dress", revenue: 1275000, units: 15 },
  { name: "Gold Brocade Kaftan", revenue: 1120000, units: 4 },
  { name: "Cashmere Tailored Suit", revenue: 960000, units: 8 },
];

const KPIs = [
  { label: "Total Revenue", value: 18700000, prev: 15080000, icon: DollarSign, color: "#c9a84c", currency: true },
  { label: "Total Orders", value: 476, prev: 403, icon: ShoppingBag, color: "#1a6b3c", currency: false },
  { label: "New Customers", value: 439, prev: 391, icon: Users, color: "#3b82f6", currency: false },
  { label: "Tailoring Jobs", value: 67, prev: 71, icon: Scissors, color: "#8b6f2a", currency: false },
];

const PERIODS = ["7 days", "30 days", "90 days", "This year"];

export default function ReportsPage() {
  const [period, setPeriod] = useState("30 days");

  return (
    <>
      <div className="h-14 border-b border-[#c9a84c]/10 px-6 flex items-center justify-between bg-[#0a0a0a]/60 backdrop-blur-sm sticky top-0 z-10 shrink-0">
        <div>
          <h1 className="font-display text-lg font-semibold text-[#f5f0e8]">Reports & Analytics</h1>
          <p className="text-[0.65rem] text-[#555]">Business performance overview</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#c9a84c] transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#c9a84c]/20 text-[#c9a84c] text-[0.78rem] font-medium rounded-sm hover:bg-[#c9a84c]/10 transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Period */}
        <div className="flex gap-1 mb-5">
          {PERIODS.map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-[0.75rem] font-medium rounded-sm transition-colors border ${
                period === p ? "bg-[#c9a84c]/10 text-[#c9a84c] border-[#c9a84c]/30" : "border-[#c9a84c]/10 text-[#888] hover:text-[#f5f0e8] hover:bg-white/5"
              }`}>
              {p}
            </button>
          ))}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {KPIs.map((k, i) => {
            const Icon = k.icon;
            const change = ((k.value - k.prev) / k.prev) * 100;
            const up = change >= 0;
            return (
              <motion.div key={k.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="glass-dark border border-[#c9a84c]/10 p-5 rounded-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ background: `${k.color}18`, border: `1px solid ${k.color}30` }}>
                    <Icon className="w-4 h-4" style={{ color: k.color }} />
                  </div>
                  <span className={`flex items-center gap-1 text-[0.68rem] font-medium ${up ? "text-[#22a85a]" : "text-[#c03030]"}`}>
                    {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(change).toFixed(1)}%
                  </span>
                </div>
                <p className="font-display text-xl font-bold text-[#f5f0e8] mb-0.5">
                  {k.currency ? formatPrice(k.value) : k.value.toLocaleString()}
                </p>
                <p className="text-[0.62rem] text-[#555] uppercase tracking-wider">{k.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Revenue + Category */}
        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2 glass-dark border border-[#c9a84c]/10 p-5 rounded-sm">
            <h3 className="font-display text-base font-semibold text-[#f5f0e8] mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={MONTHLY}>
                <defs>
                  <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #c9a84c30", borderRadius: 4 }} labelStyle={{ color: "#c9a84c" }} itemStyle={{ color: "#f5f0e8", fontSize: 12 }} formatter={(v: unknown) => formatPrice(typeof v === "number" ? v : 0)} />
                <Area type="monotone" dataKey="revenue" stroke="#c9a84c" strokeWidth={1.5} fill="url(#rg2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-dark border border-[#c9a84c]/10 p-5 rounded-sm">
            <h3 className="font-display text-base font-semibold text-[#f5f0e8] mb-4">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={CATEGORIES} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {CATEGORIES.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #c9a84c30", borderRadius: 4 }} itemStyle={{ fontSize: 12, color: "#f5f0e8" }} formatter={(v) => [`${v}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {CATEGORIES.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-[0.72rem]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                    <span className="text-[#888]">{c.name}</span>
                  </div>
                  <span className="text-[#f5f0e8] font-medium">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer bar + Top products */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="glass-dark border border-[#c9a84c]/10 p-5 rounded-sm">
            <h3 className="font-display text-base font-semibold text-[#f5f0e8] mb-4">Customer Acquisition</h3>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #1a3b6b40", borderRadius: 4 }} itemStyle={{ color: "#f5f0e8", fontSize: 12 }} />
                <Bar dataKey="customers" fill="#1a3b6b" radius={[2, 2, 0, 0]} name="New Customers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-dark border border-[#c9a84c]/10 p-5 rounded-sm">
            <h3 className="font-display text-base font-semibold text-[#f5f0e8] mb-4">Top Selling Products</h3>
            <div className="space-y-3">
              {TOP_PRODUCTS.map((p, i) => {
                const pct = (p.revenue / TOP_PRODUCTS[0].revenue) * 100;
                return (
                  <div key={p.name}>
                    <div className="flex items-center justify-between mb-1 text-[0.75rem]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#555] font-mono w-4">{i + 1}</span>
                        <span className="text-[#f5f0e8]">{p.name}</span>
                      </div>
                      <span className="text-[#c9a84c] font-semibold">{formatPrice(p.revenue)}</span>
                    </div>
                    <div className="h-1 bg-[#c9a84c]/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#c9a84c] to-[#f0d98b] rounded-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
