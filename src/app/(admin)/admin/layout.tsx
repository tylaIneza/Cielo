"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingBag, Users, Scissors,
  FileText, BarChart3, Settings, LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Scissors, label: "Tailoring", href: "/admin/tailoring" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: FileText, label: "Fabrics", href: "/admin/fabrics" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#050505] flex">
      <aside className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 flex flex-col border-r border-[#c9a84c]/10 shrink-0`}>
        <div className="p-5 border-b border-[#c9a84c]/10 flex items-center justify-between">
          {!collapsed && (
            <Link href="/">
              <span className="font-display text-lg font-bold text-[#f5f0e8]">CIELO</span>
              <span className="block text-[0.45rem] tracking-[0.3em] uppercase text-[#c9a84c] -mt-0.5">Admin Panel</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#555] hover:text-[#c9a84c] transition-colors ml-auto"
            aria-label="Toggle sidebar"
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-[0.8rem] font-medium transition-all ${
                  active
                    ? "bg-[#c9a84c]/10 text-[#c9a84c] border-l-2 border-[#c9a84c]"
                    : "text-[#aaaaaa] hover:bg-white/5 hover:text-[#f5f0e8]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#c9a84c]/10">
          <button className="flex items-center gap-3 text-[0.8rem] text-[#555] hover:text-[#f5f0e8] transition-colors w-full">
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
