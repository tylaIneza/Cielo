"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, Plus, Filter, Edit2, Trash2, Eye, Bell, Package,
  ChevronDown, ArrowUpDown,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK";
  image: string;
};

const PRODUCTS: Product[] = [
  { id: "P001", name: "Ankara Wrap Dress", category: "African", price: 85000, stock: 12, status: "ACTIVE", image: "" },
  { id: "P002", name: "Kente Blazer", category: "Men", price: 145000, stock: 7, status: "ACTIVE", image: "" },
  { id: "P003", name: "Silk Evening Gown", category: "Women", price: 320000, stock: 3, status: "ACTIVE", image: "" },
  { id: "P004", name: "Linen Resort Shirt", category: "Men", price: 55000, stock: 0, status: "OUT_OF_STOCK", image: "" },
  { id: "P005", name: "Children Dashiki Set", category: "Kids", price: 38000, stock: 18, status: "ACTIVE", image: "" },
  { id: "P006", name: "Mudcloth Jacket", category: "African", price: 175000, stock: 5, status: "ACTIVE", image: "" },
  { id: "P007", name: "Embroidered Kaftan", category: "Women", price: 210000, stock: 9, status: "DRAFT", image: "" },
  { id: "P008", name: "Batik Trousers", category: "Men", price: 72000, stock: 14, status: "ACTIVE", image: "" },
];

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-[#22a85a]/10 text-[#22a85a]",
  DRAFT: "bg-[#555]/20 text-[#888]",
  OUT_OF_STOCK: "bg-[#8b1a1a]/10 text-[#c03030]",
};

const CATEGORIES = ["All", "African", "Men", "Women", "Kids"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || p.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      {/* Top bar */}
      <div className="border-b border-[#c9a84c]/10 px-8 py-4 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <h1 className="font-display text-xl font-semibold text-[#f5f0e8]">Products</h1>
          <p className="text-[0.7rem] text-[#555]">{PRODUCTS.length} total products</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative w-9 h-9 flex items-center justify-center text-[#aaaaaa] hover:text-[#c9a84c] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#c9a84c] rounded-full" />
          </button>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-black text-[0.8rem] font-semibold rounded-sm hover:bg-[#f0d98b] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.85rem] text-[#f5f0e8] placeholder-[#555] focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2.5 text-[0.78rem] font-medium rounded-sm transition-colors border ${
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
                      Product <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Category</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Price</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Stock</th>
                  <th className="text-left px-5 py-3.5 text-[0.65rem] text-[#555] uppercase tracking-[0.15em] font-medium">Status</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-[#c9a84c]/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm bg-[#1a1a1a] border border-[#c9a84c]/10 flex items-center justify-center shrink-0">
                          <Package className="w-4 h-4 text-[#555]" />
                        </div>
                        <div>
                          <p className="text-[#f5f0e8] font-medium">{product.name}</p>
                          <p className="text-[0.7rem] text-[#555] font-mono">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#aaaaaa]">{product.category}</td>
                    <td className="px-5 py-4 font-semibold text-[#f5f0e8]">{formatPrice(product.price)}</td>
                    <td className="px-5 py-4">
                      <span className={`font-medium ${product.stock === 0 ? "text-[#c03030]" : product.stock < 5 ? "text-[#c9a84c]" : "text-[#f5f0e8]"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 text-[0.65rem] rounded-sm font-medium uppercase tracking-wider ${STATUS_STYLES[product.status]}`}>
                        {product.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button className="p-1.5 text-[#555] hover:text-[#c9a84c] transition-colors rounded-sm hover:bg-[#c9a84c]/10">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-[#555] hover:text-[#f5f0e8] transition-colors rounded-sm hover:bg-white/10">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(product.id)}
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
              <Package className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-[0.85rem]">No products found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-[0.78rem] text-[#555]">
          <span>Showing {filtered.length} of {PRODUCTS.length} products</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded-sm transition-colors ${page === 1 ? "bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30" : "hover:bg-white/5 text-[#aaaaaa]"}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-dark border border-[#c9a84c]/20 p-6 rounded-sm w-full max-w-sm mx-4"
          >
            <h3 className="font-display text-lg font-semibold text-[#f5f0e8] mb-2">Delete Product?</h3>
            <p className="text-[0.82rem] text-[#aaaaaa] mb-6">
              This action cannot be undone. Product <span className="font-mono text-[#c9a84c]">{deleteId}</span> will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-[#c9a84c]/10 text-[#aaaaaa] text-[0.82rem] rounded-sm hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 bg-[#8b1a1a]/80 text-[#f5f0e8] text-[0.82rem] rounded-sm hover:bg-[#c03030]/80 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
