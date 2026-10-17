"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BOOKING_WINDOW_DAYS, clinicNow } from "@/constants/booking-slots";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const isFullDay = (slot = "", type = "") => {
  const s = slot.trim().toLowerCase();
  return s === "full_day" || s.includes("full day") || s.includes("clinic closed") || type === "FULL_DAY";
};

// Dates are handled as UTC midnights so "YYYY-MM-DD" never shifts with the viewer's timezone
const toKey = (date) => date.toISOString().slice(0, 10);
const fromKey = (key) => new Date(`${key}T00:00:00Z`);
const addDays = (date, n) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + n));

// Month calendar limited to the booking window; Sundays and closed days can't be picked
export function CustomDatePicker({ selectedDate, onSelectDate, existingEnquiries = [], blockedSlots = [] }) {
  const { today, lastDay } = useMemo(() => {
    const start = fromKey(clinicNow().date);
    return { today: start, lastDay: addDays(start, BOOKING_WINDOW_DAYS) };
  }, []);

  const [month, setMonth] = useState(() => {
    const base = selectedDate ? fromKey(selectedDate) : today;
    return new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), 1));
  });

  const closedDates = useMemo(() => {
    const set = new Set();
    existingEnquiries.forEach((eq) => {
      if ((eq.status || "").trim().toLowerCase() !== "cancelled" && isFullDay(eq.timeSlot)) set.add(eq.preferredDate);
    });
    blockedSlots.forEach((b) => isFullDay(b.slot, b.type) && set.add(b.date));
    return set;
  }, [existingEnquiries, blockedSlots]);

  // Six-week grid starting on the Monday on/before the 1st
  const cells = useMemo(() => {
    const offset = (month.getUTCDay() + 6) % 7;
    const start = addDays(month, -offset);
    return Array.from({ length: 42 }, (_, i) => addDays(start, i));
  }, [month]);

  const firstMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
  const lastMonth = new Date(Date.UTC(lastDay.getUTCFullYear(), lastDay.getUTCMonth(), 1));
  const canGoBack = month > firstMonth;
  const canGoForward = month < lastMonth;
  const shiftMonth = (n) => setMonth((m) => new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth() + n, 1)));

  const todayKey = toKey(today);

  return (
    <div className="rounded-2xl border border-[#E8DFD5] bg-white p-4 sm:p-5">
      {/* Month header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={!canGoBack}
          aria-label="Previous month"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#57534E] hover:bg-[#FBEDEC] hover:text-[#D97E80] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <p className="font-serif text-lg font-bold text-[#1C1917]" aria-live="polite">
          {month.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" })}
        </p>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          disabled={!canGoForward}
          aria-label="Next month"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#57534E] hover:bg-[#FBEDEC] hover:text-[#D97E80] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d) => (
          <span key={d} className="text-center text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] py-1">
            {d}
          </span>
        ))}
      </div>

      {/* Days */}
      <div role="grid" className="grid grid-cols-7 gap-1">
        {cells.map((date) => {
          const key = toKey(date);
          const inMonth = date.getUTCMonth() === month.getUTCMonth();
          const isSunday = date.getUTCDay() === 0;
          const outOfRange = date < today || date > lastDay;
          const isClosed = closedDates.has(key);
          const disabled = !inMonth || isSunday || outOfRange || isClosed;
          const isSelected = key === selectedDate;
          const isToday = key === todayKey;

          if (!inMonth) return <span key={key} aria-hidden="true" />;

          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              aria-label={date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" })}
              title={isClosed ? "Clinic closed" : isSunday ? "Closed on Sundays" : undefined}
              onClick={() => onSelectDate(key)}
              className={`relative mx-auto flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-sm transition-colors ${
                isSelected
                  ? "bg-gradient-to-br from-[#F0A5A2] to-[#D97E80] text-white font-semibold shadow-md shadow-[#EC9C9D]/30 cursor-pointer"
                  : disabled
                  ? `text-[#D6CFC9] cursor-not-allowed ${isClosed ? "line-through" : ""}`
                  : "text-[#1C1917] font-medium hover:bg-[#FBEDEC] hover:text-[#D97E80] cursor-pointer"
              }`}
            >
              {date.getUTCDate()}
              {isToday && !isSelected && (
                <span aria-hidden="true" className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D97E80]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-[#F0E6E1] flex items-center justify-between gap-3 text-xs text-[#78716C]">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97E80]" />
          Today
        </span>
        <span>Closed on Sundays</span>
      </div>
    </div>
  );
}
