"use client";

import { Check, Sparkles } from "lucide-react";

export function TreatmentPicker({ treatments, selectedSlug, onSelectTreatment }) {
  return (
    <div className="space-y-3">
      <label className="text-xs sm:text-sm font-semibold text-[#1C1917] flex items-center gap-1.5">
        <span>Step 2: Select Specific Clinical Protocol</span>
        <span className="text-[#EC9C9D] font-bold text-sm">*</span>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {treatments.map((t) => {
          const isSelected = selectedSlug === t.slug;

          return (
            <button
              key={t.slug || t._id}
              type="button"
              onClick={() => onSelectTreatment(t.slug)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                isSelected
                  ? "bg-white border-[#EC9C9D] shadow-md shadow-[#EC9C9D]/15 ring-2 ring-[#EC9C9D]/20"
                  : "bg-white border-[#E8DFD5] hover:border-[#EAA59E] hover:bg-[#FAF8F5]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-serif font-bold text-[#1C1917]">
                      {t.title}
                    </h4>
                    {t.popular && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#EC9C9D]/15 text-[#EC9C9D] px-2 py-0.5 rounded-md border border-[#EC9C9D]/25">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#78716C] line-clamp-2 leading-relaxed">
                    {t.tagline || t.shortDescription}
                  </p>
                </div>

                {/* Selection Check Circle */}
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#EC9C9D] border-[#EC9C9D] text-white"
                      : "border-[#E8DFD5] bg-[#FAF8F5] text-transparent group-hover:border-[#EC9C9D]/50"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8DFD5]/70 flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-sm text-[#1C1917]">
                  £{t.price}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
