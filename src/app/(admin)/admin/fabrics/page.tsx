"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell, Search, Plus, Edit2, Trash2, FileText,
  ArrowUpDown, AlertTriangle,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

type FabricCategory = "African Print" | "Silk" | "Cotton" | "Wool" | "Linen" | "Brocade" | "Lace";

type Fabric = {
  id: string;
  name: string;
  category: FabricCategory;
  origin: string;
  pricePerMeter: number;
  stock: number; // meters
  minOrder: number;
  colors: string[];
  inUse: boolean;
};

const FABRICS: Fabric[] = [
  { id: "F001", name: "Kente Cloth", category: "African Print", origin: "Ghana", pricePerMeter: 45000, stock: 120, minOrder: 2, colors: ["Gold", "Black", "Green"], inUse: true },
  { id: "F002", name: "Ankara Print", category: "African Print", origin: "Nigeria", pricePerMeter: 18000, stock: 280, minOrder: 3, colors: ["Multiple"], inUse: true },
  { id: "F003", name: "Italian Silk", category: "Silk", origin: "Italy", pricePerMeter: 95000, stock: 45, minOrder: 1, colors: ["Ivory", "Black", "Navy"], inUse: true },
  { id: "F004", name: "Mudcloth", category: "African Print", origin: "Mali", pricePerMeter: 32000, stock: 8, minOrder: 1, colors: ["Earth tones"], inUse: true },
  { id: "F005", name: "Kanzure Lace", category: "Lace", origin: "Nigeria", pricePerMeter: 55000, stock: 60, minOrder: 2, colors: ["White", "Champagne"], inUse: true },
  { id: "F006", name: "Gold Brocade", category: "Brocade", origin: "India", pricePerMeter: 72000, stock: 3, minOrder: 2, colors: ["Gold", "Bronze"], inUse: true },
  { id: "F007", name: "Irish Linen", category: "Linen", origin: "Ireland", pricePerMeter: 28000, stock: 150, minOrder: 3, colors: ["Natural", "White", "Sand"], inUse: false },
  { id: "F008", name: "Cashmere Wool", category: "Wool", origin: "Scotland", pricePerMeter: 120000, stock: 22, minOrder: 1, colors: ["Charcoal", "Camel", "Navy"], inUse: true },
];

const CATEGORIES: Array<FabricCategory | "All"> = ["All", "African Print", "Silk", "Cotton", "Wool", "Linen", "Brocade", "Lace"];

export default function FabricsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FabricCategory | "All">("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = FABRICS.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.origin.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || f.category === category;
    return matchSearch && matchCat;
  });

  const lowStock = FABRICS.filter((f) => f.stock < 10).length;
  const totalValue = FABRICS.reduce((sum, f) => sum + f.pricePerMeter * f.stock, 0);

  return (
    <>
      {/* Top bar */}
      <div className="border-b border-[#c9a84c]/10 px-8 py-4 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <h1 className="font-display text-xl font-semibold text-[#f5f0e8]">Fabrics Inventory</h1>
          <p className="text-[0.7rem] text-[#555]">{FABRICS.length} fabric types{lowStock > 0 && ` · ${lowStock} low stock`}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative w-9 h-9 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#c9a84c] rounded-full" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-black text-[0.8rem] font-semibold rounded-sm hover:bg-[#f0d98b] transition-colors">
            <Plus className="w-4 h-4" />
            Add Fabric
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Fabrics", value: FABRICS.length, color: "#c9a84c" },
            { label: "Low Stock", value: lowStock, color: lowStock > 0 ? "#c03030" : "#22a85a" },
            { label: "In Active Use", value: FABRICS.filter((f) => f.inUse).length, color: "#22a85a" },
            { label: "Inventory Value", value: formatPrice(totalValue), color: "#1a6b3c" },
          ].map(({ label, value, color }) => (
            <div key={label} className="glass-dark border border-[#c9a84c]/10 p-4 rounded-sm">
              <p className="font-display text-xl font-bold mb-1" style={{ color }}>{value}</p>
              <p className="text-[0.65rem] text-[#555] uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {lowStock > 0 && (
          <div className="flex items-center gap-3 p-4 mb-6 bg-[#8b1a1a]/10 border border-[#c03030]/20 rounded-sm">
            <AlertTriangle className="w-4 h-4 text-[#c03030] shrink-0" />
            <p className="text-[0.82rem] text-[#c03030]">
              {lowStock} fabric{lowStock > 1 ? "s are" : " is"} running low on stock. Consider reordering soon.
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
            <input
              type="text"
              placeholder="Search fabrics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.85rem] text-[#f5f0e8] placeholder-[#555] focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 text-[0.72rem] font-medium rounded-sm transition-colors border ${
                  category === cat
                    ? "bg-[#c9a84c]/10 text-[#c9a84c] border-[#c9a84c]/30"
                    : "border-[#c9a84c]/10 text-[#aaaaaa] hover:text-[#f5f0e8] hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass-dark border border-[#c9a84c]/10 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[0.82rem]">
              <thead>
                <tr className="border-b border-[#c9a84c]/10 bg-[#0a0a0a]/40">
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-[#c9a84c] transition-colors">
                      Fabric <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Category</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Origin</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Price/m</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Stock (m)</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Colors</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">In Use</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((fabric, i) => (
                  <motion.tr
                    key={fabric.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-[#c9a84c]/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-[#f5f0e8] font-medium">{fabric.name}</p>
                        <p className="text-[0.7rem] text-[#555] font-mono">{fabric.id}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#aaaaaa]">{fabric.category}</td>
                    <td className="px-5 py-4 text-[#aaaaaa]">{fabric.origin}</td>
                    <td className="px-5 py-4 font-semibold text-[#f5f0e8]">{formatPrice(fabric.pricePerMeter)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${fabric.stock < 10 ? "text-[#c03030]" : fabric.stock < 30 ? "text-[#c9a84c]" : "text-[#f5f0e8]"}`}>
                          {fabric.stock}m
                        </span>
                        {fabric.stock < 10 && <AlertTriangle className="w-3.5 h-3.5 text-[#c03030]" />}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {fabric.colors.map((c) => (
                          <span key={c} className="px-1.5 py-0.5 text-[0.6rem] bg-white/5 border border-white/10 rounded-sm text-[#aaaaaa]">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`w-2 h-2 rounded-full inline-block ${fabric.inUse ? "bg-[#22a85a]" : "bg-[#555]"}`} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button className="p-1.5 text-[#555] hover:text-[#f5f0e8] transition-colors rounded-sm hover:bg-white/10">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(fabric.id)}
                          className="p-1.5 text-[#555] hover:text-[#c03030] transition-colors rounded-sm hover:bg-[#c03030]/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-[#555]">
              <FileText className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-[0.85rem]">No fabrics found</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-dark border border-[#c9a84c]/20 p-6 rounded-sm w-full max-w-sm mx-4"
          >
            <h3 className="font-display text-lg font-semibold text-[#f5f0e8] mb-2">Remove Fabric?</h3>
            <p className="text-[0.82rem] text-[#aaaaaa] mb-6">
              Fabric <span className="font-mono text-[#c9a84c]">{deleteId}</span> will be permanently removed from inventory.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-[#c9a84c]/10 text-[#aaaaaa] text-[0.82rem] rounded-sm hover:bg-white/5 transition-colors">Cancel</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-[#8b1a1a]/80 text-[#f5f0e8] text-[0.82rem] rounded-sm hover:bg-[#c03030]/80 transition-colors">Remove</button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
