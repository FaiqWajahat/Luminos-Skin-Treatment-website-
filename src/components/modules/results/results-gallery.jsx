"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RESULTS_CASE_STUDIES } from "@/constants/clinic-data";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { ResultsCardSkeleton } from "@/components/shared/skeleton-loaders";

export function ResultsGallery() {
  const [results, setResults] = useState(RESULTS_CASE_STUDIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/results")
      .then((r) => r.json())
      .then((d) => {
        if (d.results && d.results.length > 0) {
          setResults(d.results);
        }
      })
      .catch((err) => console.warn("Using fallback results:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-14 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[1, 2].map((i) => (
              <ResultsCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {results.map((study) => (
            <StaggerItem key={study._id || study.id}>
              <div className="luxury-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 h-full border border-[#E8DFD5] bg-white shadow-2xs">
                {/* Image Slots Split (Before / After) */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold text-[#78716C] uppercase tracking-wider block">
                      Before Treatment
                    </span>
                    {study.imageBefore ? (
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-900 border border-[#E8DFD5]">
                        <img src={study.imageBefore} alt="Before Treatment" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <ImagePlaceholder
                        aspect="portrait"
                        category="Clinical Baseline"
                        label="Initial Assessment Slot"
                        icon="camera"
                        className="rounded-xl"
                      />
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold text-[#EC9C9D] uppercase tracking-wider block">
                      After Protocol
                    </span>
                    {study.imageAfter ? (
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-900 border border-[#EC9C9D]/40">
                        <img src={study.imageAfter} alt="After Protocol" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <ImagePlaceholder
                        aspect="portrait"
                        category="Clinical Outcome"
                        label="Post-Care Result Slot"
                        icon="sparkles"
                        className="rounded-xl"
                      />
                    )}
                  </div>
                </div>

                {/* Case Study Meta */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DFD5] pb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EC9C9D]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{study.concern}</span>
                    </span>
                    <span className="text-xs text-[#78716C] font-mono">
                      {study.sessions}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-bold text-[#1C1917]">
                      {study.treatmentUsed}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      {study.summary}
                    </p>
                  </div>

                  {study.notes && (
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFD5] text-xs text-[#78716C] flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#EC9C9D] shrink-0 mt-0.5" />
                      <span>{study.notes}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <Link
                      href="/booking"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] hover:text-[#EC9C9D] transition-colors group"
                    >
                      <span>Book similar treatment</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        )}
      </div>
    </section>
  );
}
