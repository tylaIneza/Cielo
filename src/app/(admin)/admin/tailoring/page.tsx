"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell, Scissors, Search, Eye, XCircle, Clock,
  CheckCircle, AlertCircle, Ruler, Calendar,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

type TailoringStatus = "INQUIRY" | "QUOTED" | "IN_PROGRESS" | "FITTING" | "COMPLETED" | "CANCELLED";

type TailoringRequest = {
  id: string;
  customer: string;
  email: string;
  garment: string;
  fabric: string;
  budget: number;
  status: TailoringStatus;
  submitted: string;
  deadline: string;
  notes: string;
};

const REQUESTS: TailoringRequest[] = [
  { id: "TL-001", customer: "Grace Uwimana", email: "grace@email.com", garment: "Wedding Gown", fabric: "Silk & Lace", budget: 850000, status: "IN_PROGRESS", submitted: "Jun 1, 2026", deadline: "Jun 28, 2026", notes: "Ivory silk with intricate Rwandan bead embroidery on bodice." },
  { id: "TL-002", customer: "Amara Nkusi", email: "amara@email.com", garment: "Tailored Suit", fabric: "Italian Wool", budget: 420000, status: "FITTING", submitted: "Jun 5, 2026", deadline: "Jun 22, 2026", notes: "3-piece charcoal grey. Second fitting scheduled." },
  { id: "TL-003", customer: "Sophie Laurent", email: "sophie@email.com", garment: "Evening Dress", fabric: "Ankara Print", budget: 280000, status: "QUOTED", submitted: "Jun 10, 2026", deadline: "Jul 5, 2026", notes: "Traditional Ankara with modern silhouette." },
  { id: "TL-004", customer: "Jean-Pierre H.", email: "jp@email.com", garment: "Agbada Set", fabric: "Damask", budget: 580000, status: "INQUIRY", submitted: "Jun 14, 2026", deadline: "Jul 15, 2026", notes: "Royal blue damask. Requires consultation." },
  { id: "TL-005", customer: "Fatima Diallo", email: "fatima@email.com", garment: "Kente Dress", fabric: "Kente Cloth", budget: 350000, status: "COMPLETED", submitted: "May 20, 2026", deadline: "Jun 10, 2026", notes: "Traditional Kente with contemporary cut." },
  { id: "TL-006", customer: "Aisha Traore", email: "aisha@email.com", garment: "Bridal Kaftan", fabric: "Gold Brocade", budget: 680000, status: "IN_PROGRESS", submitted: "Jun 3, 2026", deadline: "Jun 30, 2026", notes: "Gold and ivory brocade with hand-stitched details." },
];

const STATUS_CONFIG: Record<TailoringStatus, { color: string; label: string; icon: typeof Scissors }> = {
  INQUIRY: { color: "#888", label: "Inquiry", icon: AlertCircle },
  QUOTED: { color: "#3b82f6", label: "Quoted", icon: Clock },
  IN_PROGRESS: { color: "#c9a84c", label: "In Progress", icon: Scissors },
  FITTING: { color: "#8b5cf6", label: "Fitting", icon: Ruler },
  COMPLETED: { color: "#22a85a", label: "Completed", icon: CheckCircle },
  CANCELLED: { color: "#c03030", label: "Cancelled", icon: XCircle },
};

const STATUSES: Array<TailoringStatus | "ALL"> = ["ALL", "INQUIRY", "QUOTED", "IN_PROGRESS", "FITTING", "COMPLETED"];

