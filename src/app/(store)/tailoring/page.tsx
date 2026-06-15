"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Plus, X, ChevronRight, Scissors, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SectionHeader } from "@/components/ui/section-header";
import { FABRIC_TYPES } from "@/constants";

const STEPS = [
  { number: 1, label: "Garment Type" },
  { number: 2, label: "Inspiration" },
  { number: 3, label: "Fabric & Color" },
  { number: 4, label: "Measurements" },
  { number: 5, label: "Delivery & Notes" },
  { number: 6, label: "Confirm" },
];

const GARMENT_TYPES = [
  { id: "dress", label: "Dress", icon: "👗" },
  { id: "suit", label: "Suit", icon: "🤵" },
  { id: "skirt", label: "Skirt", icon: "👘" },
  { id: "blouse", label: "Blouse", icon: "👚" },
  { id: "kaftan", label: "Kaftan", icon: "🧖" },
  { id: "jumpsuit", label: "Jumpsuit", icon: "🩱" },
  { id: "trouser", label: "Trousers", icon: "👖" },
  { id: "jacket", label: "Jacket", icon: "🧥" },
  { id: "kids", label: "Kids Wear", icon: "🧒" },
  { id: "wedding", label: "Wedding Wear", icon: "💍" },
  { id: "traditional", label: "Traditional", icon: "🎋" },
  { id: "other", label: "Other", icon: "✨" },
];

const COLORS_PALETTE = [
  "#1a6b3c", "#c9a84c", "#0a0a0a", "#f5f0e8",
  "#8b1a1a", "#1a3b6b", "#8b4513", "#4a1a6b",
  "#ff6b6b", "#4ecdc4", "#f7dc6f", "#a8e6cf",
];

