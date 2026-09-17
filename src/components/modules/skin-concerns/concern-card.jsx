import Link from "next/link";
import { TREATMENTS } from "@/constants/clinic-data";
import { ArrowRight, Lightbulb, Check } from "lucide-react";

export function ConcernCard({ concern }) {
  // Find recommended treatment objects
  const matchedTreatments = TREATMENTS.filter((t) =>
    concern.recommendedTreatments.includes(t.slug)
  );

  return (
    <article className="luxury-card rounded-2xl p-7 flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg font-bold text-[#EC9C9D]">
            {concern.number}
          </span>
          <span className="text-[10px] font-semibold text-[#D97E80] uppercase tracking-wider bg-[#EC9C9D]/10 px-2.5 py-0.5 rounded-full">
            Clinical Concern
          </span>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#1C1917]">
            {concern.title}
          </h3>
          <p className="text-xs text-[#EC9C9D] font-medium mt-0.5">
            {concern.subtitle}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
          {concern.description}
        </p>

        {/* Clinical Advice Callout */}
        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFD5] space-y-1 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-[#EC9C9D]">
            <Lightbulb className="w-3.5 h-3.5 text-[#EC9C9D]" />
            <span>Practitioner Advice</span>
          </div>
          <p className="text-[#78716C] leading-relaxed">
            {concern.keyAdvice}
          </p>
        </div>
      </div>

      {/* Recommended Treatments Section */}
      <div className="pt-4 border-t border-[#E8DFD5] space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1917] block">
          Recommended Protocols:
        </span>

        <div className="space-y-2">
          {matchedTreatments.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E8DFD5]/80 hover:border-[#EAA59E] transition-colors text-xs"
            >
              <div>
                <span className="font-medium text-[#1C1917] block">
                  {t.title}
                </span>
                <span className="text-[11px] text-[#78716C]">
                  £{t.price}
                </span>
              </div>
              <Link
                href={`/booking?treatment=${t.slug}`}
                className="text-[#EC9C9D] hover:text-[#EC9C9D] font-semibold text-xs flex items-center gap-1"
              >
                <span>Book</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
