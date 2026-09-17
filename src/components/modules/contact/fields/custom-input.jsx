"use client";

import { forwardRef, useId } from "react";
import { AlertCircle } from "lucide-react";

export const CustomInput = forwardRef(function CustomInput(
  {
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    error,
    helperText,
    icon: Icon,
    className = "",
    disabled = false,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = name || generatedId;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
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

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full rounded-xl border text-sm sm:text-base text-[#1C1917] placeholder:text-[#A8A29E] bg-[#FAF8F5] transition-all duration-200 outline-none
            ${Icon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4"}
            pr-3.5 sm:pr-4 py-2.5 sm:py-3
            ${
              error
                ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-[#E8DFD5] hover:border-[#EAA59E]/70 focus:border-[#EC9C9D] focus:bg-white focus:ring-2 focus:ring-[#EC9C9D]/20"
            }
            ${disabled ? "opacity-60 cursor-not-allowed bg-stone-100" : ""}
          `}
          {...props}
        />
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          className="text-xs text-red-600 flex items-center gap-1 pt-0.5 animate-fadeIn font-medium"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});
