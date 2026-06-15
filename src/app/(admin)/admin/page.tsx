"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingBag, Users, Scissors, FileText,
  TrendingUp, TrendingDown, DollarSign, Eye, Bell, Settings, LogOut,
  BarChart3, ArrowUpRight, Clock, CheckCircle, AlertCircle,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { formatPrice } from "@/lib/utils";

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
  { label: "Total Revenue", value: 18700000, change: 24, icon: DollarSign, color: "#c9a84c" },
  { label: "Total Orders", value: 476, change: 18, icon: ShoppingBag, color: "#1a6b3c" },
  { label: "Active Customers", value: 2840, change: 12, icon: Users, color: "#1a3b6b" },
  { label: "Tailoring Requests", value: 67, change: -5, icon: Scissors, color: "#8b6f2a" },
];

const RECENT_ORDERS = [
  { id: "CF-X8A2K", customer: "Amara Nkusi", amount: 85000, status: "DELIVERED", date: "2 hours ago" },
  { id: "CF-M3P7J", customer: "Jean-Pierre H.", amount: 180000, status: "SHIPPED", date: "5 hours ago" },
  { id: "CF-L9Q1R", customer: "Grace Uwimana", amount: 65000, status: "PROCESSING", date: "1 day ago" },
  { id: "CF-T4N6Y", customer: "Sophie Laurent", amount: 350000, status: "CONFIRMED", date: "1 day ago" },
  { id: "CF-B2K8P", customer: "Emmanuel K.", amount: 48000, status: "PENDING", date: "2 days ago" },
];

const STATUS_COLORS: Record<string, string> = {
  DELIVERED: "#22a85a",
  SHIPPED: "#1a6b3c",
  PROCESSING: "#c9a84c",
  CONFIRMED: "#3b82f6",
  PENDING: "#555",
};

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Scissors, label: "Tailoring", href: "/admin/tailoring" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: FileText, label: "Fabrics", href: "/admin/fabrics" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 flex flex-col border-r border-[#c9a84c]/10 shrink-0`}>
        <div className="p-5 border-b border-[#c9a84c]/10 flex items-center justify-between">
          {sidebarOpen && (
            <Link href="/">
              <span className="font-display text-lg font-bold text-[#f5f0e8]">CIELO</span>
              <span className="block text-[0.45rem] tracking-[0.3em] uppercase text-[#c9a84c] -mt-0.5">Admin Panel</span>
            </Link>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#555] hover:text-[#c9a84c] transition-colors ml-auto">
            <LayoutDashboard className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-[0.8rem] font-medium transition-all ${
                  item.active
                    ? "bg-[#c9a84c]/10 text-[#c9a84c] border-l-2 border-[#c9a84c]"
                    : "text-[#aaaaaa] hover:bg-white/5 hover:text-[#f5f0e8]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#c9a84c]/10">
          <button className="flex items-center gap-3 text-[0.8rem] text-[#555] hover:text-[#f5f0e8] transition-colors w-full">
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="border-b border-[#c9a84c]/10 px-8 py-4 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <h1 className="font-display text-xl font-semibold text-[#f5f0e8]">Dashboard</h1>
            <p className="text-[0.7rem] text-[#555]">Welcome back, Admin · Kigali time {new Date().toLocaleTimeString("en-RW", { hour: "2-digit", minute: "2-digit" })}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative w-9 h-9 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#c9a84c] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a6b3c] to-[#c9a84c] flex items-center justify-center text-[0.8rem] font-bold text-black">
              A
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-dark border border-[#c9a84c]/10 p-5 rounded-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${stat.color}20`, border: `1px solid ${stat.color}40` }}>
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <span className={`flex items-center gap-1 text-[0.7rem] font-medium ${stat.change >= 0 ? "text-[#22a85a]" : "text-[#8b1a1a]"}`}>
                      {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(stat.change)}%
                    </span>
                  </div>
                  <p className="font-display text-2xl font-bold text-[#f5f0e8] mb-1">
                    {stat.label === "Total Revenue" ? formatPrice(stat.value) : stat.value.toLocaleString()}
                  </p>
                  <p className="text-[0.7rem] text-[#555] uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue chart */}
            <div className="lg:col-span-2 glass-dark border border-[#c9a84c]/10 p-6 rounded-sm">
              <h3 className="font-display text-lg font-semibold text-[#f5f0e8] mb-5">Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
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
                    formatter={(v: unknown) => formatPrice(typeof v === "number" ? v : 0)}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#c9a84c" strokeWidth={2} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Orders chart */}
            <div className="glass-dark border border-[#c9a84c]/10 p-6 rounded-sm">
              <h3 className="font-display text-lg font-semibold text-[#f5f0e8] mb-5">Monthly Orders</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={SALES_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4 }} labelStyle={{ color: "#1a6b3c" }} itemStyle={{ color: "#f5f0e8", fontSize: 12 }} />
                  <Bar dataKey="orders" fill="#1a6b3c" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="glass-dark border border-[#c9a84c]/10 rounded-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-[#c9a84c]/10">
              <h3 className="font-display text-lg font-semibold text-[#f5f0e8]">Recent Orders</h3>
              <Link href="/admin/orders" className="text-[0.75rem] text-[#c9a84c] hover:text-[#f0d98b] transition-colors flex items-center gap-1">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.82rem]">
                <thead>
                  <tr className="border-b border-[#c9a84c]/10">
                    <th className="text-left px-5 py-3 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Order ID</th>
                    <th className="text-left px-5 py-3 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Customer</th>
                    <th className="text-left px-5 py-3 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Amount</th>
                    <th className="text-left px-5 py-3 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Status</th>
                    <th className="text-left px-5 py-3 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Date</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((order, i) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="border-b border-[#c9a84c]/5 hover:bg-white/2 transition-colors"
                    >
                      <td className="px-5 py-4 font-mono text-[#c9a84c] text-[0.8rem]">{order.id}</td>
                      <td className="px-5 py-4 text-[#f5f0e8]">{order.customer}</td>
                      <td className="px-5 py-4 font-semibold text-[#f5f0e8]">{formatPrice(order.amount)}</td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 text-[0.65rem] rounded-sm font-medium uppercase tracking-wider" style={{ backgroundColor: `${STATUS_COLORS[order.status]}20`, color: STATUS_COLORS[order.status] }}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#555] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {order.date}
                      </td>
                      <td className="px-5 py-4">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Eye className="w-4 h-4 text-[#555] hover:text-[#c9a84c] transition-colors" />
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Add Product", href: "/admin/products/new", icon: Package, color: "#c9a84c" },
              { label: "View Tailoring", href: "/admin/tailoring", icon: Scissors, color: "#1a6b3c" },
              { label: "Generate Report", href: "/admin/reports", icon: BarChart3, color: "#3b82f6" },
              { label: "Manage Users", href: "/admin/customers", icon: Users, color: "#8b6f2a" },
            ].map(({ label, href, icon: Icon, color }) => (
              <Link key={label} href={href}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="glass-dark border border-[#c9a84c]/10 p-5 rounded-sm flex items-center gap-3 hover:border-[#c9a84c]/30 transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <span className="text-[0.82rem] font-medium text-[#f5f0e8]">{label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