export default function TailoringPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TailoringStatus | "ALL">("ALL");
  const [selected, setSelected] = useState<TailoringRequest | null>(null);

  const filtered = REQUESTS.filter((r) => {
    const matchSearch =
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.garment.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const activeCount = REQUESTS.filter((r) => r.status === "IN_PROGRESS" || r.status === "FITTING").length;
  const pendingRevenue = REQUESTS.filter((r) => r.status !== "COMPLETED" && r.status !== "CANCELLED").reduce((s, r) => s + r.budget, 0);

  return (
    <>
      {/* Top bar */}
      <div className="border-b border-[#c9a84c]/10 px-8 py-4 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <h1 className="font-display text-xl font-semibold text-[#f5f0e8]">Tailoring Requests</h1>
          <p className="text-[0.7rem] text-[#555]">{REQUESTS.length} total requests · {activeCount} active</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative w-9 h-9 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#c9a84c] rounded-full" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a6b3c] to-[#c9a84c] flex items-center justify-center text-[0.8rem] font-bold text-black">A</div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Active Projects", value: activeCount, color: "#c9a84c" },
            { label: "Pending Quotes", value: REQUESTS.filter((r) => r.status === "INQUIRY").length, color: "#888" },
            { label: "Completed", value: REQUESTS.filter((r) => r.status === "COMPLETED").length, color: "#22a85a" },
            { label: "Pending Revenue", value: formatPrice(pendingRevenue), color: "#1a6b3c" },
          ].map(({ label, value, color }) => (
            <div key={label} className="glass-dark border border-[#c9a84c]/10 p-4 rounded-sm">
              <p className="font-display text-xl font-bold mb-1" style={{ color }}>{value}</p>
              <p className="text-[0.65rem] text-[#555] uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
            <input
              type="text"
              placeholder="Search requests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.85rem] text-[#f5f0e8] placeholder-[#555] focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 text-[0.72rem] font-medium rounded-sm transition-colors border ${
                  statusFilter === s
                    ? "bg-[#c9a84c]/10 text-[#c9a84c] border-[#c9a84c]/30"
                    : "border-[#c9a84c]/10 text-[#aaaaaa] hover:text-[#f5f0e8] hover:bg-white/5"
                }`}
              >
                {s === "ALL" ? "All" : STATUS_CONFIG[s as TailoringStatus].label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((req, i) => {
            const cfg = STATUS_CONFIG[req.status];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-dark border border-[#c9a84c]/10 rounded-sm p-5 hover:border-[#c9a84c]/25 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-mono text-[0.75rem] text-[#c9a84c] mb-1">{req.id}</p>
                    <h3 className="font-display text-[0.95rem] font-semibold text-[#f5f0e8]">{req.garment}</h3>
                    <p className="text-[0.75rem] text-[#555]">{req.fabric}</p>
                  </div>
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 text-[0.65rem] rounded-sm font-medium uppercase tracking-wider"
                    style={{ backgroundColor: `${cfg.color}18`, color: cfg.color }}
                  >
                    <Icon className="w-3 h-3" />
                    {cfg.label}
                  </span>
                </div>

                <div className="border-t border-[#c9a84c]/10 pt-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-[0.7rem] font-bold text-[#c9a84c]">
                      {req.customer[0]}
                    </div>
                    <div>
                      <p className="text-[0.8rem] text-[#f5f0e8]">{req.customer}</p>
                      <p className="text-[0.65rem] text-[#555]">{req.email}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-[0.75rem]">
                  <div>
                    <p className="text-[#555] mb-0.5 flex items-center gap-1"><Calendar className="w-3 h-3" /> Submitted</p>
                    <p className="text-[#aaaaaa]">{req.submitted}</p>
                  </div>
                  <div>
                    <p className="text-[#555] mb-0.5 flex items-center gap-1"><Clock className="w-3 h-3" /> Deadline</p>
                    <p className="text-[#aaaaaa]">{req.deadline}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-display font-bold text-[#c9a84c]">{formatPrice(req.budget)}</p>
                  <button
                    onClick={() => setSelected(req)}
                    className="flex items-center gap-1.5 text-[0.75rem] text-[#555] hover:text-[#c9a84c] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Details
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-[#555]">
            <Scissors className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-[0.85rem]">No tailoring requests found</p>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-end z-50">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-full max-w-md h-full glass-dark border-l border-[#c9a84c]/20 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold text-[#f5f0e8]">Request Details</h2>
              <button onClick={() => setSelected(null)} className="text-[#555] hover:text-[#f5f0e8] transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {[
                { label: "Request ID", value: selected.id, mono: true },
                { label: "Customer", value: selected.customer },
                { label: "Email", value: selected.email },
                { label: "Garment Type", value: selected.garment },
                { label: "Fabric", value: selected.fabric },
                { label: "Budget", value: formatPrice(selected.budget) },
                { label: "Submitted", value: selected.submitted },
                { label: "Deadline", value: selected.deadline },
              ].map(({ label, value, mono }) => (
                <div key={label}>
                  <p className="text-[0.65rem] text-[#555] uppercase tracking-[0.15em] mb-1">{label}</p>
                  <p className={`${mono ? "font-mono text-[#c9a84c]" : "text-[#f5f0e8]"}`}>{value}</p>
                </div>
              ))}

              <div>
                <p className="text-[0.65rem] text-[#555] uppercase tracking-[0.15em] mb-1">Notes</p>
                <p className="text-[#aaaaaa] text-[0.82rem] leading-relaxed">{selected.notes}</p>
              </div>

              <div>
                <p className="text-[0.65rem] text-[#555] uppercase tracking-[0.15em] mb-2">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["QUOTED", "IN_PROGRESS", "FITTING", "COMPLETED"] as TailoringStatus[]).map((s) => (
                    <button
                      key={s}
                      className="py-2 text-[0.72rem] border border-[#c9a84c]/10 rounded-sm text-[#aaaaaa] hover:border-[#c9a84c]/30 hover:text-[#c9a84c] transition-colors"
                    >
                      {STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
