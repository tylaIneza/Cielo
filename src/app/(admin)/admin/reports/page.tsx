"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell, BarChart3, TrendingUp, TrendingDown, Download,
  DollarSign, ShoppingBag, Users, Scissors,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { formatPrice } from "@/lib/utils";

const MONTHLY_DATA = [
  { month: "Jan", revenue: 1850000, orders: 42, customers: 38 },
  { month: "Feb", revenue: 2200000, orders: 58, customers: 51 },
  { month: "Mar", revenue: 1950000, orders: 47, customers: 44 },
  { month: "Apr", revenue: 2800000, orders: 71, customers: 65 },
  { month: "May", revenue: 3200000, orders: 84, customers: 79 },
  { month: "Jun", revenue: 2900000, orders: 76, customers: 70 },
  { month: "Jul", revenue: 3800000, orders: 98, customers: 92 },
];

const CATEGORY_DATA = [
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

const PERIODS = ["7 days", "30 days", "90 days", "This year"];

const METRICS = [
  { label: "Total Revenue", value: 18700000, prev: 15080645, icon: DollarSign, color: "#c9a84c", isCurrency: true },
  { label: "Total Orders", value: 476, prev: 403, icon: ShoppingBag, color: "#1a6b3c", isCurrency: false },
  { label: "New Customers", value: 439, prev: 391, icon: Users, color: "#3b82f6", isCurrency: false },
  { label: "Tailoring Jobs", value: 67, prev: 71, icon: Scissors, color: "#8b6f2a", isCurrency: false },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("30 days");

  return (
    <>
      {/* Top bar */}
      <div className="border-b border-[#c9a84c]/10 px-8 py-4 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <h1 className="font-display text-xl font-semibold text-[#f5f0e8]">Reports & Analytics</h1>
          <p className="text-[0.7rem] text-[#555]">Business performance overview</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative w-9 h-9 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#c9a84c] rounded-full" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#c9a84c]/20 text-[#c9a84c] text-[0.8rem] font-medium rounded-sm hover:bg-[#c9a84c]/10 transition-colors">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {/* Period selector */}
        <div className="flex gap-1 mb-6">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 text-[0.78rem] font-medium rounded-sm transition-colors border ${
                period === p
                  ? "bg-[#c9a84c]/10 text-[#c9a84c] border-[#c9a84c]/30"
                  : "border-[#c9a84c]/10 text-[#aaaaaa] hover:text-[#f5f0e8] hover:bg-white/5"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            const change = ((m.value - m.prev) / m.prev) * 100;
            const isUp = change >= 0;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark border border-[#c9a84c]/10 p-5 rounded-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${m.color}20`, border: `1px solid ${m.color}40` }}>
                    <Icon className="w-5 h-5" style={{ color: m.color }} />
                  </div>
                  <span className={`flex items-center gap-1 text-[0.7rem] font-medium ${isUp ? "text-[#22a85a]" : "text-[#c03030]"}`}>
                    {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(change).toFixed(1)}%
                  </span>
                </div>
                <p className="font-display text-2xl font-bold text-[#f5f0e8] mb-1">
                  {m.isCurrency ? formatPrice(m.value) : m.value.toLocaleString()}
                </p>
                <p className="text-[0.65rem] text-[#555] uppercase tracking-wider">{m.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Revenue trend */}
          <div className="lg:col-span-2 glass-dark border border-[#c9a84c]/10 p-6 rounded-sm">
            <h3 className="font-display text-base font-semibold text-[#f5f0e8] mb-5">Revenue & Orders Trend</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={MONTHLY_DATA}>
                <defs>
                  <linearGradient id="rGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4 }}
                  labelStyle={{ color: "#c9a84c", fontSize: 12 }}
                  itemStyle={{ color: "#f5f0e8", fontSize: 12 }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(v: any) => formatPrice(typeof v === "number" ? v : 0)}
                />
                <Area type="monotone" dataKey="revenue" stroke="#c9a84c" strokeWidth={2} fill="url(#rGrad)" name="revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category breakdown */}
          <div className="glass-dark border border-[#c9a84c]/10 p-6 rounded-sm">
            <h3 className="font-display text-base font-semibold text-[#f5f0e8] mb-5">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {CATEGORY_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4 }}
                  itemStyle={{ color: "#f5f0e8", fontSize: 12 }}
                  formatter={(v: unknown) => [`${v}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {CATEGORY_DATA.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-[0.75rem]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-[#aaaaaa]">{c.name}</span>
                  </div>
                  <span className="text-[#f5f0e8] font-medium">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Customer acquisition */}
          <div className="glass-dark border border-[#c9a84c]/10 p-6 rounded-sm">
            <h3 className="font-display text-base font-semibold text-[#f5f0e8] mb-5">Customer Acquisition</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4 }} itemStyle={{ color: "#f5f0e8", fontSize: 12 }} />
                <Bar dataKey="customers" fill="#1a3b6b" radius={[2, 2, 0, 0]} name="New Customers" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top products */}
          <div className="glass-dark border border-[#c9a84c]/10 p-6 rounded-sm">
            <h3 className="font-display text-base font-semibold text-[#f5f0e8] mb-5">Top Selling Products</h3>
            <div className="space-y-3">
              {TOP_PRODUCTS.map((p, i) => {
                const maxRevenue = TOP_PRODUCTS[0].revenue;
                const pct = (p.revenue / maxRevenue) * 100;
                return (
                  <div key={p.name}>
                    <div className="flex items-center justify-between mb-1.5 text-[0.78rem]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#555] font-mono w-4">{i + 1}</span>
                        <span className="text-[#f5f0e8]">{p.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-right">
                        <span className="text-[#555] text-[0.7rem]">{p.units} sold</span>
                        <span className="text-[#c9a84c] font-semibold w-28 text-right">{formatPrice(p.revenue)}</span>
                      </div>
                    </div>
                    <div className="h-1 bg-[#c9a84c]/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#c9a84c] to-[#f0d98b] rounded-full"
                      />
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
