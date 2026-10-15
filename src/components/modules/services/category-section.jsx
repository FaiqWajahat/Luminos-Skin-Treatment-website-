import { FadeIn } from "@/components/shared/animations";
import { PetalMark } from "@/components/shared/floral-accent";
import { TreatmentCard } from "./treatment-card";

export function CategorySection({ category, number }) {
  if (category.treatments.length === 0) return null;

  return (
    <section id={category.slug} className="scroll-mt-44">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 mb-8 border-b border-[#E8DFD5]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#EC9C9D]">
              <PetalMark className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                {String(number).padStart(2, "0")}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
              {category.title}
            </h2>
            <p className="text-sm text-[#44403C]">{category.summary}</p>
          </div>
          <span className="text-xs font-medium text-[#57534E] shrink-0">
            {category.treatments.length} {category.treatments.length === 1 ? "treatment" : "treatments"}
          </span>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {category.treatments.map((treatment, i) => (
          <FadeIn key={treatment.slug} delay={Math.min(i, 5) * 0.05} className="h-full">
            <TreatmentCard treatment={treatment} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
