"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, Eye, XCircle, ChevronDown, Phone, Mail, Calendar, Clock } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

const STATUS_OPTIONS = ["New", "In Progress", "Confirmed", "Completed", "Cancelled"];

const statusStyles = {
  New: "bg-[#EC9C9D]/15 text-[#EC9C9D] border-[#EC9C9D]/30",
  "In Progress": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Completed: "bg-green-500/15 text-green-400 border-green-500/30",
  Cancelled: "bg-neutral-500/15 text-neutral-400 border-neutral-500/30",
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null, name: "", loading: false });

  const fetchEnquiries = () => {
    fetch("/api/enquiries")
      .then((r) => r.json())
      .then((d) => { setEnquiries(d.enquiries || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const updateStatus = async (id, status) => {
    await fetch(`/api/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchEnquiries();
  };

  const promptDeleteEnquiry = (eq) => {
    setDeleteDialog({
      isOpen: true,
      id: eq._id,
      name: eq.name || "this client",
      loading: false,
    });
  };

  const handleConfirmDeleteEnquiry = async () => {
    if (!deleteDialog.id) return;
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    try {
      await fetch(`/api/enquiries/${deleteDialog.id}`, { method: "DELETE" });
      setSelected(null);
      fetchEnquiries();
    } finally {
      setDeleteDialog({ isOpen: false, id: null, name: "", loading: false });
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchSearch =
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.phone?.toLowerCase().includes(search.toLowerCase()) ||
      e.referenceId?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Enquiries & Bookings
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">Manage patient consultation requests and appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#161412] border border-neutral-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#EC9C9D]/60 w-48 sm:w-60 transition-colors"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#161412] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#EC9C9D]/60 appearance-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-[#161412] border border-neutral-800/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800/80 bg-neutral-900/40">
                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Patient</th>
                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold hidden sm:table-cell">Treatment Request</th>
                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold hidden md:table-cell">Received</th>
                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Status</th>
                <th className="text-right px-6 py-4 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-xs text-neutral-500">Loading enquiries...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-xs text-neutral-500">No records found matching your filters.</td></tr>
              ) : (
                filtered.map((eq) => (
                  <tr key={eq._id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-white">{eq.name}</p>
                        <p className="text-[11px] text-neutral-500">{eq.email} &bull; {eq.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-xs text-neutral-200 font-medium">{eq.treatmentTitle || "General Consultation"}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs text-neutral-400">
                        {eq.createdAt ? new Date(eq.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={eq.status}
                        onChange={(e) => updateStatus(eq._id, e.target.value)}
                        className={`text-[10px] font-medium px-3 py-1.5 rounded-full border cursor-pointer appearance-none bg-transparent focus:outline-none transition-all ${statusStyles[eq.status] || statusStyles.New}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-[#161412] text-white">{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelected(eq)}
                          className="p-2 rounded-xl text-neutral-400 hover:text-[#EC9C9D] hover:bg-[#EC9C9D]/10 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => promptDeleteEnquiry(eq)}
                          className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Details */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-[#161412] border border-neutral-800 rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-7 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">{selected.name}</h3>
                <span className="text-[11px] text-[#EC9C9D] font-mono">Reference: {selected.referenceId}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-neutral-500 hover:text-white">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">Email</p>
                <p className="text-xs text-white font-medium break-all">{selected.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">Phone</p>
                <p className="text-xs text-white font-medium">{selected.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">Treatment</p>
                <p className="text-xs text-white font-medium">{selected.treatmentTitle || "General"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">Preferred Date & Slot</p>
                <p className="text-xs text-white font-medium">{selected.preferredDate || "Flexible"} ({selected.timeSlot})</p>
              </div>
            </div>

            {selected.message && (
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">Patient Notes</p>
                <div className="text-xs text-neutral-300 leading-relaxed bg-[#0F0E0D] border border-neutral-800/80 rounded-2xl p-4">
                  {selected.message}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Client Enquiry?"
        message={`Are you sure you want to delete the enquiry from ${deleteDialog.name}? This reservation entry will be removed.`}
        confirmText="Delete Enquiry"
        loading={deleteDialog.loading}
        onConfirm={handleConfirmDeleteEnquiry}
        onClose={() => setDeleteDialog({ isOpen: false, id: null, name: "", loading: false })}
      />
    </div>
  );
}
