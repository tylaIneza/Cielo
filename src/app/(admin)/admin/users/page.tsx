"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, Plus, Edit2, Trash2, Shield, Users, XCircle, Check } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Role } from "@prisma/client";

type UserRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: string;
  joined: string;
};

const USERS: UserRow[] = [
  { id: "U001", name: "Ineza Paccy", email: "inezapaccy4@gmail.com", phone: "0788628417", role: "SUPER_ADMIN", status: "ACTIVE", joined: "Jan 1, 2025" },
  { id: "U002", name: "Alice Mugisha", email: "alice@cielofashion.rw", phone: "0722334455", role: "ADMIN", status: "ACTIVE", joined: "Feb 10, 2025" },
  { id: "U003", name: "John Ndayisaba", email: "john@cielofashion.rw", phone: "0733112233", role: "MANAGER", status: "ACTIVE", joined: "Mar 5, 2025" },
  { id: "U004", name: "Diane Uwase", email: "diane@cielofashion.rw", phone: "0744556677", role: "TAILOR", status: "ACTIVE", joined: "Apr 1, 2025" },
  { id: "U005", name: "Patrick Habimana", email: "patrick@cielofashion.rw", phone: "0755667788", role: "TAILOR", status: "INACTIVE", joined: "May 15, 2025" },
];

const ROLE_CONFIG: Record<Role, { color: string; label: string }> = {
  SUPER_ADMIN: { color: "#c9a84c", label: "Super Admin" },
  ADMIN: { color: "#3b82f6", label: "Admin" },
  MANAGER: { color: "#8b5cf6", label: "Manager" },
  TAILOR: { color: "#1a6b3c", label: "Tailor" },
  CUSTOMER: { color: "#555", label: "Customer" },
};

