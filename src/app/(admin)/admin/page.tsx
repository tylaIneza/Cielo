"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  DollarSign, ShoppingBag, Users, Scissors,
  TrendingUp, TrendingDown, Bell, ArrowUpRight,
  Clock, Eye, BarChart3, Package,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { formatPrice, formatDate } from "@/lib/utils";

const SALES_DATA = [
  { month: "Jan", revenue: 1850000, orders: 42 },
  { month: "Feb", revenue: 2200000, orders: 58 },
  { month: "Mar", revenue: 1950000, orders: 47 },
  { month: "Apr", revenue: 2800000, orders: 71 },
  { month: "May", revenue: 3200000, orders: 84 },
  { month: "Jun", revenue: 2900000, orders: 76 },
  { month: "Jul", revenue: 3800000, orders: 98 },
];

const STATS = [
  { label: "Total Revenue", value: 18700000, change: 24, icon: DollarSign, color: "#c9a84c", format: "currency" },
  { label: "Total Orders", value: 476, change: 18, icon: ShoppingBag, color: "#1a6b3c", format: "number" },
  { label: "Active Customers", value: 2840, change: 12, icon: Users, color: "#1a3b6b", format: "number" },
  { label: "Tailoring Requests", value: 67, change: -5, icon: Scissors, color: "#8b6f2a", format: "number" },
];

const RECENT_ORDERS = [
  { id: "CF-X8A2K", customer: "Amara Nkusi", amount: 85000, status: "DELIVERED", date: "2 hours ago" },
  { id: "CF-M3P7J", customer: "Jean-Pierre H.", amount: 180000, status: "SHIPPED", date: "5 hours ago" },
  { id: "CF-L9Q1R", customer: "Grace Uwimana", amount: 65000, status: "PROCESSING", date: "1 day ago" },
  { id: "CF-T4N6Y", customer: "Sophie Laurent", amount: 350000, status: "CONFIRMED", date: "1 day ago" },
  { id: "CF-B2K8P", customer: "Emmanuel K.", amount: 48000, status: "PENDING", date: "2 days ago" },
];

const STATUS_COLORS: Record<string, string> = {
  DELIVERED: "#22a85a", SHIPPED: "#1a6b3c", PROCESSING: "#c9a84c",
  CONFIRMED: "#3b82f6", PENDING: "#555",
};

function KigaliTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-RW", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <>
      {/* Topbar */}
      <div className="h-14 border-b border-[#c9a84c]/10 px-6 flex items-center justify-between bg-[#0a0a0a]/60 backdrop-blur-sm sticky top-0 z-10 shrink-0">
        <div>
          <h1 className="font-display text-lg font-semibold text-[#f5f0e8]">Dashboard</h1>
          <p className="text-[0.65rem] text-[#555]">
            Welcome, {session?.user.name ?? "Admin"} · <KigaliTime />
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#c9a84c] transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#c9a84c] rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a6b3c] to-[#c9a84c] flex items-center justify-center text-[0.75rem] font-bold text-black">
            {session?.user.name?.[0] ?? "A"}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-dark border border-[#c9a84c]/10 p-5 rounded-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center"
                    style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}>
                    <Icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <span className={`flex items-center gap-1 text-[0.68rem] font-medium ${s.change >= 0 ? "text-[#22a85a]" : "text-[#c03030]"}`}>
                    {s.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(s.change)}%
                  </span>
                </div>
                <p className="font-display text-xl font-bold text-[#f5f0e8] mb-0.5">
                  {s.format === "currency" ? formatPrice(s.value) : s.value.toLocaleString()}
                </p>
                <p className="text-[0.65rem] text-[#555] uppercase tracking-wider">{s.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 glass-dark border border-[#c9a84c]/10 p-5 rounded-sm">
            <h3 className="font-display text-base font-semibold text-[#f5f0e8] mb-4">Revenue Overview</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #c9a84c30", borderRadius: 4 }} labelStyle={{ color: "#c9a84c", fontSize: 12 }} itemStyle={{ color: "#f5f0e8", fontSize: 12 }} formatter={(v: unknown) => formatPrice(typeof v === "number" ? v : 0)} />
                <Area type="monotone" dataKey="revenue" stroke="#c9a84c" strokeWidth={1.5} fill="url(#rg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-dark border border-[#c9a84c]/10 p-5 rounded-sm">
            <h3 className="font-display text-base font-semibold text-[#f5f0e8] mb-4">Monthly Orders</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #1a6b3c40", borderRadius: 4 }} itemStyle={{ color: "#f5f0e8", fontSize: 12 }} />
                <Bar dataKey="orders" fill="#1a6b3c" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent orders */}
        <div className="glass-dark border border-[#c9a84c]/10 rounded-sm overflow-hidden mb-4">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#c9a84c]/10">
            <h3 className="font-display text-base font-semibold text-[#f5f0e8]">Recent Orders</h3>
            <Link href="/admin/orders" className="text-[0.72rem] text-[#c9a84c] hover:text-[#f0d98b] transition-colors flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.8rem]">
              <thead>
                <tr className="border-b border-[#c9a84c]/10">
                  {["Order ID", "Customer", "Amount", "Status", "Date", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[0.62rem] text-[#555] uppercase tracking-[0.15em] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((o, i) => (
                  <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                    className="border-b border-[#c9a84c]/5 hover:bg-white/[0.015] transition-colors">
                    <td className="px-5 py-3.5 font-mono text-[#c9a84c] text-[0.78rem]">{o.id}</td>
                    <td className="px-5 py-3.5 text-[#f5f0e8]">{o.customer}</td>
                    <td className="px-5 py-3.5 font-semibold text-[#f5f0e8]">{formatPrice(o.amount)}</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 text-[0.62rem] rounded-sm font-medium uppercase tracking-wider"
                        style={{ background: `${STATUS_COLORS[o.status]}18`, color: STATUS_COLORS[o.status] }}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[#555] text-[0.75rem] flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />{o.date}
                    </td>
                    <td className="px-5 py-3.5">
                      <Link href={`/admin/orders/${o.id}`}>
                        <Eye className="w-3.5 h-3.5 text-[#555] hover:text-[#c9a84c] transition-colors" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Add Product", href: "/admin/products/new", icon: Package, color: "#c9a84c" },
            { label: "View Tailoring", href: "/admin/tailoring", icon: Scissors, color: "#1a6b3c" },
            { label: "Reports", href: "/admin/reports", icon: BarChart3, color: "#3b82f6" },
            { label: "Manage Users", href: "/admin/users", icon: Users, color: "#8b6f2a" },
          ].map(({ label, href, icon: Icon, color }) => (
            <Link key={label} href={href}>
              <motion.div whileHover={{ scale: 1.02, y: -2 }}
                className="glass-dark border border-[#c9a84c]/10 p-4 rounded-sm flex items-center gap-3 hover:border-[#c9a84c]/25 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: `${color}18` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                </div>
                <span className="text-[0.78rem] font-medium text-[#f5f0e8]">{label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
