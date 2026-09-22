"use client";

import { useState, useMemo } from "react";
import { Clock, Check, Lock, Sparkles, CheckCircle2 } from "lucide-react";

// Master clinical schedule definition: 30-minute session slots
const CLINICAL_SLOTS = [
  // Morning 30-min slots (09:30 AM - 12:00 PM)
  { id: "09:30", label: "09:30 AM", period: "Morning", duration: "30 min" },
  { id: "10:00", label: "10:00 AM", period: "Morning", duration: "30 min" },
  { id: "10:30", label: "10:30 AM", period: "Morning", duration: "30 min" },
  { id: "11:00", label: "11:00 AM", period: "Morning", duration: "30 min" },
  { id: "11:30", label: "11:30 AM", period: "Morning", duration: "30 min" },

  // Afternoon 30-min slots (12:00 PM - 05:00 PM)
  { id: "12:00", label: "12:00 PM", period: "Afternoon", duration: "30 min" },
  { id: "12:30", label: "12:30 PM", period: "Afternoon", duration: "30 min" },
  { id: "13:00", label: "01:00 PM", period: "Afternoon", duration: "30 min" },
  { id: "13:30", label: "01:30 PM", period: "Afternoon", duration: "30 min" },
  { id: "14:00", label: "02:00 PM", period: "Afternoon", duration: "30 min" },
  { id: "14:30", label: "02:30 PM", period: "Afternoon", duration: "30 min" },
  { id: "15:00", label: "03:00 PM", period: "Afternoon", duration: "30 min" },
  { id: "15:30", label: "03:30 PM", period: "Afternoon", duration: "30 min" },
  { id: "16:00", label: "04:00 PM", period: "Afternoon", duration: "30 min" },
  { id: "16:30", label: "04:30 PM", period: "Afternoon", duration: "30 min" },

  // Evening 30-min slots (05:00 PM - 06:30 PM)
  { id: "17:00", label: "05:00 PM", period: "Evening", duration: "30 min" },
  { id: "17:30", label: "05:30 PM", period: "Evening", duration: "30 min" },
  { id: "18:00", label: "06:00 PM", period: "Evening", duration: "30 min" },
];

