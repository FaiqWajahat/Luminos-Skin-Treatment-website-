"use client";

import { Check, Sparkles } from "lucide-react";

export function CustomTagsSelect({
  label,
  value = [],
  onChange,
  options = [],
  helperText,
  maxSelect,
  className = "",
}) {
  const toggleTag = (tagId) => {
    if (value.includes(tagId)) {
      onChange(value.filter((id) => id !== tagId));
    } else {
      if (maxSelect && value.length >= maxSelect) {
        return;
      }
      onChange([...value, tagId]);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm font-semibold text-[#1C1917]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#EC9C9D]" />
            <span>{label}</span>
            {value.length > 0 && (
              <span className="text-[11px] sm:text-xs font-medium text-[#EC9C9D] bg-[#EC9C9D]/15 px-2.5 py-0.5 rounded-full">
                {value.length} selected
              </span>
            )}
          </span>
          {helperText && (
            <span className="text-[11px] sm:text-xs font-normal text-[#78716C]">{helperText}</span>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-0.5">
        {options.map((opt) => {
          const optId = typeof opt === "string" ? opt : opt.id || opt.value;
          const optLabel = typeof opt === "string" ? opt : opt.label;
          const isSelected = value.includes(optId);

          return (
            <button
              key={optId}
              type="button"
              onClick={() => toggleTag(optId)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none
                ${
                  isSelected
                    ? "bg-[#EC9C9D] text-white shadow-xs border border-[#EC9C9D] scale-[1.01] font-semibold"
                    : "bg-[#FAF8F5] text-[#443E38] hover:bg-white hover:text-[#1C1917] border border-[#E8DFD5] hover:border-[#EAA59E]/70"
                }
              `}
            >
              {isSelected ? (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6C4B2]" />
              )}
              <span>{optLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
