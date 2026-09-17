"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { Scan, Sparkles, ShieldCheck, Layers, CheckCircle2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const PROTOCOL_STEPS = [
  {
    phase: "Phase 01",
    title: "Dermal Assessment & Consultation",
    tagline: "Comprehensive Skin Diagnostic",
    description:
      "We begin with a thorough examination of your skin barrier, hydration levels, lifestyle factors, and sensitivity before any procedure is selected.",
    icon: Scan,
    details: ["Moisture barrier evaluation", "Sensitivity & allergy screening", "Customized goal alignment"],
  },
  {
    phase: "Phase 02",
    title: "Bespoke Protocol Formulation",
    tagline: "Targeted Multi-Modality Care",
    description:
      "Your practitioner curates a tailored combination of clinical techniques—such as dermaplaning, microneedling, or LED phototherapy—specifically calibrated for your skin.",
    icon: Sparkles,
    details: ["Active peptide & serum selection", "Calibrated device settings", "Comfort-first pacing"],
  },
  {
    phase: "Phase 03",
    title: "Private One-to-One Treatment",
    tagline: "Sterile Clinical Precision",
    description:
      "Relax in our quiet central Leeds clinic suite while your procedure is performed with hospital-grade sterilization protocols and attentive care.",
    icon: ShieldCheck,
    details: ["Single-use surgical disposables", "Unhurried, focused attention", "Calm sanctuary atmosphere"],
  },
  {
    phase: "Phase 04",
    title: "Barrier Defense & Ongoing Plan",
    tagline: "Sustained Radiance Blueprint",
    description:
      "We conclude with restorative lipid sealants and provide clear, actionable homecare guidance so your results compound over the coming weeks.",
    icon: Layers,
    details: ["Post-treatment soothing balm", "Personalized routine advice", "Follow-up check-in recommendations"],
  },
];

const CLINICAL_STANDARDS = [
  "Hospital-Grade Hygiene Protocols",
  "100% Single-Use Sterile Consumables",
  "Evidence-Backed Dermal Modalities",
  "Certified & Insured Practitioner",
];

export function ClinicalProtocol() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F0EB]/60 border-y border-[#E8DFD5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <SectionHeader
            eyebrow="The Luminous Standard"
            title="A systematic, scientific pathway to healthy skin."
            description="Every appointment follows a structured 4-phase clinical pathway to ensure noticeable, compounding results with complete safety and comfort."
          />
          <span className="text-xs font-serif italic text-[#EC9C9D] text-left md:text-right shrink-0">
            Leeds Clinical Excellence · Est. 2026
          </span>
        </motion.div>

        {/* 4 Protocol Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROTOCOL_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease }}
                whileHover={{ y: -4 }}
                className="luxury-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Top Phase & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold tracking-wider text-[#EC9C9D]">
                      {step.phase}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E8DFD5] flex items-center justify-center text-[#EC9C9D] group-hover:border-[#EAA59E] group-hover:bg-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-[#1C1917] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#EC9C9D] uppercase tracking-wider">
                      {step.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Sub-bullets */}
                <div className="pt-4 border-t border-[#E8DFD5]/70 space-y-1.5">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-[#78716C]">
                      <CheckCircle2 className="w-3 h-3 text-[#EC9C9D] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quality Standards Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="p-6 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            {CLINICAL_STANDARDS.map((std, i) => (
              <div key={i} className="flex items-center gap-2.5 justify-center sm:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EC9C9D] shrink-0" />
                <span className="text-xs font-semibold text-[#1C1917] tracking-tight">
                  {std}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