const ROLES: Role[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "TAILOR", "CUSTOMER"];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "ALL">("ALL");
  const [showInvite, setShowInvite] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = USERS.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <>
      <div className="h-14 border-b border-[#c9a84c]/10 px-6 flex items-center justify-between bg-[#0a0a0a]/60 backdrop-blur-sm sticky top-0 z-10 shrink-0">
        <div>
          <h1 className="font-display text-lg font-semibold text-[#f5f0e8]">User Management</h1>
          <p className="text-[0.65rem] text-[#555]">{USERS.length} staff accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#c9a84c] transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#c9a84c] rounded-full" />
          </button>
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-black text-[0.78rem] font-semibold rounded-sm hover:bg-[#f0d98b] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Invite User
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Role summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {ROLES.map((role) => {
            const cfg = ROLE_CONFIG[role];
            const count = USERS.filter((u) => u.role === role).length;
            return (
              <div key={role} className="glass-dark border border-[#c9a84c]/10 p-3 rounded-sm">
                <p className="font-display text-xl font-bold mb-0.5" style={{ color: cfg.color }}>{count}</p>
                <p className="text-[0.62rem] text-[#555] uppercase tracking-wider">{cfg.label}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#555]" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.82rem] text-[#f5f0e8] placeholder-[#444] focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
            />
          </div>
          <div className="flex gap-1">
            {(["ALL", ...ROLES] as Array<Role | "ALL">).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-2 text-[0.7rem] font-medium rounded-sm transition-colors border ${
                  roleFilter === r
                    ? "bg-[#c9a84c]/10 text-[#c9a84c] border-[#c9a84c]/30"
                    : "border-[#c9a84c]/10 text-[#888] hover:text-[#f5f0e8] hover:bg-white/5"
                }`}
              >
                {r === "ALL" ? "All" : ROLE_CONFIG[r as Role].label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass-dark border border-[#c9a84c]/10 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[0.8rem]">
              <thead>
                <tr className="border-b border-[#c9a84c]/10 bg-[#0a0a0a]/40">
                  {["User", "Email / Phone", "Role", "Status", "Joined", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[0.62rem] text-[#555] uppercase tracking-[0.15em] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => {
                  const roleCfg = ROLE_CONFIG[u.role];
                  return (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-[#c9a84c]/5 hover:bg-white/[0.015] transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[0.72rem] font-bold text-black shrink-0"
                            style={{ background: `linear-gradient(135deg, ${roleCfg.color}80, ${roleCfg.color})` }}
                          >
                            {u.name[0]}
                          </div>
                          <span className="text-[#f5f0e8] font-medium">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-[#aaaaaa]">{u.email}</p>
                        <p className="text-[0.7rem] text-[#555]">{u.phone}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="flex items-center gap-1 w-fit px-2 py-0.5 text-[0.62rem] rounded-sm font-medium uppercase tracking-wider"
                          style={{ background: `${roleCfg.color}18`, color: roleCfg.color }}
                        >
                          <Shield className="w-3 h-3" />
                          {roleCfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`flex items-center gap-1 text-[0.7rem] ${u.status === "ACTIVE" ? "text-[#22a85a]" : "text-[#555]"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.status === "ACTIVE" ? "bg-[#22a85a]" : "bg-[#555]"}`} />
                          {u.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[#555]">{u.joined}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2 justify-end">
                          <button className="p-1.5 text-[#555] hover:text-[#f5f0e8] transition-colors rounded-sm hover:bg-white/10">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {u.role !== "SUPER_ADMIN" && (
                            <button
                              onClick={() => setDeleteId(u.id)}
                              className="p-1.5 text-[#555] hover:text-[#c03030] transition-colors rounded-sm hover:bg-[#c03030]/10"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-14 text-center text-[#555]">
              <Users className="w-7 h-7 mx-auto mb-2 opacity-30" />
              <p className="text-[0.82rem]">No users found</p>
            </div>
          )}
        </div>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-dark border border-[#c9a84c]/20 p-6 rounded-sm w-full max-w-md mx-4"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-semibold text-[#f5f0e8]">Invite Team Member</h3>
              <button onClick={() => setShowInvite(false)} className="text-[#555] hover:text-[#f5f0e8] transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Full Name", type: "text", placeholder: "Jane Doe" },
                { label: "Email", type: "email", placeholder: "jane@cielofashion.rw" },
                { label: "Phone", type: "tel", placeholder: "0788000000" },
              ].map(({ label, type, placeholder }) => (
                <div key={label}>
                  <label className="block text-[0.68rem] text-[#555] uppercase tracking-[0.1em] mb-1.5">{label}</label>
                  <input type={type} placeholder={placeholder}
                    className="w-full px-3 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.82rem] text-[#f5f0e8] placeholder-[#444] focus:outline-none focus:border-[#c9a84c]/40 transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-[0.68rem] text-[#555] uppercase tracking-[0.1em] mb-1.5">Role</label>
                <select className="w-full px-3 py-2.5 bg-[#111] border border-[#c9a84c]/10 rounded-sm text-[0.82rem] text-[#f5f0e8] focus:outline-none focus:border-[#c9a84c]/40 transition-colors">
                  {ROLES.filter((r) => r !== "SUPER_ADMIN" && r !== "CUSTOMER").map((r) => (
                    <option key={r} value={r}>{ROLE_CONFIG[r].label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowInvite(false)} className="flex-1 py-2.5 border border-[#c9a84c]/10 text-[#888] text-[0.8rem] rounded-sm hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button className="flex-1 py-2.5 bg-[#c9a84c] text-black text-[0.8rem] font-semibold rounded-sm hover:bg-[#f0d98b] transition-colors">
                Send Invite
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-dark border border-[#c9a84c]/20 p-6 rounded-sm w-full max-w-sm mx-4">
            <h3 className="font-display text-lg font-semibold text-[#f5f0e8] mb-2">Remove User?</h3>
            <p className="text-[0.8rem] text-[#888] mb-5">This will permanently remove the user and revoke their access.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-[#c9a84c]/10 text-[#888] text-[0.8rem] rounded-sm hover:bg-white/5 transition-colors">Cancel</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-[#8b1a1a]/80 text-[#f5f0e8] text-[0.8rem] rounded-sm hover:bg-[#c03030]/80 transition-colors">Remove</button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
