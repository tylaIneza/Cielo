"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  Heart,
  MapPin,
  Ruler,
  Scissors,
  User,
  ChevronRight,
  Bell,
  LogOut,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getInitials } from "@/lib/utils";

const DEMO_USER = {
  firstName: "Amara",
  lastName: "Uwayo",
  email: "amara.uwayo@example.com",
  phone: "+250 788 123 456",
  memberSince: "January 2025",
};

const MENU_ITEMS = [
  {
    icon: Package,
    label: "My Orders",
    description: "Track and manage your purchases",
    href: "/account/orders",
    badge: "3 active",
  },
  {
    icon: Scissors,
    label: "Tailoring Requests",
    description: "Track your custom garment progress",
    href: "/account/orders",
    badge: "1 in progress",
  },
  {
    icon: Heart,
    label: "Wishlist",
    description: "Items you've saved for later",
    href: "/account/wishlist",
    badge: null,
  },
  {
    icon: MapPin,
    label: "Addresses",
    description: "Manage your delivery addresses",
    href: "/account/addresses",
    badge: null,
  },
  {
    icon: Ruler,
    label: "My Measurements",
    description: "Saved measurements for custom tailoring",
    href: "/account/measurements",
    badge: null,
  },
  {
    icon: Bell,
    label: "Notifications",
    description: "Order updates and promotions",
    href: "/account/notifications",
    badge: "2 unread",
  },
  {
    icon: User,
    label: "Profile Settings",
    description: "Update your personal information",
    href: "/account/profile",
    badge: null,
  },
];

export default function AccountPage() {
  const initials = getInitials(`${DEMO_USER.firstName} ${DEMO_USER.lastName}`);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] pt-6 pb-24">
        <div className="border-b border-[#c9a84c]/10 bg-[#050505] py-12">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8f6f2a] to-[#c9a84c] flex items-center justify-center text-black text-xl font-bold font-display">
                {initials}
              </div>
              <div>
                <p className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.3em] mb-1">My Account</p>
                <h1 className="font-display text-3xl font-semibold text-[#f5f0e8]">
                  {DEMO_USER.firstName} {DEMO_USER.lastName}
                </h1>
                <p className="text-[0.8rem] text-[#555] mt-1">Member since {DEMO_USER.memberSince}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container-luxury mt-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MENU_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 p-5 bg-[#111] border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-all duration-300"
                  >
                    <div className="w-11 h-11 bg-[#1a1a1a] group-hover:bg-[#c9a84c]/10 border border-[#c9a84c]/15 flex items-center justify-center transition-colors duration-300 shrink-0">
                      <Icon className="w-5 h-5 text-[#c9a84c]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[0.85rem] font-medium text-[#f5f0e8]">{item.label}</p>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 bg-[#c9a84c]/15 text-[#c9a84c] text-[0.6rem] font-medium uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[0.75rem] text-[#555] mt-0.5 truncate">{item.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#555] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Sign Out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 pt-8 border-t border-[#c9a84c]/10"
          >
            <button className="flex items-center gap-2 text-[0.8rem] text-[#555] hover:text-[#f44336] transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
