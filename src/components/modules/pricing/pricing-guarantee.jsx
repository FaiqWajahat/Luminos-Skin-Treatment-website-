"use client";

import { ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animations";

export function PricingGuarantee() {
  const perks = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#EC9C9D]" />,
      title: "No Hidden Costs",
      desc: "Every procedure price includes full consultation and soothing post-treatment barrier balm.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#EC9C9D]" />,
      title: "Complimentary Skin Assessment",
      desc: "First-time clients receive an introductory dermal moisture check before treatment begins.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#EC9C9D]" />,
      title: "Course Bundles Available",
      desc: "Ask during your visit about course packages (buy 3, receive savings) for long-term consistency.",
    },
  ];

  return (
    <section className="pb-20 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {perks.map((p, i) => (
            <StaggerItem key={i}>
              <div className="p-6 rounded-2xl bg-white border border-[#E8DFD5] space-y-3 shadow-2xs h-full flex flex-col justify-between hover:border-[#EC9C9D]/50 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EC9C9D]/10 border border-[#EC9C9D]/20 flex items-center justify-center shadow-xs">
                    {p.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-[#1C1917]">{p.title}</h4>
                  <p className="text-xs text-[#78716C] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
