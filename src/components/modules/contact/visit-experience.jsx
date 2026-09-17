"use client";

import { motion } from "framer-motion";
import { Sparkles, Coffee, Stethoscope, HeartHandshake } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animations";

const STEPS = [
  {
    step: "01",
    title: "Discrete Arrival & Welcome",
    description:
      "Step into our private, tranquil clinic suite in central Leeds. Enjoy a warm welcome with organic botanical herbal infusions before your dedicated appointment begins.",
    icon: Coffee,
    highlight: "Private 1:1 Entrance",
  },
  {
    step: "02",
    title: "Diagnostic Dermal Assessment",
    description:
      "We thoroughly assess your skin barrier, active concerns, lifestyle, and homecare routine. No guesswork—pure evidence-based clinical analysis tailored to you.",
    icon: Stethoscope,
    highlight: "Barrier Integrity Check",
  },
  {
    step: "03",
    title: "Bespoke Treatment Experience",
    description:
      "Relax in our temperature-regulated treatment suite while receiving tailored clinical facials, dermaplaning, microneedling, or phototherapy at your comfort level.",
    icon: Sparkles,
    highlight: "Calm & Unhurried",
  },
  {
    step: "04",
    title: "Tailored Aftercare & Plan",
    description:
      "Depart with an instant radiant glow and a clear, simple homecare plan designed to sustain and compound your clinical results without complex regimens.",
    icon: HeartHandshake,
    highlight: "Personalised Protocol",
  },
];

export function VisitExperience() {
  return (
    <section className="py-16 lg:py-20 bg-[#FAF8F5] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <FadeIn delay={0.05}>
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-[#EC9C9D]/10 text-[#EC9C9D] border border-[#EC9C9D]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>What To Expect</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
              Your Private Clinic Experience
            </h2>
            <p className="text-sm sm:text-base text-[#78716C] leading-relaxed">
              We operate exclusively by appointment to provide an attentive, private atmosphere. Here is what your visit looks like from arrival to aftercare.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.step}>
                <div className="luxury-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full bg-white border border-[#E8DFD5] hover:border-[#EC9C9D]/50 hover:shadow-md transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl font-bold text-[#EC9C9D]">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#EC9C9D]/10 border border-[#EC9C9D]/20 flex items-center justify-center text-[#EC9C9D] group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#F0A5A2] group-hover:to-[#D97E80] group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base font-serif font-semibold text-[#1C1917]">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#78716C] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E8DFD5]/70">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D97E80] bg-[#EC9C9D]/10 px-2.5 py-1 rounded-full">
                      {step.highlight}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
