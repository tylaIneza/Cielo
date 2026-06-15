"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Phone, Lock, User, ArrowRight, CheckCircle } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "",
  });

  const passwordStrength = (p: string) => {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = passwordStrength(formData.password);
  const strengthColors = ["#555", "#8b1a1a", "#c9a84c", "#22a85a", "#22a85a"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="font-display text-3xl font-bold text-[#f5f0e8]">CIELO</span>
            <span className="block text-[0.5rem] tracking-[0.3em] uppercase text-[#c9a84c] -mt-0.5">Fashion Boutique</span>
          </Link>
          <h1 className="font-display text-3xl font-semibold text-[#f5f0e8] mb-2">Create Account</h1>
          <p className="text-[#aaaaaa] text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#c9a84c] hover:text-[#f0d98b] transition-colors">Sign in</Link>
          </p>
        </div>

        <div className="glass-dark border border-[#c9a84c]/15 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {(["firstName", "lastName"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">
                    {field === "firstName" ? "First Name" : "Last Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                    <input
                      type="text"
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      placeholder={field === "firstName" ? "Amara" : "Nkusi"}
                      required
                      className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 pl-10 pr-4 py-3 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/50 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>

            {[
              { key: "email", icon: Mail, type: "email", label: "Email Address", placeholder: "your@email.com" },
              { key: "phone", icon: Phone, type: "tel", label: "Phone Number", placeholder: "+250 7XX XXX XXX" },
            ].map(({ key, icon: Icon, type, label, placeholder }) => (
              <div key={key}>
                <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                  <input
                    type={type}
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 pl-11 pr-4 py-3 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/50 transition-colors"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 pl-11 pr-12 py-3 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/50 transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all" style={{ backgroundColor: i <= strength ? strengthColors[strength] : "#2a2a2a" }} />
                    ))}
                  </div>
                  <p className="text-[0.65rem] text-[#aaaaaa]">{strengthLabels[strength]}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Repeat your password"
                  required
                  className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 pl-11 pr-4 py-3 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/50 transition-colors"
                />
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#22a85a]" />
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 accent-[#c9a84c]" />
              <label htmlFor="terms" className="text-[0.78rem] text-[#aaaaaa] leading-relaxed">
                I agree to Cielo&apos;s{" "}
                <Link href="/terms" className="text-[#c9a84c] hover:text-[#f0d98b] transition-colors">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#c9a84c] hover:text-[#f0d98b] transition-colors">Privacy Policy</Link>.
              </label>
            </div>

            <LuxuryButton type="submit" variant="gold" size="lg" loading={loading} className="w-full">
              Create Account <ArrowRight className="w-4 h-4" />
            </LuxuryButton>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
