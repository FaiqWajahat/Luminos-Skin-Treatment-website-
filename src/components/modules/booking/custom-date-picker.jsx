"use client";

import { useState, useMemo } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from "lucide-react";

export function CustomDatePicker({ selectedDate, onSelectDate }) {
  // Generate next 18 days (Mon-Sat, skipping Sunday which is closed)
  const days = useMemo(() => {
    const list = [];
    const today = new Date();

    let offset = 0;
    while (list.length < 14 && offset < 30) {
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      const dayOfWeek = d.getDay(); // 0 = Sunday, 1 = Monday, ...
      const isSunday = dayOfWeek === 0;

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const dateNum = String(d.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${dateNum}`;
      const dayName = d.toLocaleDateString("en-GB", { weekday: "short" });
      const dayNumber = d.getDate();
      const monthName = d.toLocaleDateString("en-GB", { month: "short" });

      list.push({
        dateString,
        dayName,
        dayNumber,
        monthName,
        isSunday,
        isToday: offset === 0,
        isTomorrow: offset === 1,
      });

      offset++;
    }
    return list;
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-semibold text-[#1C1917] flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-[#EC9C9D]" />
          <span>Step 3: Select Consultation Date</span>
          <span className="text-[#EC9C9D] font-bold text-sm">*</span>
        </label>
        <span className="text-[11px] text-[#78716C]">Clinic Open Mon–Sat</span>
      </div>

      {/* Horizontal Luxury Day Strip */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
        {days.slice(0, 7).map((day) => {
          const isSelected = selectedDate === day.dateString;
          const isDisabled = day.isSunday;

          return (
            <button
              key={day.dateString}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectDate(day.dateString)}
              className={`p-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between min-h-[90px] relative ${
                isDisabled
                  ? "opacity-40 cursor-not-allowed bg-stone-100 border-[#E8DFD5]"
                  : isSelected
                  ? "bg-gradient-to-b from-[#F0A5A2] via-[#EC9C9D] to-[#D97E80] text-white border-[#EC9C9D] shadow-md shadow-[#EC9C9D]/20 scale-[1.02]"
                  : "bg-white border-[#E8DFD5] hover:border-[#EC9C9D] hover:bg-[#FAF8F5] text-[#1C1917]"
              }`}
            >
              {day.isToday && !isSelected && !isDisabled && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-wider bg-[#EC9C9D] text-white px-1.5 py-0.2 rounded-full">
                  Today
                </span>
              )}

              <span
                className={`text-[11px] font-semibold uppercase tracking-wider ${
                  isSelected ? "text-white/90" : "text-[#78716C]"
                }`}
              >
                {day.dayName}
              </span>

              <span
                className={`text-xl sm:text-2xl font-serif font-bold ${
                  isSelected ? "text-white" : "text-[#1C1917]"
                }`}
              >
                {day.dayNumber}
              </span>

              <span
                className={`text-[10px] uppercase font-medium ${
                  isSelected ? "text-white/80" : isDisabled ? "text-neutral-400" : "text-[#78716C]"
                }`}
              >
                {isDisabled ? "Closed" : day.monthName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Date input fallback / extended selector */}
      <div className="pt-2 flex items-center justify-between text-xs">
        <span className="text-[#78716C]">Need a later date? Select directly:</span>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={selectedDate}
          onChange={(e) => onSelectDate(e.target.value)}
          className="text-xs font-semibold text-[#1C1917] bg-white border border-[#E8DFD5] rounded-xl px-3 py-1.5 focus:border-[#EC9C9D] outline-none cursor-pointer hover:border-[#EC9C9D]/60 transition-colors"
        />
      </div>
    </div>
  );
}
