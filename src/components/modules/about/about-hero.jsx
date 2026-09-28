"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, ShieldCheck, MapPin, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function AboutHero({
  image = "/about-hero-img.png",
  title = "Welcome to Luminous,",
  titleHighlight = "Where Beauty Meets Serenity.",
  subtitle = "Your personal escape to calm sophistication, self-care, and skin wellness.",
  highlight = "Where Beauty Meets Serenity · Leeds"
}) {
  return (
    <section className="relative min-h-[46vh] lg:min-h-[50vh] py-16 lg:py-20 flex items-center justify-center overflow-hidden">
      
      {/* ── Background Layer with Real Clinic Photography ── */}
      <div className="absolute inset-0 z-0 bg-[#141211]">
        {image?.startsWith("data:") ? (
          <img
            src={image}
            alt="Luminous Leeds Sanctuary and Reception"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <Image
            src={image || "/about-hero-img.png"}
            alt="Luminous Leeds Sanctuary and Reception"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />
        )}

        {/* Clean, gentle overlay ensuring background photo stays bright & clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/35" />
      </div>

      {/* ── Foreground Centralized Content (Compact & Elegant Height) ── */}
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
            <span>{highlight}</span>
          </div>

          {/* Catching Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight leading-[1.12] text-white">
            {title} <br className="hidden sm:inline" />
            <em className="font-serif italic font-normal text-[#F0A5A2]">
              {titleHighlight}
            </em>
          </h1>

          {/* Concise Subtitle */}
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal">
            {subtitle}
          </p>

          {/* Compact Actions */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] hover:brightness-105 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
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
              <span className="text-neutral-300">Certified Beauty Therapist</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F0A5A2]" />
              <span className="text-neutral-300">Leeds Lead Facialist</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
