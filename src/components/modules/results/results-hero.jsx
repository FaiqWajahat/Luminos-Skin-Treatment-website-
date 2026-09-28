"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function ResultsHero() {
  return (
    <section className="relative min-h-[48vh] lg:min-h-[52vh] py-16 lg:py-20 flex items-center justify-center overflow-hidden">
      {/* ── Background Layer with Luxury Aesthetic & Image Slot ── */}
      <div className="absolute inset-0 z-0 bg-[#141211]">
        <Image
          src="/resultpage-hero.png"
          alt="Luminous Skin Clinic Leeds Client Results"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center scale-[1.01]"
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
          className="space-y-6"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.22em] uppercase text-[#F0A5A2] bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F0A5A2]" />
            <span>Verified Transformations · Leeds LS11</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight leading-[1.12] text-white">
            Real Clinical Results. <br className="hidden sm:inline" />
            <em className="font-serif italic font-normal text-[#F0A5A2]">
              Documented With Honesty.
            </em>
          </h1>

          {/* Concise Subtitle */}
          <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-xl mx-auto font-normal drop-shadow-sm">
            Real client transformations and progressions documented with honesty and zero filters.
          </p>

          {/* Compact Actions */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] hover:brightness-105 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Begin Your Journey</span>
            </Link>

            <Link
              href="/treatments"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300"
            >
              <span>Explore Treatments</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F0A5A2]" />
            </Link>
          </div>

          {/* Trust Points */}
          <div className="pt-6 border-t border-white/10 max-w-lg mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F0A5A2]" />
              <span className="text-neutral-300">Unretouched Progress</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F0A5A2]" />
              <span className="text-neutral-300">Standardized Clinical Images</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
