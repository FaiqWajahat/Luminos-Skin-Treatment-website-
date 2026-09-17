"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TREATMENTS } from "@/constants/clinic-data";
import { SectionHeader } from "@/components/shared/section-header";
import { PopularTreatmentSkeleton } from "@/components/shared/skeleton-loaders";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function PopularTreatments() {
  const [treatments, setTreatments] = useState(TREATMENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/treatments")
      .then((r) => r.json())
      .then((d) => {
        if (d.treatments && d.treatments.length > 0) {
          setTreatments(d.treatments);
        }
      })
      .catch((err) => console.warn("Using fallback popular treatments:", err))
      .finally(() => setLoading(false));
  }, []);

  const popular = treatments.filter((t) => t.popular).slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-[#F5F0EB]/70 border-y border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <SectionHeader
            eyebrow="Popular Appointments"
            title="Skin care made easier to choose."
            description="Clear treatment information, transparent starting prices, and a simple route to clinical care."
          />
          <Link
            href="/treatments"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#EC9C9D] hover:text-[#EC9C9D] transition-colors whitespace-nowrap"
          >
            <span>View all treatments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Treatment cards or Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <PopularTreatmentSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popular.map((treatment, i) => (
            <motion.div
              key={treatment._id || treatment.id || treatment.slug}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              whileHover={{ y: -4 }}
            >
              <div className="luxury-card rounded-2xl overflow-hidden flex flex-col h-full">
                {/* Image */}
                <div className="p-2 pb-0">
                  {treatment.image ? (
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF8F5]">
                      <img
                        src={treatment.image}
                        alt={treatment.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder
                      aspect="video"
                      category={treatment.category}
                      label={treatment.title}
                      icon="sparkles"
                      className="rounded-xl"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#EC9C9D]">
                      {treatment.category}
                    </span>
                    <h3 className="font-semibold text-base text-[#1C1917] leading-snug">
                      {treatment.title}
                    </h3>
                    <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2">
                      {treatment.tagline || treatment.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8DFD5] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-base font-serif font-bold text-[#1C1917]">
                        £{treatment.price}
                      </span>
                    </div>

                    <Link
                      href={`/booking?treatment=${treatment.slug}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#F0A5A2] via-[#EC9C9D] to-[#D97E80] hover:opacity-95 shadow-xs transition-all"
                    >
                      <span>Book Treatment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
