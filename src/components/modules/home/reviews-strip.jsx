"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Keyboard } from "swiper/modules";

// Swiper core & module styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { REVIEWS } from "@/constants/clinic-data";
import { SectionHeader } from "@/components/shared/section-header";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { FadeIn } from "@/components/shared/animations";

const TRUSTPILOT_URL =
  "https://uk.trustpilot.com/review/luminousskinclinic.co.uk?utm_content=link_in_bio&utm_medium=trustbox&utm_source=TrustBoxReviewCollector";

// Official Trustpilot Star Icon (Green Square with White Star)
function TrustpilotStar({ filled = true }) {
  return (
    <div
      className={`w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center rounded-[2px] ${
        filled ? "bg-[#00B67A]" : "bg-neutral-700"
      }`}
    >
      <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white">
        <path d="M12 2l2.9 6.8 7.1.6-5.3 4.8 1.6 7-6.3-3.7-6.3 3.7 1.6-7-5.3-4.8 7.1-.6z" />
      </svg>
    </div>
  );
}

export function ReviewsStrip() {
  const swiperRef = useRef(null);

  return (
    <section className="py-20 lg:py-28 bg-[#1C1917] text-white relative overflow-hidden">
      {/* Ambient luxury glow accents */}
      <div className="pointer-events-none absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[#EC9C9D]/10 blur-[120px] -z-0" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-[#D97E80]/8 blur-[90px] -z-0" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 relative z-10">
        <FadeIn delay={0.05}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={TRUSTPILOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B67A]/15 border border-[#00B67A]/30 text-[#00B67A] text-xs font-semibold hover:bg-[#00B67A]/25 transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00B67A]" />
                  <span>Trustpilot Verified Reviews</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>

                {/* Trustpilot 5 Stars preview */}
                <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-neutral-800">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <TrustpilotStar key={i} filled={true} />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-white ml-1">
                    4.9 / 5.0
                  </span>
                </div>
              </div>

              <SectionHeader
                dark
                eyebrow="Genuine Client Feedback"
                title="Rated 'Excellent' by our clients in Leeds."
                description="Real experiences and unedited reviews from clients who trust Luminous for advanced facials, dermaplaning, and therapy."
              />
            </div>

            <div className="flex items-center gap-4 self-start md:self-end shrink-0">
              {/* Swiper Arrow Navigation */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous review"
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#EC9C9D] hover:bg-neutral-800/80 transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next review"
                  onClick={() => swiperRef.current?.slideNext()}
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#EC9C9D] hover:bg-neutral-800/80 transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <a
                href={TRUSTPILOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold text-white bg-neutral-900 border border-neutral-800 hover:border-[#00B67A] hover:bg-[#00B67A]/10 transition-colors cursor-pointer group"
              >
                <span>Read on Trustpilot</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#00B67A] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Swiper Carousel Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, Pagination, Navigation, Keyboard]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          speed={700}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
            el: ".reviews-custom-pagination",
            bulletClass:
              "inline-block w-2.5 h-2.5 rounded-full bg-neutral-700 mx-1 cursor-pointer transition-all duration-300",
            bulletActiveClass: "!w-7 !bg-[#EC9C9D] !rounded-full",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.8,
              spaceBetween: 26,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 28,
            },
          }}
          className="pb-10 [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:!h-auto"
        >
          {REVIEWS.map((rev) => (
            <SwiperSlide key={rev.id} className="!flex">
              <div className="w-full h-full p-6 sm:p-7 rounded-3xl bg-neutral-900/95 border border-neutral-800 hover:border-[#EC9C9D]/60 hover:shadow-2xl hover:shadow-[#EC9C9D]/5 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  {/* Top Bar: Stars + Trustpilot Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating || 5)].map((_, sIdx) => (
                        <TrustpilotStar key={sIdx} filled={true} />
                      ))}
                    </div>

                    <a
                      href={rev.trustpilotUrl || TRUSTPILOT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#00B67A] font-semibold bg-[#00B67A]/10 px-2 py-0.5 rounded-full border border-[#00B67A]/20 hover:bg-[#00B67A]/20 transition-colors"
                      title="View review on Trustpilot"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#00B67A]" />
                      <span>Trustpilot</span>
                    </a>
                  </div>

                  {/* Review Title */}
                  {rev.title && (
                    <h3 className="text-base font-semibold text-white tracking-tight line-clamp-1 group-hover:text-[#F0A5A2] transition-colors">
                      {rev.title}
                    </h3>
                  )}

                  {/* Review Quote Body */}
                  <div className="relative">
                    <Quote className="w-6 h-6 text-neutral-800 absolute -top-2 -left-1 -z-0 opacity-40" />
                    <p className="text-sm text-neutral-300 leading-relaxed italic relative z-10 whitespace-pre-line line-clamp-5">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>

                  {/* Treatment Tag */}
                  {rev.treatment && (
                    <div className="inline-block px-3 py-1 rounded-lg bg-black/40 border border-neutral-800 text-[11px] font-medium text-[#F0A5A2]">
                      {rev.treatment}
                    </div>
                  )}
                </div>

                {/* Author & Client ID Footer */}
                <div className="pt-4 mt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white tracking-tight">
                        {rev.author}
                      </h4>
                      <span
                        className="text-[10px] text-neutral-500 font-mono"
                        title={`Trustpilot Consumer ID: ${rev.consumerId}`}
                      >
                        ID:{" "}
                        {rev.consumerId
                          ? rev.consumerId.slice(0, 6) + "..."
                          : rev.id.slice(0, 6)}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {rev.date}{" "}
                      {rev.experiencedDate &&
                        `(Visited: ${rev.experiencedDate})`}
                    </div>
                  </div>

                  <a
                    href={rev.trustpilotUrl || TRUSTPILOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read review by ${rev.author} on Trustpilot`}
                    className="p-1.5 rounded-lg bg-neutral-800/60 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Swiper Pagination */}
        <div className="reviews-custom-pagination flex justify-center items-center mt-6" />

        {/* Bottom CTA to view all reviews */}
        <div className="mt-8 text-center sm:hidden">
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-white bg-neutral-900 border border-neutral-800 hover:border-[#00B67A] transition-colors"
          >
            <span>Read all reviews on Trustpilot</span>
            <ExternalLink className="w-4 h-4 text-[#00B67A]" />
          </a>
        </div>
      </div>
    </section>
  );
}
