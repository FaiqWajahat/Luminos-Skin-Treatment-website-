"use client";

import { useId } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";

export function CustomSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
  error,
  helperText,
  icon: Icon,
  className = "",
  disabled = false,
  ...props
}) {
  const generatedId = useId();
  const selectId = name || generatedId;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm font-semibold text-[#1C1917]"
        >
          <span className="flex items-center gap-1">
            {label}
            {required && <span className="text-[#EC9C9D] font-bold text-sm">*</span>}
          </span>
          {helperText && !error && (
            <span className="text-[11px] sm:text-xs font-normal text-[#78716C]">{helperText}</span>
          )}
        </label>
      )}

      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#78716C] group-focus-within:text-[#EC9C9D] transition-colors">
            <Icon className="w-4 h-4 text-[#78716C]" />
          </div>
        )}

        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : undefined}
          className={`w-full rounded-xl border text-sm sm:text-base text-[#1C1917] bg-[#FAF8F5] transition-all duration-200 outline-none appearance-none cursor-pointer
            ${Icon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4"}
            pr-10 sm:pr-11 py-2.5 sm:py-3
            ${
              error
                ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-[#E8DFD5] hover:border-[#EAA59E]/70 focus:border-[#EC9C9D] focus:bg-white focus:ring-2 focus:ring-[#EC9C9D]/20"
            }
            ${disabled ? "opacity-60 cursor-not-allowed bg-stone-100" : ""}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-stone-400 text-sm">
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const optVal = typeof opt === "string" ? opt : opt.value;
            const optLabel = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={optVal} value={optVal} className="text-[#1C1917] py-1.5 text-sm sm:text-base">
                {optLabel}
              </option>
            );
          })}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#78716C] group-focus-within:text-[#EC9C9D] transition-colors">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && (
        <p
          id={`${selectId}-error`}
          className="text-xs text-red-600 flex items-center gap-1 pt-0.5 font-medium"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
