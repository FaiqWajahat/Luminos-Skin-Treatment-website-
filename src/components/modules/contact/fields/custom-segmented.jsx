"use client";

import { Mail, Phone, MessageSquare, Clock, Calendar } from "lucide-react";

const ICON_MAP = {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Calendar,
};

export function CustomSegmented({
  label,
  value,
  onChange,
  options = [],
  required = false,
  helperText,
  error,
  className = "",
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm font-semibold text-[#1C1917]">
          <span className="flex items-center gap-1">
            {label}
            {required && <span className="text-[#EC9C9D] font-bold text-sm">*</span>}
          </span>
          {helperText && (
            <span className="text-[11px] sm:text-xs font-normal text-[#78716C]">{helperText}</span>
          )}
        </div>
      )}

      <div
        role="radiogroup"
        aria-label={label || "Selection"}
        className="grid grid-cols-2 sm:grid-flow-col sm:auto-cols-fr gap-2 p-1 bg-[#F3ECE6]/70 rounded-xl sm:rounded-2xl border border-[#E8DFD5]"
      >
        {options.map((opt) => {
          const optId = typeof opt === "string" ? opt : opt.id || opt.value;
          const optLabel = typeof opt === "string" ? opt : opt.label;
          const optDesc = typeof opt === "object" ? opt.desc : null;
          const isSelected = value === optId;
          const IconComp =
            typeof opt === "object" && opt.icon && ICON_MAP[opt.icon]
              ? ICON_MAP[opt.icon]
              : null;

          return (
            <button
              key={optId}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(optId)}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer text-center relative
                ${
                  isSelected
                    ? "bg-white text-[#1C1917] shadow-2xs border border-[#EAA59E]/60 font-semibold"
                    : "text-[#57534E] hover:text-[#1C1917] hover:bg-white/60 border border-transparent"
                }
              `}
            >
              {IconComp && (
                <IconComp
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${
                    isSelected ? "text-[#EC9C9D]" : "text-[#78716C]"
                  }`}
                />
              )}
              <div className="flex flex-col items-center leading-tight">
                <span className="tracking-tight">{optLabel}</span>
                {optDesc && (
                  <span className="text-[10px] sm:text-[11px] text-[#78716C] font-normal mt-0.5">
                    {optDesc}
                  </span>
                )}
              </div>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#EC9C9D] ml-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs text-red-600 font-medium pt-0.5">{error}</p>}
    </div>
  );
}
