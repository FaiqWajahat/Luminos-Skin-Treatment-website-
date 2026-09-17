"use client";

import { Sparkles, Flower2, HeartHandshake, ShieldCheck } from "lucide-react";

const CATEGORY_ICONS = {
  "All Clinic Facials": Sparkles,
  "Facial Skin Treatments": ShieldCheck,
  "Massage Therapy": HeartHandshake,
};

export function CategoryPicker({ categories, selectedCategory, onSelectCategory, treatmentsByCategory }) {
  return (
    <div className="space-y-3">
      <label className="text-xs sm:text-sm font-semibold text-[#1C1917] flex items-center gap-1.5">
        <span>Step 1: Choose Treatment Category</span>
        <span className="text-[#EC9C9D] font-bold text-sm">*</span>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat] || Sparkles;
          const isSelected = selectedCategory === cat;
          const count = treatmentsByCategory[cat]?.length || 0;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden group ${
                isSelected
                  ? "bg-gradient-to-br from-white via-[#FCF9F7] to-[#FBF3F0] border-[#EC9C9D] shadow-md shadow-[#EC9C9D]/10 ring-2 ring-[#EC9C9D]/20"
                  : "bg-white border-[#E8DFD5] hover:border-[#EAA59E] hover:bg-[#FAF8F5]"
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EC9C9D]/20 to-transparent pointer-events-none rounded-bl-full" />
              )}

              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#EC9C9D] text-white"
                      : "bg-[#EC9C9D]/10 text-[#EC9C9D] group-hover:bg-[#EC9C9D]/20"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                    isSelected
                      ? "bg-[#EC9C9D]/15 text-[#EC9C9D] border-[#EC9C9D]/30"
                      : "bg-[#FAF8F5] text-[#78716C] border-[#E8DFD5]"
                  }`}
                >
                  {count} {count === 1 ? "Option" : "Options"}
                </span>
              </div>

              <div>
                <h4 className={`text-sm font-serif font-bold ${isSelected ? "text-[#1C1917]" : "text-[#292524]"}`}>
                  {cat}
                </h4>
                <p className="text-[11px] text-[#78716C] mt-0.5">
                  {cat === "Skin & Facial Treatments" && "Glow, hydration & dermaplaning"}
                  {cat === "Advanced Skin Treatments" && "Collagen induction & cellular repair"}
                  {cat === "Wellness & Body Therapy" && "Deep release & holistic restore"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
