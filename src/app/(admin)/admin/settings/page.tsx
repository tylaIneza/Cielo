"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Save, Globe, Mail, CreditCard, Shield, Store, Check } from "lucide-react";

const SECTIONS = [
  { id: "general", label: "General", icon: Store },
  { id: "email", label: "Email / SMTP", icon: Mail },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
  { id: "localization", label: "Localization", icon: Globe },
];

export default function SettingsPage() {
  const [active, setActive] = useState("general");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <div className="h-14 border-b border-[#c9a84c]/10 px-6 flex items-center justify-between bg-[#0a0a0a]/60 backdrop-blur-sm sticky top-0 z-10 shrink-0">
        <div>
          <h1 className="font-display text-lg font-semibold text-[#f5f0e8]">Settings</h1>
          <p className="text-[0.65rem] text-[#555]">Configure your store settings</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#c9a84c] transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-black text-[0.78rem] font-semibold rounded-sm hover:bg-[#f0d98b] transition-colors"
          >
            {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="flex gap-6">
          {/* Sidebar nav */}
          <div className="w-48 shrink-0">
            <div className="glass-dark border border-[#c9a84c]/10 rounded-sm overflow-hidden">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 text-[0.78rem] font-medium transition-all text-left border-b border-[#c9a84c]/5 last:border-0 ${
                    active === id
                      ? "bg-[#c9a84c]/10 text-[#c9a84c] border-l-2 border-l-[#c9a84c]"
                      : "text-[#888] hover:bg-white/5 hover:text-[#f5f0e8]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 max-w-xl">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="glass-dark border border-[#c9a84c]/10 rounded-sm p-6"
            >
              {active === "general" && (
                <div className="space-y-5">
                  <h2 className="font-display text-base font-semibold text-[#f5f0e8] mb-4">General Settings</h2>
                  {[
                    { label: "Site Name", value: "Cielo Fashion" },
                    { label: "Tagline", value: "Luxury African Fashion, Made in Rwanda" },
                    { label: "Contact Email", value: "info@cielofashion.rw" },
                    { label: "Contact Phone", value: "+250 788 628 417" },
                    { label: "Address", value: "KG 7 Ave, Kigali, Rwanda" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="block text-[0.68rem] text-[#555] uppercase tracking-[0.1em] mb-1.5">{label}</label>
                      <input defaultValue={value}
                        className="w-full px-3 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.82rem] text-[#f5f0e8] focus:outline-none focus:border-[#c9a84c]/40 transition-colors" />
                    </div>
                  ))}
                </div>
              )}

              {active === "email" && (
                <div className="space-y-5">
                  <h2 className="font-display text-base font-semibold text-[#f5f0e8] mb-4">Email / SMTP</h2>
                  {[
                    { label: "SMTP Host", value: "smtp.gmail.com" },
                    { label: "SMTP Port", value: "587" },
                    { label: "SMTP User", value: "" },
                    { label: "SMTP Password", value: "" },
                    { label: "From Address", value: "Cielo Fashion <no-reply@cielofashion.rw>" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="block text-[0.68rem] text-[#555] uppercase tracking-[0.1em] mb-1.5">{label}</label>
                      <input
                        type={label.includes("Password") ? "password" : "text"}
                        defaultValue={value}
                        className="w-full px-3 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.82rem] text-[#f5f0e8] focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              )}

              {active === "payment" && (
                <div className="space-y-5">
                  <h2 className="font-display text-base font-semibold text-[#f5f0e8] mb-4">Payment Settings</h2>
                  <div>
                    <label className="block text-[0.68rem] text-[#555] uppercase tracking-[0.1em] mb-1.5">Currency</label>
                    <select className="w-full px-3 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.82rem] text-[#f5f0e8] focus:outline-none focus:border-[#c9a84c]/40 transition-colors">
                      <option value="RWF">RWF — Rwandan Franc</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                    </select>
                  </div>
                  {["Flutterwave Public Key", "Flutterwave Secret Key", "MTN Mobile Money Number"].map((label) => (
                    <div key={label}>
                      <label className="block text-[0.68nm] text-[#555] uppercase tracking-[0.1em] mb-1.5">{label}</label>
                      <input type="text" className="w-full px-3 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.82rem] text-[#f5f0e8] focus:outline-none focus:border-[#c9a84c]/40 transition-colors" />
                    </div>
                  ))}
                </div>
              )}

              {active === "security" && (
                <div className="space-y-5">
                  <h2 className="font-display text-base font-semibold text-[#f5f0e8] mb-4">Security</h2>
                  {[
                    { label: "Require email verification", checked: true },
                    { label: "Enable two-factor authentication", checked: false },
                    { label: "Auto-suspend inactive accounts", checked: false },
                  ].map(({ label, checked }) => (
                    <label key={label} className="flex items-center justify-between cursor-pointer">
                      <span className="text-[0.82rem] text-[#aaaaaa]">{label}</span>
                      <button
                        role="switch"
                        aria-checked={checked}
                        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-[#c9a84c]" : "bg-[#333]"}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
                    </label>
                  ))}
                  <div>
                    <label className="block text-[0.68rem] text-[#555] uppercase tracking-[0.1em] mb-1.5">Session Timeout (hours)</label>
                    <input type="number" defaultValue={24}
                      className="w-full px-3 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.82rem] text-[#f5f0e8] focus:outline-none focus:border-[#c9a84c]/40 transition-colors" />
                  </div>
                </div>
              )}

              {active === "localization" && (
                <div className="space-y-5">
                  <h2 className="font-display text-base font-semibold text-[#f5f0e8] mb-4">Localization</h2>
                  {[
                    { label: "Timezone", options: ["Africa/Kigali", "UTC", "Europe/Paris"] },
                    { label: "Language", options: ["English", "French", "Kinyarwanda"] },
                    { label: "Date Format", options: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"] },
                  ].map(({ label, options }) => (
                    <div key={label}>
                      <label className="block text-[0.68rem] text-[#555] uppercase tracking-[0.1em] mb-1.5">{label}</label>
                      <select className="w-full px-3 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.82rem] text-[#f5f0e8] focus:outline-none focus:border-[#c9a84c]/40 transition-colors">
                        {options.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
