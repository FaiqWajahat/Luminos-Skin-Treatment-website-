"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/shared/section-header";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { Sparkles, ShieldCheck, Heart, Volume2, Wind } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const SANCTUARY_FEATURES = [
  {
    icon: Volume2,
    title: "Acoustic Tranquility",
    desc: "Sound-isolated suite designed to insulate you from city bustle for genuine nervous system calm.",
  },
  {
    icon: Wind,
    title: "HEPA Air Purification",
    desc: "Continuous hospital-grade air filtration ensuring a pristine, particle-free treatment environment.",
  },
  {
    icon: ShieldCheck,
    title: "Hospital-Grade Sterilization",
    desc: "Autoclave instruments and 100% single-use surgical disposables opened exclusively in your presence.",
  },
];

export function ClinicSanctuary() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F0EB]/60 border-y border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <SectionHeader
            eyebrow="The Leeds Environment"
            title="A calm clinical sanctuary, designed for your comfort."
            description="Explore our central Leeds wellness suite where medical-level hygiene meets warm sensory relaxation."
          />
          <span className="text-xs font-serif italic text-[#EC9C9D] text-left md:text-right shrink-0">
            Central Leeds Wellness Suite · Private Access
          </span>
        </motion.div>

        {/* Panoramic Visual Frame */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease }}
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[260px] rounded-3xl overflow-hidden shadow-xl border border-[#E8DFD5]">
            <Image
              src="/about-The Leeds-Sanctuary.png"
              alt="Luminous Skin Clinic Leeds Sanctuary and Treatment Room"
              fill
              sizes="100vw"
              className="object-cover hover:scale-[1.01] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#E8DFD5]/80 shadow-md">
              <p className="text-xs sm:text-sm font-semibold text-[#1C1917]">Private Treatment Sanctuary & Dermal Diagnostic Suite</p>
              <p className="text-[11px] text-[#78716C]">Central Leeds · Temperature-regulated anatomical bed & HEPA air filtration</p>
            </div>
          </div>
        </motion.div>

        {/* 3 Environment Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SANCTUARY_FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease }}
                className="p-6 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8DFD5] flex items-center justify-center text-[#EC9C9D]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-[#1C1917]">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