export function TimeSlotPicker({ selectedDate, selectedSlot, onSelectSlot, existingEnquiries = [] }) {
  const [activePeriod, setActivePeriod] = useState("All");

  // Determine availability for each slot for the chosen date
  const slotsWithAvailability = useMemo(() => {
    if (!selectedDate) return [];

    // Parse date for weekend rules (Saturday opens 10 AM, closes 5 PM, Sunday closed)
    const [year, month, day] = selectedDate.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    const isSaturday = dateObj.getDay() === 6;

    // Collect all booked slots for the selected date (excluding Cancelled)
    const bookedSet = new Set();
    existingEnquiries.forEach((eq) => {
      const status = (eq.status || "").trim().toLowerCase();
      if (eq.preferredDate === selectedDate && status !== "cancelled") {
        if (eq.timeSlot) {
          const slotStr = eq.timeSlot.trim().toLowerCase();
          bookedSet.add(slotStr);
          // Also strip AM/PM for cross-matching e.g. "09:30 AM" vs "09:30"
          const clean = slotStr.replace(/\s*(am|pm)/i, "").trim();
          if (clean) bookedSet.add(clean);
        }
      }
    });

    return CLINICAL_SLOTS.map((slot) => {
      const labelLower = slot.label.trim().toLowerCase();
      const idLower = slot.id.trim().toLowerCase();

      // Saturday operating hours rules
      if (isSaturday) {
        if (slot.id === "09:30") {
          return { ...slot, isAvailable: false, reason: "Opens 10:00 AM on Sat" };
        }
        if (["17:00", "17:30", "18:00"].includes(slot.id)) {
          return { ...slot, isAvailable: false, reason: "Closes 5:00 PM on Sat" };
        }
      }

      // Check if booked in database
      if (bookedSet.has(labelLower) || bookedSet.has(idLower)) {
        return { ...slot, isAvailable: false, reason: "Already Booked" };
      }

      return { ...slot, isAvailable: true };
    });
  }, [selectedDate, existingEnquiries]);

  // Filter slots by selected period
  const displayedSlots = useMemo(() => {
    if (activePeriod === "All") return slotsWithAvailability;
    return slotsWithAvailability.filter((s) => s.period === activePeriod);
  }, [slotsWithAvailability, activePeriod]);

  return (
    <div className="space-y-4">
      {/* Header & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <label className="text-xs sm:text-sm font-semibold text-[#1C1917] flex items-center gap-1.5 flex-wrap">
          <Clock className="w-4 h-4 text-[#EC9C9D]" />
          <span>Step 4: Choose Session Time</span>
          <span className="text-[#EC9C9D] font-bold text-sm">*</span>
        </label>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[#78716C]">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span className="text-[#78716C] line-through">Booked</span>
          </div>
        </div>
      </div>

      {/* Period Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F5F0EB]/60 border border-[#E8DFD5] rounded-xl overflow-x-auto">
        {["All", "Morning", "Afternoon", "Evening"].map((period) => (
          <button
            key={period}
            type="button"
            onClick={() => setActivePeriod(period)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              activePeriod === period
                ? "bg-white text-[#1C1917] shadow-xs font-semibold"
                : "text-[#78716C] hover:text-[#1C1917]"
            }`}
          >
            {period === "All" ? "All Time Slots" : period}
          </button>
        ))}
      </div>

      {/* Time Slots Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[340px] overflow-y-auto pr-1">
        {displayedSlots.length === 0 ? (
          <div className="col-span-full py-8 text-center text-sm text-[#78716C]">
            No available slots for this selection.
          </div>
        ) : (
          displayedSlots.map((slot) => {
            const isSelected = selectedSlot === slot.label;
            const isBooked = !slot.isAvailable && slot.reason === "Already Booked";
            const isClosed = !slot.isAvailable && !isBooked;

            return (
              <button
                key={slot.id}
                type="button"
                disabled={!slot.isAvailable}
                onClick={() => {
                  if (slot.isAvailable) {
                    onSelectSlot(slot.label);
                  }
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative flex flex-col justify-between min-h-[76px] ${
                  isSelected
                    ? "bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] text-white border-[#EC9C9D] shadow-md shadow-[#EC9C9D]/25 scale-[1.02] cursor-pointer"
                    : isBooked
                    ? "bg-rose-50/50 border-rose-200/60 text-rose-400 opacity-75 cursor-not-allowed"
                    : isClosed
                    ? "bg-stone-100/60 border-stone-200/60 text-stone-300 opacity-50 cursor-not-allowed"
                    : "bg-white border-[#E8DFD5] hover:border-[#EC9C9D] hover:bg-[#FAF8F5] cursor-pointer text-[#1C1917]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-sm font-mono font-bold tracking-tight ${
                      isSelected
                        ? "text-white"
                        : isBooked
                        ? "text-rose-400 line-through decoration-rose-400/80 decoration-2"
                        : isClosed
                        ? "text-stone-300 line-through"
                        : "text-[#1C1917]"
                    }`}
                  >
                    {slot.label}
                  </span>

                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div className="pt-1.5 flex items-center justify-between text-[10px]">
                  <span
                    className={
                      isSelected
                        ? "text-white/80 font-medium"
                        : isBooked
                        ? "text-rose-300 font-medium"
                        : "text-[#78716C] font-medium"
                    }
                  >
                    {slot.period}
                  </span>
                  {isBooked && (
                    <span className="text-[9.5px] text-rose-400/90 font-medium">Booked</span>
                  )}
                  {isClosed && (
                    <span className="text-[9.5px] text-stone-400">Closed</span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
