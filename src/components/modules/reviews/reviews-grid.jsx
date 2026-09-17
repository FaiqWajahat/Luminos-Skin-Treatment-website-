import { REVIEWS } from "@/constants/clinic-data";
import { Star, CheckCircle } from "lucide-react";

export function ReviewsGrid() {
  return (
    <section className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="luxury-card rounded-2xl p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#EC9C9D]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#EC9C9D]" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#D97E80] bg-[#EC9C9D]/10 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3 text-[#EC9C9D]" />
                    Verified
                  </span>
                </div>

                <p className="text-sm text-[#443E38] leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>

                <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E8DFD5] text-xs text-[#EC9C9D] font-medium">
                  Key Highlight: &ldquo;{rev.highlight}&rdquo;
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DFD5] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-[#1C1917]">{rev.author}</h4>
                  <span className="text-[#78716C]">{rev.treatment}</span>
                </div>
                <span className="text-[11px] text-[#78716C]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
