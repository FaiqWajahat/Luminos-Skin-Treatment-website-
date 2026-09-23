"use client";

import { useEffect, useState, useRef } from "react";
import {
  Search,
  Trash2,
  Eye,
  XCircle,
  Phone,
  Mail,
  Calendar,
  Clock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Lock,
  Plus,
  X,
  User,
  AlertCircle,
  CheckCircle2,
  CalendarDays,
  SlidersHorizontal,
} from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { CustomDatePicker } from "@/components/modules/booking/custom-date-picker";

const STATUS_OPTIONS = ["New", "In Progress", "Confirmed", "Completed", "Cancelled"];

const CLINICAL_TIME_SLOTS = [
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
];

const statusStyles = {
  New: "bg-[#EC9C9D]/15 text-[#EC9C9D] border-[#EC9C9D]/30",
  "In Progress": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Completed: "bg-green-500/15 text-green-400 border-green-500/30",
  Cancelled: "bg-neutral-500/15 text-neutral-400 border-neutral-500/30",
};

const getTomorrowString = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function AdminEnquiriesPage() {
  const [activeTab, setActiveTab] = useState("enquiries"); // "enquiries" | "schedule"
  const [enquiries, setEnquiries] = useState([]);
  const [blockedSlots, setBlockedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null, name: "", loading: false });

  // Dedicated Blocked Slots Management State
  const [selectedBlockDate, setSelectedBlockDate] = useState(getTomorrowString());
  const [blockType, setBlockType] = useState("SLOT"); // "SLOT" | "FULL_DAY"
  const [blockSlotValue, setBlockSlotValue] = useState("09:30 AM");
  const [customTime, setCustomTime] = useState("");
  const [blockReason, setBlockReason] = useState("Admin Blocked");
  const [isSubmittingBlock, setIsSubmittingBlock] = useState(false);

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
      console.warn("Real-time enquiries fetch error:", err);
    } finally {
      if (isMounted.current) {
        setLoading(false);
        setIsSyncing(false);
      }
    }
  };

  const fetchBlockedSlots = async () => {
    try {
      const res = await fetch("/api/blocked-slots", { cache: "no-store" });
      const data = await res.json();
      if (isMounted.current && data.blockedSlots) {
        setBlockedSlots(data.blockedSlots);
      }
    } catch (err) {
      console.warn("Error fetching blocked slots:", err);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchEnquiries();
    fetchBlockedSlots();

    const intervalId = setInterval(() => {
      fetchEnquiries(true);
      fetchBlockedSlots();
    }, 3500);

    const onFocus = () => {
      fetchEnquiries(true);
      fetchBlockedSlots();
    };
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

  // Handler for adding a new Blocked Slot / Closure (without creating an enquiry!)
  const handleCreateBlockedSlot = async (e) => {
    e.preventDefault();
    let finalSlot = blockSlotValue;
    if (blockType === "FULL_DAY") {
      finalSlot = "FULL_DAY";
    } else if (blockSlotValue === "CUSTOM") {
      if (!customTime.trim()) {
        alert("Please enter a custom time slot (e.g. 05:15 PM).");
        return;
      }
      finalSlot = customTime.trim();
    }

    if (!selectedBlockDate || !finalSlot) {
      alert("Please select both a date and time slot / block type.");
      return;
    }

    setIsSubmittingBlock(true);
    try {
      const res = await fetch("/api/blocked-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedBlockDate,
          slot: finalSlot,
          reason: blockReason.trim() || (blockType === "FULL_DAY" ? "Clinic Closed (Full Day)" : "Admin Blocked"),
          type: blockType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to add block.");
        return;
      }

      fetchBlockedSlots();
      alert(
        blockType === "FULL_DAY"
          ? `Date ${selectedBlockDate} marked as CLOSED for full day!`
          : `Slot "${finalSlot}" on ${selectedBlockDate} has been blocked!`
      );
      setCustomTime("");
    } catch (err) {
      alert("Error creating block: " + err.message);
    } finally {
      setIsSubmittingBlock(false);
    }
  };

  const handleDeleteBlockedSlot = async (id) => {
    if (!confirm("Are you sure you want to unblock / remove this schedule restriction?")) return;
    try {
      await fetch(`/api/blocked-slots/${id}`, { method: "DELETE" });
      fetchBlockedSlots();
    } catch (err) {
      alert("Error removing block: " + err.message);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
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
      {/* Top Header & Tab Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Clinic Administration & Schedule
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium">Live Sync</span>
            </div>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage incoming client enquiries and block clinic dates & time slots
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="p-1 bg-[#161412] border border-neutral-800 rounded-2xl flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("enquiries")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "enquiries"
                ? "bg-[#EC9C9D] text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Client Enquiries</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === "enquiries" ? "bg-black/20 text-black font-bold" : "bg-neutral-800 text-neutral-300"}`}>
              {enquiries.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("schedule")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "schedule"
                ? "bg-[#EC9C9D] text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Blocked Dates & Slots</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === "schedule" ? "bg-black/20 text-black font-bold" : "bg-neutral-800 text-neutral-300"}`}>
              {blockedSlots.length}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: CLIENT ENQUIRIES */}
      {activeTab === "enquiries" && (
        <div className="space-y-4 animate-fadeIn">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#161412] p-4 rounded-2xl border border-neutral-800/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#EC9C9D]" />
              <h3 className="text-sm font-semibold text-white">Client Appointments & Requests</h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => fetchEnquiries(false)}
                disabled={isSyncing}
                title="Manual sync now"
                className="p-2.5 rounded-xl bg-[#0F0E0D] border border-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
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
                  className="bg-[#0F0E0D] border border-neutral-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#EC9C9D] w-44 sm:w-56 transition-colors"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#0F0E0D] border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#EC9C9D] cursor-pointer"
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
                  ) : filteredEnquiries.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-xs text-neutral-500">No client enquiries found matching your search.</td></tr>
                  ) : (
                    filteredEnquiries.map((eq) => (
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
                              {eq.preferredDate || "No Date"} &bull; {eq.timeSlot || "No Slot"}
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
        </div>
      )}

      {/* TAB 2: SCHEDULE & BLOCKED DATES MANAGER */}
      {activeTab === "schedule" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Block Form (No Enquiry Created!) */}
          <div className="bg-[#161412] border border-neutral-800/80 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Lock className="w-5 h-5 text-[#EC9C9D]" />
              <div>
                <h3 className="text-base font-serif font-bold text-white">Block Custom Date / Time Slot</h3>
                <p className="text-[11px] text-neutral-400">Select any custom date and slot to close on the frontend (without creating fake enquiries)</p>
              </div>
            </div>

            <form onSubmit={handleCreateBlockedSlot} className="space-y-4 max-w-2xl">
              {/* Block Mode Switcher */}
              <div className="p-1 bg-[#0F0E0D] border border-neutral-800 rounded-xl flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setBlockType("SLOT")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    blockType === "SLOT"
                      ? "bg-[#EC9C9D] text-black shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Specific Time Slot</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBlockType("FULL_DAY")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    blockType === "FULL_DAY"
                      ? "bg-red-500 text-white shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Full Day Block (Clinic Closed)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium flex items-center justify-between">
                    <span>SELECTED DATE *</span>
                    <span className="text-[10px] text-[#EC9C9D] font-mono">{selectedBlockDate}</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedBlockDate}
                    onChange={(e) => setSelectedBlockDate(e.target.value)}
                    className="w-full bg-[#0F0E0D] border border-neutral-700 hover:border-[#EC9C9D]/60 focus:border-[#EC9C9D] rounded-full px-5 py-2.5 text-xs text-white focus:outline-none transition-all cursor-pointer font-mono shadow-inner [color-scheme:dark]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                    {blockType === "FULL_DAY" ? "Block Status" : "Time Slot *"}
                  </label>
                  {blockType === "FULL_DAY" ? (
                    <div className="w-full bg-red-500/10 border border-red-500/30 rounded-xl px-3.5 py-2.5 text-xs text-red-400 font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Entire Day Closed (All Slots)</span>
                    </div>
                  ) : (
                    <select
                      value={blockSlotValue}
                      onChange={(e) => setBlockSlotValue(e.target.value)}
                      className="w-full bg-[#0F0E0D] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#EC9C9D] cursor-pointer"
                    >
                      {CLINICAL_TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                      <option value="CUSTOM">Custom Time Slot...</option>
                    </select>
                  )}
                </div>
              </div>

              {blockType === "SLOT" && blockSlotValue === "CUSTOM" && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="text-[10px] uppercase tracking-wider text-[#EC9C9D] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Enter Custom Time Slot (e.g. 05:15 PM or 07:00 PM) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 05:15 PM"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="w-full bg-[#0F0E0D] border border-[#EC9C9D]/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#EC9C9D]"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Reason / Internal Note</label>
                <input
                  type="text"
                  placeholder="e.g. Private Booking, Staff Training, Bank Holiday Closure..."
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="w-full bg-[#0F0E0D] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#EC9C9D]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingBlock}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#EC9C9D] via-[#F0A5A2] to-[#D97E80] shadow-md hover:opacity-95 disabled:opacity-50 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isSubmittingBlock ? "Applying Block..." : "Save Block / Close Slot"}</span>
              </button>
            </form>
          </div>

          {/* Card 3: Active Blocked Slots List & Unblock Actions */}
          <div className="bg-[#161412] border border-neutral-800/80 rounded-3xl overflow-hidden shadow-xl space-y-0">
            <div className="p-5 border-b border-neutral-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400" />
                <h3 className="text-sm font-semibold text-white">Active Blocked Dates & Closures</h3>
              </div>
              <span className="text-xs text-neutral-400">{blockedSlots.length} active restrictions</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800/80 bg-neutral-900/40">
                    <th className="text-left px-6 py-3.5 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Blocked Date</th>
                    <th className="text-left px-6 py-3.5 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Restriction Type / Slot</th>
                    <th className="text-left px-6 py-3.5 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Reason / Note</th>
                    <th className="text-right px-6 py-3.5 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Unblock / Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                  {blockedSlots.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-xs text-neutral-500">
                        No active blocked dates or slots. Clinic is following normal operating schedule.
                      </td>
                    </tr>
                  ) : (
                    blockedSlots.map((item) => (
                      <tr key={item._id} className="hover:bg-neutral-800/30 transition-colors">
                        <td className="px-6 py-4 text-xs font-semibold text-white">
                          {item.date}
                        </td>
                        <td className="px-6 py-4">
                          {item.type === "FULL_DAY" || item.slot === "FULL_DAY" ? (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-400 bg-red-500/15 px-2.5 py-1 rounded-full border border-red-500/30">
                              <Lock className="w-3 h-3" />
                              Full Day Clinic Closure
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#EC9C9D] bg-[#EC9C9D]/10 px-2.5 py-1 rounded-full border border-[#EC9C9D]/30">
                              <Clock className="w-3 h-3" />
                              {item.slot}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs text-neutral-300">
                          {item.reason || "Admin Blocked"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteBlockedSlot(item._id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 border border-red-500/20 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Unblock</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Details for Client Enquiries */}
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
