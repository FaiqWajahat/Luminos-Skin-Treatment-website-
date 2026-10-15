"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { CategorySection } from "./category-section";
import { CategoryNavigation } from "./category-navigation";

const ease = [0.22, 1, 0.36, 1];

export function ServicesView({ categories }) {
  return (
    <div className="flex flex-col">
      {/* ── Services Hero (Styled identically to About Us Hero) ── */}
      <section className="relative min-h-[46vh] lg:min-h-[50vh] py-16 lg:py-20 flex items-center justify-center overflow-hidden">
        {/* Background Layer with Dark Luxury Ambiance */}
        <div className="absolute inset-0 z-0 bg-[#141211]">
          <Image
            src="/treatmentpage-hero.png"
            alt="Treatments at Luminous Skin Clinic"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/35" />
        </div>

        {/* Foreground Centralized Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="space-y-6"
          >
            {/* Catching Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight leading-[1.12] text-white">
              Our Services, <br className="hidden sm:inline" />
              <em className="font-serif italic font-normal text-[#F0A5A2]">
                Tailored to Your Glow.
              </em>
            </h1>

            {/* Concise Subtitle */}
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Choose a category, select a treatment and view its full details.
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

              <a
                href="#categories-nav"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300"
              >
                <span>Explore Treatments</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F0A5A2]" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <CategoryNavigation categories={categories.filter((category) => category.treatments.length > 0)} />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-20 lg:space-y-24">
        {categories.map((category, i) => (
          <CategorySection key={category.slug} category={category} number={i + 1} />
        ))}
      </div>
    </div>
  );
}
