"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { REVIEWS } from "@/constants/clinic-data";
import { SectionHeader } from "@/components/shared/section-header";
import { Star, ArrowRight, Quote } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";

export function ReviewsStrip() {
  // Triple the reviews array for seamless, gapless infinite continuous scrolling
  const infiniteReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section className="py-20 lg:py-28 bg-[#1C1917] text-white relative overflow-hidden">
      {/* Ambient luxury glow accents */}
      <div className="pointer-events-none absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[#EC9C9D]/10 blur-[120px] -z-0" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-[#D97E80]/8 blur-[90px] -z-0" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <FadeIn delay={0.05}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader
              dark
              eyebrow="Client Experience"
              title="Results feel better when the journey feels personal."
              description="Real verified feedback from clients who trust Luminous with their skin renewal and facial therapy in central Leeds."
            />

            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#F0A5A2] hover:text-white transition-colors cursor-pointer self-start md:self-end group"
            >
              <span>Read all client stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* ── Continuous Non-Stop Gliding Slider ── */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle left & right gradient fade masks for seamless luxury appearance */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#1C1917] via-[#1C1917]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#1C1917] via-[#1C1917]/80 to-transparent z-10" />

        {/* Continuous Linear Motion Track (Moves continuously without stopping or waiting) */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
          className="flex gap-6 w-max pl-4"
        >
          {infiniteReviews.map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="w-[320px] sm:w-[380px] lg:w-[420px] shrink-0 p-7 rounded-3xl bg-neutral-900/90 border border-neutral-800 hover:border-[#EC9C9D]/50 shadow-xl transition-colors duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#F0A5A2]">
                    {[...Array(rev.rating)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-[#F0A5A2]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-neutral-700 group-hover:text-[#EC9C9D]/50 transition-colors" />
                </div>

                <p className="text-sm text-neutral-200 leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>

                {rev.highlight && (
                  <div className="p-3 rounded-xl bg-black/40 border border-neutral-800/80 text-xs text-[#F0A5A2]">
                    <span className="font-medium">{rev.highlight}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-white tracking-tight">{rev.author}</h4>
                  <span className="text-neutral-400 text-[11px]">{rev.treatment}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#F0A5A2] font-semibold bg-[#EC9C9D]/15 px-2.5 py-1 rounded-full border border-[#EC9C9D]/25">
                  Leeds Verified
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
