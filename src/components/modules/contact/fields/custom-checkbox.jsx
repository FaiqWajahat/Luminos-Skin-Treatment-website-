"use client";

import { useId } from "react";
import { Check, AlertCircle } from "lucide-react";

export function CustomCheckbox({
  id,
  name,
  checked = false,
  onChange,
  children,
  required = false,
  error,
  className = "",
  disabled = false,
}) {
  const generatedId = useId();
  const checkboxId = id || name || generatedId;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label
        htmlFor={checkboxId}
        className={`flex items-start gap-3 select-none cursor-pointer group ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <div className="relative flex items-center justify-center shrink-0 mt-0.5">
          <input
            id={checkboxId}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only peer"
          />
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200
              ${
                checked
                  ? "bg-[#EC9C9D] border-[#EC9C9D] text-white shadow-xs"
                  : "bg-[#FAF8F5] border-[#D6C4B2] group-hover:border-[#EC9C9D]"
              }
              peer-focus-visible:ring-2 peer-focus-visible:ring-[#EC9C9D]/40
              ${error ? "border-red-400 bg-red-50/40" : ""}
            `}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
          </div>
        </div>

        <div className="text-xs sm:text-sm text-[#443E38] leading-relaxed group-hover:text-[#1C1917] transition-colors">
          {children}
          {required && <span className="text-[#EC9C9D] font-bold text-sm ml-1">*</span>}
        </div>
      </label>

      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1.5 pl-8 pt-0.5 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
