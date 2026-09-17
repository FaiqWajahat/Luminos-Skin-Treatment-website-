"use client";

import { useId } from "react";
import { AlertCircle } from "lucide-react";

export function CustomTextarea({
  label,
  name,
  value = "",
  onChange,
  placeholder,
  required = false,
  maxLength = 600,
  rows = 4,
  error,
  helperText,
  suggestionChips = [],
  className = "",
  disabled = false,
  ...props
}) {
  const generatedId = useId();
  const textareaId = name || generatedId;

  const handleChipClick = (chipText) => {
    const separator = value.trim().length > 0 ? " " : "";
    const newValue = `${value.trim()}${separator}[${chipText}] `;
    if (newValue.length <= maxLength) {
      onChange({ target: { name, value: newValue } });
    }
  };

  const charCount = value ? value.length : 0;
  const isNearLimit = charCount >= maxLength * 0.9;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm font-semibold text-[#1C1917]">
          <span className="flex items-center gap-1">
            {label}
            {required && <span className="text-[#EC9C9D] font-bold text-sm">*</span>}
          </span>
          <span
            className={`text-[11px] sm:text-xs tabular-nums font-mono ${
              isNearLimit ? "text-amber-600 font-semibold" : "text-[#78716C]"
            }`}
          >
            {charCount}/{maxLength}
          </span>
        </div>
      )}

      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`w-full rounded-xl border text-sm sm:text-base text-[#1C1917] placeholder:text-[#A8A29E] bg-[#FAF8F5] transition-all duration-200 outline-none p-3.5 sm:p-4 leading-relaxed
          ${
            error
              ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-[#E8DFD5] hover:border-[#EAA59E]/70 focus:border-[#EC9C9D] focus:bg-white focus:ring-2 focus:ring-[#EC9C9D]/20"
          }
          ${disabled ? "opacity-60 cursor-not-allowed bg-stone-100" : ""}
        `}
        {...props}
      />

      {suggestionChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
            Quick prompts:
          </span>
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="text-xs px-2.5 py-1 rounded-md bg-[#F3ECE6] hover:bg-[#E8DFD5] text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              + {chip}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p
          id={`${textareaId}-error`}
          className="text-xs text-red-600 flex items-center gap-1 pt-0.5 font-medium"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
