"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, X, ShieldCheck, Mail, Lock, User as UserIcon, Calendar, CheckCircle2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null, email: "", loading: false });
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const fetchUsers = () => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((d) => {
        setUsers(d.users || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create admin user");
        setSaving(false);
        return;
      }

      setShowModal(false);
      setForm({ name: "", email: "", password: "", role: "admin" });
      setSaving(false);
      fetchUsers();
    } catch {
      setError("Network error while creating user");
      setSaving(false);
    }
  };

  const promptDeleteUser = (id, email) => {
    if (email === "admin@luminous.com") {
      alert("Cannot delete the root admin user!");
      return;
    }
    setDeleteDialog({ isOpen: true, id, email, loading: false });
  };

  const handleConfirmDeleteUser = async () => {
    if (!deleteDialog.id) return;
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch(`/api/users/${deleteDialog.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to delete user");
        setDeleteDialog({ isOpen: false, id: null, email: "", loading: false });
        return;
      }
      setDeleteDialog({ isOpen: false, id: null, email: "", loading: false });
      fetchUsers();
    } catch {
      alert("Error deleting user");
      setDeleteDialog({ isOpen: false, id: null, email: "", loading: false });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Admin Team & Access
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Add team members and assign login credentials to access the clinic admin console
          </p>
        </div>
        <button
          onClick={() => {
            setError("");
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EC9C9D] via-[#F0A5A2] to-[#D97E80] text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-md shadow-[#EC9C9D]/20 hover:opacity-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-[#161412] border border-neutral-800/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800/80 bg-neutral-900/40">
                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">User</th>
                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Email</th>
                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Role</th>
                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold hidden md:table-cell">Created</th>
                <th className="text-right px-6 py-4 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-xs text-neutral-500">Loading authorized users...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-xs text-neutral-500">No users found.</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-neutral-800/25 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EC9C9D]/15 border border-[#EC9C9D]/30 flex items-center justify-center text-xs font-bold text-[#F0A5A2]">
                          {u.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{u.name}</p>
                          <span className="text-[10px] text-neutral-500">Authorized Personnel</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-neutral-300 font-mono">{u.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-3 py-1 rounded-full bg-[#EC9C9D]/15 text-[#EC9C9D] border border-[#EC9C9D]/25 uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{u.role || "Admin"}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs text-neutral-400">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {u.email !== "admin@luminous.com" ? (
                        <button
                          onClick={() => promptDeleteUser(u._id, u.email)}
                          className="p-2 rounded-xl text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Revoke access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-neutral-600 font-mono uppercase px-2 py-1 bg-neutral-900 rounded">
                          Root Admin
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#161412] border border-neutral-800 rounded-3xl w-full max-w-md p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Create Admin User</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Assign login credentials for the admin portal</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-neutral-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Full Name *</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Dr. Sarah Khan"
                    className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="sarah@luminous.com"
                    className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••••••"
                    className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D] appearance-none"
                >
                  <option value="admin">Admin (Full Access)</option>
                  <option value="manager">Clinic Manager</option>
                  <option value="staff">Consultant Staff</option>
                </select>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-[#EC9C9D] to-[#D97E80] hover:opacity-95 disabled:opacity-50 transition-all"
                >
                  {saving ? "Creating..." : "Save User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Revoke User Access?"
        message={`Are you sure you want to remove administrator access for ${deleteDialog.email}?`}
        confirmText="Revoke Access"
        loading={deleteDialog.loading}
        onConfirm={handleConfirmDeleteUser}
        onClose={() => setDeleteDialog({ isOpen: false, id: null, email: "", loading: false })}
      />
    </div>
  );
}
