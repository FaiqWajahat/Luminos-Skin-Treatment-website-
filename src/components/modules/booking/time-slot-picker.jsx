"use client";

import { useMemo } from "react";
import { Clock, Check, Lock, Sparkles, CheckCircle2 } from "lucide-react";

// Master clinical schedule definition
const CLINICAL_SLOTS = [
  // Morning slots
  { id: "09:30", label: "09:30 AM", period: "Morning", subtext: "Optimal skin readiness" },
  { id: "10:30", label: "10:30 AM", period: "Morning", subtext: "Quiet private slot" },
  { id: "11:45", label: "11:45 AM", period: "Morning", subtext: "Pre-lunch rejuvenation" },

  // Afternoon slots
  { id: "13:30", label: "01:30 PM", period: "Afternoon", subtext: "Dedicated practitioner slot" },
  { id: "14:45", label: "02:45 PM", period: "Afternoon", subtext: "Unrushed consultation" },
  { id: "16:00", label: "04:00 PM", period: "Afternoon", subtext: "Golden glow hour" },

  // Evening slots
  { id: "17:15", label: "05:15 PM", period: "Evening", subtext: "Post-work relaxation" },
  { id: "18:15", label: "06:15 PM", period: "Evening", subtext: "Evening restorative" },
];

export function TimeSlotPicker({ selectedDate, selectedSlot, onSelectSlot, existingEnquiries = [] }) {
  // Determine availability for each slot for the chosen date
  const slotsWithAvailability = useMemo(() => {
    if (!selectedDate) return [];

    // Parse date for weekend rules (Saturday closes earlier, Sunday closed)
    const [year, month, day] = selectedDate.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    const isSaturday = dateObj.getDay() === 6;

    // Deterministic booked slots based on date string hash (to simulate live clinic demand)
    // plus real enquiries from database!
    let dateHash = 0;
    for (let i = 0; i < selectedDate.length; i++) {
      dateHash = (dateHash << 5) - dateHash + selectedDate.charCodeAt(i);
      dateHash |= 0;
    }

    // Identify DB booked slots for this date
    const bookedInDb = new Set(
      existingEnquiries
        .filter((eq) => eq.preferredDate === selectedDate && eq.status !== "Cancelled")
        .map((eq) => eq.timeSlot)
    );

    return CLINICAL_SLOTS.map((slot, idx) => {
      // Saturday doesn't run late evening slots
      if (isSaturday && (slot.id === "17:15" || slot.id === "18:15")) {
        return { ...slot, isAvailable: false, reason: "Outside Saturday hours" };
      }

      // Check if booked in DB
      if (bookedInDb.has(slot.label) || bookedInDb.has(slot.id)) {
        return { ...slot, isAvailable: false, reason: "Already Booked" };
      }

      // Deterministic realistic booked slots (e.g. slots 1 and 4 on even hash dates)
      const isSimulatedBooked = (Math.abs(dateHash + idx * 7) % 3 === 0);
      if (isSimulatedBooked) {
        return { ...slot, isAvailable: false, reason: "Already Booked" };
      }

      return { ...slot, isAvailable: true };
    });
  }, [selectedDate, existingEnquiries]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-semibold text-[#1C1917] flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#EC9C9D]" />
          <span>Step 4: Choose Real-Time Available Slot</span>
          <span className="text-[#EC9C9D] font-bold text-sm">*</span>
        </label>

        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[#78716C]">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-stone-300" />
            <span className="text-[#78716C]">Booked / Full</span>
          </div>
        </div>
      </div>

      {/* Time Slots Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {slotsWithAvailability.map((slot) => {
          const isSelected = selectedSlot === slot.label;
          const isBooked = !slot.isAvailable;

          return (
            <button
              key={slot.id}
              type="button"
              disabled={isBooked}
              onClick={() => onSelectSlot(slot.label)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative flex flex-col justify-between min-h-[82px] ${
                isBooked
                  ? "bg-stone-50 border-[#E8DFD5] opacity-50 cursor-not-allowed"
                  : isSelected
                  ? "bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] text-white border-[#EC9C9D] shadow-md shadow-[#EC9C9D]/25 scale-[1.02] cursor-pointer"
                  : "bg-white border-[#E8DFD5] hover:border-[#EC9C9D] hover:bg-[#FAF8F5] cursor-pointer text-[#1C1917]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-sm font-mono font-bold ${
                    isSelected ? "text-white" : isBooked ? "text-neutral-400 line-through" : "text-[#1C1917]"
                  }`}
                >
                  {slot.label}
                </span>

                {isBooked ? (
                  <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Booked</span>
                  </span>
                ) : isSelected ? (
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <Check className="w-3 h-3" />
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                    Open
                  </span>
                )}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px]">
                <span className={isSelected ? "text-white/80" : "text-[#78716C]"}>
                  {slot.period}
                </span>
                <span className={`text-[10px] ${isSelected ? "text-white/70" : "text-neutral-400"}`}>
                  1:1 Suite
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
