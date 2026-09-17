"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { ShieldCheck, Sparkles, Scale, HeartHandshake } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const VALUES = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Barrier-First Dermatology",
    desc: "We prioritize lipid barrier health above all else. Real skin radiance comes from a resilient, balanced stratum corneum, not from aggressive, damaging over-exfoliation.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "Evidence-Backed Therapies",
    desc: "Every modality we practice—from targeted LED wavelengths to surgical dermaplaning—is grounded in proven dermatology science with documented efficacy.",
  },
  {
    num: "03",
    icon: Scale,
    title: "Complete Price Transparency",
    desc: "No surprise add-ons, hidden consultation fees, or high-pressure product sales. Every price is openly published before you book.",
  },
  {
    num: "04",
    icon: HeartHandshake,
    title: "One-to-One Private Sanctuary",
    desc: "Your appointment is strictly one-to-one. You receive our undivided attention in a serene Leeds clinic suite designed for complete mental and dermal rest.",
  },
];

export function ClinicValues() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease }}
        >
          <SectionHeader
            align="center"
            eyebrow="Our Core Principles"
            title="The clinical standards that guide every treatment."
            description="Our practice is built on unyielding commitments to patient safety, evidence-based dermatology, and dignified one-to-one care."
          />
        </motion.div>

        {/* 4 Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease }}
                whileHover={{ y: -4 }}
                className="luxury-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg font-bold text-[#EC9C9D]">
                      {val.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E8DFD5] flex items-center justify-center text-[#EC9C9D] group-hover:border-[#EAA59E] group-hover:bg-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[#1C1917] tracking-tight">
                    {val.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
