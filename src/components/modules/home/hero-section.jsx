"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Star, ShieldCheck, MapPin, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function HeroSection({
  image = "/about-01.jpeg",
  title = "Clinical Precision.",
  titleHighlight = "Effortlessly Luminous.",
  subtitle = "Bespoke one-to-one skin therapies designed to reveal your healthiest complexion. From restorative facials and collagen induction to targeted phototherapy—tailored purely to your skin.",
  highlight = "Leeds LS11 · Private Clinical Sanctuary",
}) {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden">
      
      {/* ── Background Layer with Real Clinic Photography ── */}
      <div className="absolute inset-0 z-0">
        {image?.startsWith("data:") ? (
          <img
            src={image}
            alt="Luminous Skin Clinic Leeds Private Treatment Sanctuary"
            className="w-full h-full object-cover object-center scale-[1.01]"
          />
        ) : (
          <Image
            src={image || "/about-01.jpeg"}
            alt="Luminous Skin Clinic Leeds Private Treatment Sanctuary"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center scale-[1.01]"
          />
        )}

        {/* Sophisticated Multi-Stop Dark Scrim Overlay (ensures maximum text clarity while showcasing the room) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100F]/95 via-[#141211]/60 to-[#171514]/45 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-radial-[ellipse_at_center,transparent_0%,rgba(18,16,15,0.65)_100%]" />

        {/* Delicate subtle corner luxury wireframe marks */}
        <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-[#EC9C9D]/50" />
        <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-[#EC9C9D]/50" />
        <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-[#EC9C9D]/50" />
        <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-[#EC9C9D]/50" />
      </div>

      {/* ── Foreground Centralized Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
          className="space-y-8"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.24em] uppercase text-[#F0A5A2] bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#EC9C9D]" />
            <span>{highlight}</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.75rem] font-semibold tracking-tight leading-[1.12] text-white drop-shadow-md">
            {title} <br className="hidden sm:inline" />
            <em className="font-serif italic font-normal text-[#EC9C9D]">
              {titleHighlight}
            </em>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-neutral-200 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-xs">
            {subtitle}
          </p>

          {/* Centralized Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#F0A5A2] via-[#EC9C9D] to-[#D97E80] border border-[#EC9C9D]/40 shadow-lg hover:shadow-[0_12px_32px_-4px_rgba(236,156,157,0.55)] hover:-translate-y-0.5 transition-all duration-300 ease-out active:translate-y-0 active:scale-[0.98]"
            >
              {/* Subtle luxury light sweep on hover */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000 ease-out pointer-events-none" />
              
              <Calendar className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative z-10">Reserve Appointment</span>
            </Link>

            <Link
              href="/treatments"
              className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-medium text-white bg-black/40 hover:bg-white/15 backdrop-blur-md border border-white/25 hover:border-[#EC9C9D]/60 shadow-md hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 ease-out active:translate-y-0 active:scale-[0.98]"
            >
              {/* Subtle warm ambient tint on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EC9C9D]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <span className="relative z-10">Explore Treatments</span>
              <ArrowRight className="w-4 h-4 text-[#EC9C9D] transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          {/* Trust Indicators Bar */}
          <div className="pt-8 border-t border-white/15 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-neutral-300">
            <div className="flex items-center gap-1.5 text-[#EC9C9D]">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#EC9C9D]" />
                ))}
              </div>
              <span className="font-semibold text-white text-xs ml-0.5">5.0 Rating</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-white/40 hidden sm:block" />

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#EC9C9D]" />
              <span className="text-neutral-200">1:1 Private Appointments</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-white/40 hidden sm:block" />

            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#EC9C9D]" />
              <span className="text-neutral-200">Beeston, Leeds LS11</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
