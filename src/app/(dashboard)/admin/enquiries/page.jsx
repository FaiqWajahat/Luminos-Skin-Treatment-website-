"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Trash2, Eye, XCircle, ChevronDown, Phone, Mail, Calendar, Clock, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
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
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null, name: "", loading: false });
  const isMounted = useRef(true);

  const fetchEnquiries = async (silent = false) => {
    if (!silent) setIsSyncing(true);
    try {
      const res = await fetch("/api/enquiries", { cache: "no-store" });
      const data = await res.json();
      if (isMounted.current) {
        setEnquiries(data.enquiries || []);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.warn("Real-time fetch error:", err);
    } finally {
      if (isMounted.current) {
        setLoading(false);
        setIsSyncing(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchEnquiries();

    // Real-time automatic polling every 3.5 seconds
    const intervalId = setInterval(() => {
      fetchEnquiries(true);
    }, 3500);

    // Also sync immediately when window gets focus
    const onFocus = () => fetchEnquiries(true);
    window.addEventListener("focus", onFocus);

    return () => {
      isMounted.current = false;
      clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

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
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Enquiries & Bookings
            </h1>
            {/* Real-time live status indicator */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium">Real-Time Live</span>
            </div>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Auto-syncing incoming consultation & appointment requests in real-time (no refresh needed)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fetchEnquiries(false)}
            disabled={isSyncing}
            title="Manual sync now"
            className="p-2.5 rounded-xl bg-[#161412] border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#EC9C9D]/50 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-[#EC9C9D]" : ""}`} />
          </button>

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
                      <div className="space-y-1">
                        <span className="text-xs text-neutral-200 font-medium block">
                          {eq.treatmentTitle || "General Consultation"}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#EC9C9D] bg-[#EC9C9D]/10 px-2 py-0.5 rounded-full border border-[#EC9C9D]/20">
                          £10 Advance Deposit Applicable
                        </span>
                      </div>
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
                          className="p-2 rounded-xl text-neutral-400 hover:text-[#EC9C9D] hover:bg-[#EC9C9D]/10 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => promptDeleteEnquiry(eq)}
                          className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
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
              <button onClick={() => setSelected(null)} className="text-neutral-500 hover:text-white cursor-pointer">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Deposit Status Notice */}
            <div className="p-3.5 rounded-2xl bg-[#EC9C9D]/10 border border-[#EC9C9D]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#EC9C9D]" />
                <div>
                  <p className="text-xs font-semibold text-white">£10 Advance Deposit Applicable</p>
                  <p className="text-[11px] text-neutral-400">Deducted from treatment balance on arrival</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                £10 Deposit
              </span>
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
