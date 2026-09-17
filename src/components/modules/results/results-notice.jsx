"use client";

import { ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";

export function ResultsNotice() {
  return (
    <section className="pb-20 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.05}>
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8DFD5] text-center space-y-2 shadow-2xs">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EC9C9D] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#EC9C9D]" />
              <span>Clinical Integrity & Consent</span>
            </div>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed max-w-2xl mx-auto">
              All before-and-after imagery displayed at Luminous Skin Clinic represents real client protocols conducted in Leeds under informed clinical consent. Individual treatment results vary based on biological skin type, homecare compliance, and genetics.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
