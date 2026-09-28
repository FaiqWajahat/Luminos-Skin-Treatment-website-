"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function TreatmentsHero() {
  return (
    <section className="relative min-h-[46vh] lg:min-h-[50vh] py-16 lg:py-20 flex items-center justify-center overflow-hidden">
      {/* ── Background Layer with Clean & Clear Photo ── */}
      <div className="absolute inset-0 z-0 bg-[#141211]">
        <Image
          src="/treatmentpage-hero.png"
          alt="Luminous Skin Clinic Leeds Treatments Menu"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Clean, gentle overlay ensuring background photo stays bright & clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/35" />
      </div>

      {/* ── Foreground Centralized Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="space-y-5"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.22em] uppercase text-[#F0A5A2] bg-black/30 backdrop-blur-md border border-white/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F0A5A2]" />
            <span>Clinical Treatments · Luminous</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.15] text-white drop-shadow-md">
            Targeted Clinical Protocols. <br className="hidden sm:inline" />
            <em className="font-serif italic font-normal text-[#F0A5A2]">
              Tailored For Real Skin Health.
            </em>
          </h1>

          {/* Short & Simple Subtitle */}
          <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-lg mx-auto font-normal drop-shadow-sm">
            Evidence-grounded treatments tailored for your unique skin barrier and real, lasting results.
          </p>

          {/* Actions with "View Our Results" button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] hover:brightness-105 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>

            <Link
              href="/results"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#1C1917] bg-white hover:bg-neutral-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-[#EC9C9D]" />
              <span>View Our Results</span>
              <ArrowRight className="w-4 h-4 text-[#EC9C9D]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
