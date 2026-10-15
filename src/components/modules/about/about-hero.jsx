"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function AboutHero({
  image = "/about-hero-img.png",
  title = "Welcome to Luminous,",
  titleHighlight = "Where Beauty Meets Serenity.",
  subtitle = "Your personal escape to calm sophistication, self-care, and skin wellness.",
}) {
  return (
    <section className="relative min-h-[46vh] lg:min-h-[50vh] py-16 lg:py-20 flex items-center justify-center overflow-hidden">
      
      {/* ── Background Layer with Real Clinic Photography ── */}
      <div className="absolute inset-0 z-0 bg-[#141211]">
        {image?.startsWith("data:") ? (
          <img
            src={image}
            alt="Luminous Leeds Sanctuary and Reception"
            className="w-full h-full object-cover object-center scale-[1.01]"
          />
        ) : (
          <Image
            src={image || "/about-hero-img.png"}
            alt="Luminous Leeds Sanctuary and Reception"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center scale-[1.01]"
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
          {/* Catching Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight leading-[1.12] text-white">
            {title} <br className="hidden sm:inline" />
            <em className="font-serif italic font-normal text-[#F0A5A2]">
              {titleHighlight}
            </em>
          </h1>

          {/* Concise Subtitle */}
          <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-xl mx-auto font-normal drop-shadow-sm">
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
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300"
            >
              <span>Explore Treatments</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F0A5A2]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
