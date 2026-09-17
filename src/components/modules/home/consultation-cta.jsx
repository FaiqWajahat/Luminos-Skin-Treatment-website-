"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, ShieldCheck, Clock, MapPin } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function ConsultationCta() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease }}
          className="relative rounded-3xl bg-[#F7F3EE] border border-[#E8DFD5] p-8 sm:p-14 lg:p-16 text-center overflow-hidden shadow-xs"
        >
          {/* Subtle architectural corner accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#EC9C9D]/40" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#EC9C9D]/40" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#EC9C9D]/40" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#EC9C9D]/40" />

          {/* Central Monogram */}
          <div className="mx-auto w-12 h-12 rounded-full border border-[#EC9C9D]/30 bg-white/80 flex items-center justify-center mb-6 shadow-xs">
            <span className="font-serif text-xl font-bold text-[#EC9C9D]">L</span>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {/* Eyebrow */}
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#EC9C9D]">
              Private Clinical Suite · Leeds
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold tracking-tight text-[#1C1917] leading-[1.2]">
              Your journey to healthy, radiant skin begins with a quiet conversation.
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed max-w-xl mx-auto pt-1">
              Experience attentive, one-to-one skin care in our calm central Leeds clinic. Unhurried appointments crafted purely around your goals and comfort.
            </p>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] to-[#EC9C9D] hover:brightness-105 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment</span>
              </Link>

              <Link
                href="/treatments"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-[#292524] bg-white border border-[#E8DFD5] hover:bg-[#F3ECE6] hover:border-[#EAA59E] transition-colors"
              >
                <span>View Treatment Menu</span>
                <ArrowRight className="w-4 h-4 text-[#8C827A]" />
              </Link>
            </div>

            {/* Subtle Reassurance Pillars */}
            <div className="pt-8 border-t border-[#E8DFD5]/70 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#78716C]">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EC9C9D]" />
                <span>Central Leeds Location</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#EC9C9D]" />
                <span>Full Dermal Assessment</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#EC9C9D]" />
                <span>Flexible Rescheduling</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
