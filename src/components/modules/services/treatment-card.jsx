import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatTreatmentPrice } from "@/constants/treatment-catalog";
import { TreatmentImage } from "./treatment-image";

export function TreatmentCard({ treatment, variant = "default" }) {
  const isRelated = variant === "related";
  return (
    <Link
      href={`/services/${treatment.slug}`}
      className={`group flex flex-col h-full rounded-2xl overflow-hidden bg-white border shadow-xs hover:shadow-lg hover:shadow-[#EC9C9D]/10 hover:border-[#EC9C9D]/50 hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC9C9D] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${isRelated ? "border-[#F0E3DF]" : "border-[#E8DFD5]"}`}
    >
      <div className={`relative overflow-hidden ${isRelated ? "aspect-[16/10] bg-[#FFF8F7]" : "aspect-[4/3] bg-[#F3ECE6]"}`}>
        <TreatmentImage
          src={treatment.image}
          alt={treatment.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3">
        <h3 className={`font-serif text-lg sm:text-xl font-bold text-[#1C1917] leading-snug ${isRelated ? "line-clamp-2" : ""}`}>
          {treatment.title}
        </h3>
        <p className="text-sm text-[#44403C] leading-relaxed line-clamp-2">
          {treatment.shortDescription}
        </p>

        <div className={`mt-auto pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${isRelated ? "border-[#F0E3DF]" : "border-[#E8DFD5]/80"}`}>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-semibold text-[#1C1917]">{formatTreatmentPrice(treatment)}</span>
            {treatment.duration && (
              <span className="inline-flex items-center gap-1 text-xs text-[#57534E]">
                <Clock className="w-3 h-3 text-[#EC9C9D]" />
                {treatment.duration}
              </span>
            )}
          </div>
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold shrink-0 ${isRelated ? "min-h-10 rounded-lg border border-[#F0CECB] bg-[#FFF8F7] px-3 py-2 text-[#57534E] group-hover:border-[#EC9C9D] group-hover:bg-[#FCECEA] transition-colors" : "text-[#D97E80]"}`}>
            View details
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
