"use client";

import { useState } from "react";
import { REVIEWS } from "@/constants/clinic-data";
import { CheckCircle, ExternalLink, Quote, Sparkles } from "lucide-react";

const TRUSTPILOT_URL =
  "https://uk.trustpilot.com/review/luminousskinclinic.co.uk?utm_content=link_in_bio&utm_medium=trustbox&utm_source=TrustBoxReviewCollector";

function TrustpilotStar({ filled = true }) {
  return (
    <div
      className={`w-4 h-4 flex items-center justify-center rounded-[2px] ${
        filled ? "bg-[#00B67A]" : "bg-neutral-300"
      }`}
    >
      <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white">
        <path d="M12 2l2.9 6.8 7.1.6-5.3 4.8 1.6 7-6.3-3.7-6.3 3.7 1.6-7-5.3-4.8 7.1-.6z" />
      </svg>
    </div>
  );
}

export function ReviewsGrid() {
  const [filter, setFilter] = useState("all");

  const filteredReviews = REVIEWS.filter((rev) => {
    if (filter === "5stars") return rev.rating === 5;
    if (filter === "facials")
      return (
        rev.treatment?.toLowerCase().includes("facial") ||
        rev.quote?.toLowerCase().includes("facial") ||
        rev.title?.toLowerCase().includes("facial")
      );
    if (filter === "massages")
      return (
        rev.treatment?.toLowerCase().includes("massage") ||
        rev.quote?.toLowerCase().includes("massage") ||
        rev.title?.toLowerCase().includes("massage")
      );
    return true;
  });

  return (
    <section className="py-14 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E8DFD5]">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: `All Reviews (${REVIEWS.length})` },
              { id: "facials", label: "Facials & Skin" },
              { id: "massages", label: "Massage & Wellness" },
              { id: "5stars", label: "5-Star Rated" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  filter === tab.id
                    ? "bg-[#1C1917] text-white shadow-sm"
                    : "bg-white text-[#78716C] border border-[#E8DFD5] hover:border-[#EC9C9D] hover:text-[#1C1917]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#00B67A] bg-[#00B67A]/10 border border-[#00B67A]/30 hover:bg-[#00B67A]/20 transition-all"
          >
            <span>Verified on Trustpilot</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="luxury-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 bg-white border border-[#E8DFD5] hover:border-[#EC9C9D] hover:shadow-lg transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <TrustpilotStar key={i} filled={true} />
                    ))}
                  </div>

                  <a
                    href={rev.trustpilotUrl || TRUSTPILOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#00B67A] bg-[#00B67A]/10 px-2 py-0.5 rounded-full hover:bg-[#00B67A]/20 transition-colors"
                  >
                    <CheckCircle className="w-3 h-3 text-[#00B67A]" />
                    Trustpilot Verified
                  </a>
                </div>

                {rev.title && (
                  <h3 className="text-base font-semibold text-[#1C1917] tracking-tight group-hover:text-[#D97E80] transition-colors">
                    {rev.title}
                  </h3>
                )}

                <div className="relative">
                  <Quote className="w-5 h-5 text-neutral-300 absolute -top-1 -left-1 opacity-50" />
                  <p className="text-sm text-[#443E38] leading-relaxed italic relative z-10 whitespace-pre-line">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                {rev.treatment && (
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFD5] text-xs text-[#D97E80] font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#EC9C9D] shrink-0" />
                    <span>{rev.treatment}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#E8DFD5] flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-[#1C1917]">{rev.author}</h4>
                    <span
                      className="text-[10px] text-[#A8A29E] font-mono"
                      title={`Trustpilot Consumer ID: ${rev.consumerId}`}
                    >
                      ID: {rev.consumerId ? rev.consumerId.slice(0, 6) + "..." : rev.id.slice(0, 6)}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#78716C] block">{rev.date}</span>
                </div>

                <a
                  href={rev.trustpilotUrl || TRUSTPILOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#78716C] hover:text-[#00B67A] hover:bg-[#00B67A]/10 transition-colors"
                  aria-label="View on Trustpilot"
                  title="View this review on Trustpilot"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