export default function TailoringPage() {
  const [step, setStep] = useState(1);
  const [garmentType, setGarmentType] = useState("");
  const [selectedFabric, setSelectedFabric] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [inspirationImages, setInspirationImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [measurements, setMeasurements] = useState({
    chest: "", waist: "", hips: "", shoulder: "", sleeveLength: "",
    backLength: "", height: "", inseam: "",
  });
  const [deliveryDate, setDeliveryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => setStep((s) => Math.min(s + 1, 6));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-md mx-auto px-6"
          >
            <div className="w-20 h-20 rounded-full bg-[#1a6b3c]/20 border border-[#1a6b3c]/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#22a85a]" />
            </div>
            <h2 className="font-display text-3xl font-semibold text-[#f5f0e8] mb-4">
              Request Submitted!
            </h2>
            <p className="text-[#aaaaaa] leading-relaxed mb-8">
              Thank you for your tailoring request. Our team will review your specifications
              and send you a quotation within 24 hours. You can track your request in your
              account dashboard.
            </p>
            <div className="glass-emerald p-4 rounded-sm mb-8">
              <p className="text-[0.75rem] text-[#22a85a] font-medium uppercase tracking-wider mb-1">
                Request Reference
              </p>
              <p className="font-display text-2xl text-[#f5f0e8] font-bold">
                CF-TAI-{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
            </div>
            <LuxuryButton variant="gold" size="lg" onClick={() => { setSubmitted(false); setStep(1); }}>
              Submit Another Request
            </LuxuryButton>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] py-8 pb-24">
        {/* Hero Banner */}
        <div className="relative h-48 overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#1a6b3c]/20 to-[#0a0a0a]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-[0.65rem] text-[#c9a84c] uppercase tracking-[0.35em]">Custom Atelier</span>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#f5f0e8] mt-2 flex items-center justify-center gap-3">
                <Scissors className="w-8 h-8 text-[#c9a84c]" />
                Bespoke Tailoring
              </h1>
              <p className="text-[#aaaaaa] text-sm mt-2">Crafted to your exact measurements and vision</p>
            </div>
          </div>
        </div>

        <div className="container-luxury">
          {/* Step Progress */}
          <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2">
            <div className="flex items-center gap-0 min-w-max">
              {STEPS.map((s, index) => (
                <div key={s.number} className="flex items-center">
                  <button
                    onClick={() => step > s.number && setStep(s.number)}
                    className={`flex flex-col items-center gap-1.5 group ${step > s.number ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[0.75rem] font-bold transition-all ${
                      step === s.number
                        ? "bg-gradient-to-r from-[#8f6f2a] to-[#c9a84c] text-black shadow-[0_0_20px_rgba(201,168,76,0.4)]"
                        : step > s.number
                        ? "bg-[#1a6b3c] text-white"
                        : "bg-[#1a1a1a] text-[#555] border border-[#c9a84c]/15"
                    }`}>
                      {step > s.number ? <CheckCircle className="w-4 h-4" /> : s.number}
                    </div>
                    <span className={`text-[0.6rem] uppercase tracking-wider whitespace-nowrap ${
                      step === s.number ? "text-[#c9a84c]" : step > s.number ? "text-[#22a85a]" : "text-[#555]"
                    }`}>
                      {s.label}
                    </span>
                  </button>
                  {index < STEPS.length - 1 && (
                    <div className={`h-px w-12 mx-2 mt-[-12px] transition-colors ${step > s.number ? "bg-[#1a6b3c]" : "bg-[#c9a84c]/15"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              {step === 1 && (
                <div>
                  <SectionHeader eyebrow="Step 1 of 6" title="What would you like us to create?" align="center" className="mb-10" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {GARMENT_TYPES.map((g) => (
                      <motion.button
                        key={g.id}
                        whileHover={{ scale: 1.03, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setGarmentType(g.id)}
                        className={`flex flex-col items-center gap-3 p-6 border rounded-sm transition-all ${
                          garmentType === g.id
                            ? "border-[#c9a84c] bg-[#c9a84c]/10 shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                            : "border-[#c9a84c]/15 hover:border-[#c9a84c]/40 glass"
                        }`}
                      >
                        <span className="text-3xl">{g.icon}</span>
                        <span className="text-[0.8rem] font-medium text-[#f5f0e8]">{g.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <SectionHeader eyebrow="Step 2 of 6" title="Show us your inspiration" subtitle="Upload images, sketches, or photos that inspire your vision. The more you share, the better we can bring it to life." align="center" className="mb-10" />
                  <div className="border-2 border-dashed border-[#c9a84c]/25 p-12 text-center mb-6 hover:border-[#c9a84c]/50 transition-colors cursor-pointer group">
                    <Upload className="w-10 h-10 text-[#c9a84c]/50 group-hover:text-[#c9a84c] mx-auto mb-4 transition-colors" />
                    <p className="text-[#aaaaaa] text-sm mb-1">Drop images here or click to upload</p>
                    <p className="text-[#555] text-xs">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                  <div>
                    <p className="text-[0.75rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-3">Describe Your Vision</p>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the style, occasion, special requirements, cultural influences... Any detail helps our tailors understand your vision."
                      rows={5}
                      className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 p-4 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40 transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <SectionHeader eyebrow="Step 3 of 6" title="Choose your fabric & color" align="center" className="mb-10" />
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[0.75rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-4">Fabric Type</p>
                      <div className="space-y-2">
                        {FABRIC_TYPES.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setSelectedFabric(f.id)}
                            className={`w-full flex items-center justify-between p-4 border transition-all text-left ${
                              selectedFabric === f.id
                                ? "border-[#c9a84c] bg-[#c9a84c]/8"
                                : "border-[#c9a84c]/15 hover:border-[#c9a84c]/35"
                            }`}
                          >
                            <div>
                              <p className="text-[0.9rem] font-medium text-[#f5f0e8]">{f.name}</p>
                              <p className="text-[0.7rem] text-[#555]">{f.origin}</p>
                            </div>
                            {selectedFabric === f.id && (
                              <CheckCircle className="w-5 h-5 text-[#c9a84c]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[0.75rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-4">Color Preference</p>
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        {COLORS_PALETTE.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-full aspect-square rounded-sm border-2 transition-all ${
                              selectedColor === color ? "border-white scale-110" : "border-transparent hover:border-white/50"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder="Custom color (#hex or describe)"
                          className="flex-1 bg-[#1a1a1a] border border-[#c9a84c]/15 px-4 py-2.5 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <SectionHeader eyebrow="Step 4 of 6" title="Your measurements" subtitle="For the perfect fit. All measurements in centimeters. Not sure? Our team can guide you." align="center" className="mb-10" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    {Object.entries(measurements).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-[0.7rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">
                          {key.replace(/([A-Z])/g, " $1").trim()} <span className="text-[#555]">(cm)</span>
                        </label>
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => setMeasurements({ ...measurements, [key]: e.target.value })}
                          placeholder="e.g. 90"
                          className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 px-4 py-3 text-[0.9rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 glass-emerald p-4 rounded-sm border border-[#1a6b3c]/30">
                    <p className="text-[0.8rem] text-[#22a85a]">
                      💡 <strong>Tip:</strong> If you&apos;re unsure about measurements, don&apos;t worry —
                      leave fields blank and our team will arrange a virtual or in-person fitting.
                    </p>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <SectionHeader eyebrow="Step 5 of 6" title="Delivery & additional notes" align="center" className="mb-10" />
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[0.75rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">
                        Desired Delivery Date
                      </label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 px-4 py-3 text-[0.9rem] text-[#f5f0e8] outline-none focus:border-[#c9a84c]/40 transition-colors"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-[0.75rem] text-[#aaaaaa] uppercase tracking-[0.15em] mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any special requirements, cultural elements, embroidery preferences, lining preferences, or other details..."
                        rows={6}
                        className="w-full bg-[#1a1a1a] border border-[#c9a84c]/15 p-4 text-[0.85rem] text-[#f5f0e8] placeholder-[#555] outline-none focus:border-[#c9a84c]/40 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div>
                  <SectionHeader eyebrow="Step 6 of 6" title="Confirm your request" subtitle="Review your tailoring specifications before submitting to our atelier team." align="center" className="mb-10" />
                  <div className="space-y-4">
                    {[
                      { label: "Garment Type", value: GARMENT_TYPES.find(g => g.id === garmentType)?.label || "Not selected" },
                      { label: "Fabric", value: FABRIC_TYPES.find(f => f.id === selectedFabric)?.name || "Not selected" },
                      { label: "Color", value: selectedColor || "To be discussed" },
                      { label: "Desired Delivery", value: deliveryDate || "Flexible" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between py-3 border-b border-[#c9a84c]/10">
                        <span className="text-[0.8rem] text-[#aaaaaa] uppercase tracking-wider">{label}</span>
                        <span className="text-[0.9rem] text-[#f5f0e8] font-medium">{value}</span>
                      </div>
                    ))}
                    {notes && (
                      <div className="pt-2">
                        <p className="text-[0.75rem] text-[#aaaaaa] uppercase tracking-wider mb-2">Notes</p>
                        <p className="text-[0.85rem] text-[#f5f0e8]">{notes}</p>
                      </div>
                    )}
                    <div className="glass-gold p-4 rounded-sm mt-6">
                      <p className="text-[0.8rem] text-[#c9a84c]">
                        ✨ After submission, our team will review your request and send a detailed
                        quotation within <strong>24 hours</strong>. No payment required until you approve the quote.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 max-w-3xl mx-auto">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 py-3 border border-[#c9a84c]/20 text-[#aaaaaa] text-[0.8rem] uppercase tracking-[0.15em] hover:border-[#c9a84c]/50 hover:text-[#f5f0e8] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Back
            </button>
            {step < 6 ? (
              <LuxuryButton variant="gold" onClick={handleNext} disabled={step === 1 && !garmentType}>
                Continue <ChevronRight className="w-4 h-4" />
              </LuxuryButton>
            ) : (
              <LuxuryButton variant="emerald" size="lg" onClick={handleSubmit}>
                <Scissors className="w-4 h-4" />
                Submit Tailoring Request
              </LuxuryButton>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
