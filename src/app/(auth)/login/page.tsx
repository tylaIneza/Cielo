"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f4025]/80 via-[#0a0a0a] to-[#1a1a1a]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#c9a84c]/15 blur-[100px]" />
        </div>

        <Link href="/" className="relative z-10">
          <span className="font-display text-3xl font-bold text-[#f5f0e8]">CIELO</span>
          <span className="block text-[0.55rem] tracking-[0.35em] uppercase text-[#c9a84c] -mt-1">Fashion Boutique</span>
        </Link>

        <div className="relative z-10">
          <p className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.3em] mb-4">Welcome Back</p>
          <h2 className="font-display text-5xl font-semibold text-[#f5f0e8] leading-[1.1] mb-6">
            Your Style,<br />Your Account.
          </h2>
          <p className="text-[#aaaaaa] leading-relaxed max-w-xs">
            Sign in to access your orders, wishlist, tailoring requests, and exclusive member benefits.
          </p>
        </div>

        <p className="relative z-10 text-[0.7rem] italic font-display text-[#c9a84c] tracking-wider">
          &ldquo;Crafted in Rwanda, Inspired by Style.&rdquo;
        </p>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8">
            <Link href="/">
              <span className="font-display text-2xl font-bold text-[#f5f0e8]">CIELO</span>
              <span className="block text-[0.5rem] tracking-[0.3em] uppercase text-[#c9a84c] -mt-0.5">Fashion Boutique</span>
            </Link>
          </div>

          <h1 className="font-display text-3xl font-semibold text-[#f5f0e8] mb-2">Sign In</h1>
          <p className="text-[#aaaaaa] text-sm mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#c9a84c] hover:text-[#f0d98b] transition-colors">
              Create one
            </Link>
          </p>

          {/* Login method toggle */}
          <div className="flex gap-0 mb-8 border border-[#c9a84c]/20">
            {(["email", "phone"] as const).map((method) => (
              <button
                key={method}
                onClick={() => setLoginMethod(method)}
                className={`flex-1 py-3 text-[0.75rem] font-medium uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-all ${
                  loginMethod === method
                    ? "bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] text-black"
                    : "text-[#aaaaaa] hover:text-[#f5f0e8]"
                }`}
              >
                {method === "email" ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                {method === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[0.72rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">
                {loginMethod === "email" ? "Email Address" : "Phone Number"}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]">
                  {loginMethod === "email" ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                </div>
                <input
                  type={loginMethod === "email" ? "email" : "tel"}
                  value={formData.emailOrPhone}
                  onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                  placeholder={loginMethod === "email" ? "your@email.com" : "+250 7XX XXX XXX"}
                  required
                  className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 pl-11 pr-4 py-3.5 text-[0.9rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[0.72rem] text-[#aaaaaa] uppercase tracking-[0.15em]">Password</label>
                <Link href="/forgot-password" className="text-[0.7rem] text-[#c9a84c] hover:text-[#f0d98b] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 pl-11 pr-12 py-3.5 text-[0.9rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#aaaaaa] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <LuxuryButton type="submit" variant="gold" size="lg" loading={loading} className="w-full mt-2">
              Sign In <ArrowRight className="w-4 h-4" />
            </LuxuryButton>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#c9a84c]/10" />
            <span className="text-[0.7rem] text-[#555] uppercase tracking-wider">or continue with</span>
            <div className="flex-1 h-px bg-[#c9a84c]/10" />
          </div>

          {/* Social (placeholder) */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 border border-[#c9a84c]/15 text-[0.8rem] text-[#aaaaaa] hover:border-[#c9a84c]/40 hover:text-[#f5f0e8] transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-[#c9a84c]/15 text-[0.8rem] text-[#aaaaaa] hover:border-[#c9a84c]/40 hover:text-[#f5f0e8] transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
