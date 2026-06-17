"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

type LoginMode = "email" | "phone";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/admin";

  const [mode, setMode] = useState<LoginMode>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn(
      mode === "email" ? "email-password" : "phone-password",
      {
        ...(mode === "email" ? { email } : { phone }),
        password,
        redirect: false,
      }
    );

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-[#f5f0e8] tracking-widest uppercase">
            Cielo
          </h1>
          <p className="text-[0.65rem] text-[#c9a84c] tracking-[0.4em] uppercase mt-1">
            Admin Portal
          </p>
        </div>

        <div className="glass-dark border border-[#c9a84c]/15 rounded-sm p-8">
          <h2 className="text-lg font-semibold text-[#f5f0e8] mb-1">Sign In</h2>
          <p className="text-[0.78rem] text-[#555] mb-6">Enter your credentials to access the dashboard</p>

          {/* Mode toggle */}
          <div className="flex gap-1 mb-6 p-1 bg-[#111] rounded-sm">
            {(["email", "phone"] as LoginMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-[0.78rem] font-medium rounded-sm transition-all ${
                  mode === m
                    ? "bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30"
                    : "text-[#555] hover:text-[#aaaaaa]"
                }`}
              >
                {m === "email" ? <Mail className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                {m === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "email" ? (
              <div>
                <label className="block text-[0.72rem] text-[#555] uppercase tracking-[0.1em] mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@cielofashion.rw"
                    className="w-full pl-10 pr-4 py-3 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.85rem] text-[#f5f0e8] placeholder-[#444] focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-[0.72rem] text-[#555] uppercase tracking-[0.1em] mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="0788628417"
                    className="w-full pl-10 pr-4 py-3 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.85rem] text-[#f5f0e8] placeholder-[#444] focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[0.72rem] text-[#555] uppercase tracking-[0.1em]">Password</label>
                <a href="/forgot-password" className="text-[0.72rem] text-[#c9a84c] hover:text-[#f0d98b] transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.85rem] text-[#f5f0e8] placeholder-[#444] focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#aaaaaa] transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-[#8b1a1a]/20 border border-[#c03030]/20 rounded-sm text-[0.8rem] text-[#c03030]"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#c9a84c] text-black font-semibold text-[0.85rem] rounded-sm hover:bg-[#f0d98b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-[0.72rem] text-[#333] mt-6">
          Cielo Fashion Admin · Kigali, Rwanda
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <LoginForm />
    </Suspense>
  );
}
