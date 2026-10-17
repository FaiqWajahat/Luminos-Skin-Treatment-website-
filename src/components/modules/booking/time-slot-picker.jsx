"use client";

import { useMemo } from "react";
import { CLINICAL_SLOTS, clinicNow, slotClosedReason, slotKey } from "@/constants/booking-slots";

const isFullDay = (slot = "", type = "") => {
  const s = slot.trim().toLowerCase();
  return s === "full_day" || s.includes("full day") || s.includes("clinic closed") || type === "FULL_DAY";
};

// Every session time for the chosen date; ones that can't be booked are shown disabled
export function TimeSlotPicker({ selectedDate, selectedSlot, onSelectSlot, existingEnquiries = [], blockedSlots = [] }) {
  const { slots, closedAllDay } = useMemo(() => {
    const taken = new Set();
    let closed = false;

    existingEnquiries.forEach((eq) => {
      if (eq.preferredDate !== selectedDate || (eq.status || "").trim().toLowerCase() === "cancelled") return;
      if (isFullDay(eq.timeSlot)) closed = true;
      else if (eq.timeSlot) taken.add(slotKey(eq.timeSlot));
    });
    blockedSlots.forEach((b) => {
      if (b.date !== selectedDate) return;
      if (isFullDay(b.slot, b.type)) closed = true;
      else if (b.slot) taken.add(slotKey(b.slot));
    });

    const now = clinicNow();
    return {
      closedAllDay: closed,
      slots: CLINICAL_SLOTS.map((slot) => {
        if (taken.has(slot.id)) return { ...slot, status: "Booked" };
        if (slotClosedReason(selectedDate, slot, now)) return { ...slot, status: "Unavailable" };
        return { ...slot, status: null };
      }),
    };
  }, [selectedDate, existingEnquiries, blockedSlots]);

  if (closedAllDay) {
    return (
      <p className="py-6 text-center text-sm text-[#78716C] rounded-2xl border border-dashed border-[#E8DFD5]">
        The clinic is closed on this date — please choose another day.
      </p>
    );
  }

  const hasAvailable = slots.some((s) => !s.status);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2.5">
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.label;
          const disabled = Boolean(slot.status);
          return (
            <button
              key={slot.id}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              title={slot.status || undefined}
              onClick={() => onSelectSlot(slot.label)}
              className={`py-2 rounded-xl border text-sm font-semibold transition-all ${
                isSelected
                  ? "bg-gradient-to-r from-[#EAA59E] to-[#D97E80] text-white border-[#EC9C9D] shadow-md shadow-[#EC9C9D]/25 cursor-pointer"
                  : disabled
                  ? "bg-[#FAF8F5] border-[#F0E6E1] text-[#C9BFB8] cursor-not-allowed"
                  : "bg-white border-[#E8DFD5] hover:border-[#EC9C9D] text-[#1C1917] cursor-pointer"
              }`}
            >
              <span className={disabled ? "line-through decoration-[#D6CFC9]" : ""}>{slot.label}</span>
              {disabled && <span className="block text-[10px] font-medium">{slot.status}</span>}
            </button>
          );
        })}
      </div>
      {!hasAvailable && (
        <p className="text-xs text-center text-[#78716C]">No times left on this date — please choose another day.</p>
      )}
    </div>
  );
}
