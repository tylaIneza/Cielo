"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard, Package, ShoppingBag, Users, Scissors,
  BarChart3, Settings, LogOut, ChevronLeft, ChevronRight,
  Bell, UserCog,
} from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Scissors, label: "Tailoring", href: "/admin/tailoring" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: UserCog, label: "Users", href: "/admin/users" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-[60px]" : "w-60"
        } transition-all duration-300 flex flex-col border-r border-[#c9a84c]/10 shrink-0 sticky top-0 h-screen`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-[#c9a84c]/10 shrink-0">
          {!collapsed && (
            <Link href="/admin">
              <span className="font-display text-base font-bold text-[#f5f0e8] tracking-widest">CIELO</span>
              <span className="block text-[0.4rem] tracking-[0.35em] uppercase text-[#c9a84c] -mt-0.5">Admin Panel</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto w-7 h-7 flex items-center justify-center text-[#555] hover:text-[#c9a84c] transition-colors rounded-sm hover:bg-[#c9a84c]/10"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto scrollbar-hidden">
          {NAV.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-4 py-2.5 text-[0.8rem] font-medium transition-all ${
                isActive(href)
                  ? "bg-[#c9a84c]/10 text-[#c9a84c] border-l-2 border-[#c9a84c]"
                  : "text-[#888] hover:bg-white/5 hover:text-[#f5f0e8] border-l-2 border-transparent"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {/* User + logout */}
        <div className="p-3 border-t border-[#c9a84c]/10 shrink-0">
          {!collapsed && session && (
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1a6b3c] to-[#c9a84c] flex items-center justify-center text-[0.7rem] font-bold text-black shrink-0">
                {session.user.name?.[0] ?? "A"}
              </div>
              <div className="min-w-0">
                <p className="text-[0.75rem] text-[#f5f0e8] truncate">{session.user.name}</p>
                <p className="text-[0.6rem] text-[#555] uppercase tracking-wider">{session.user.role.replace("_", " ")}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            title={collapsed ? "Logout" : undefined}
            className="flex items-center gap-3 text-[0.78rem] text-[#555] hover:text-[#f5f0e8] transition-colors w-full px-1 py-1.5 rounded-sm hover:bg-white/5"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}
