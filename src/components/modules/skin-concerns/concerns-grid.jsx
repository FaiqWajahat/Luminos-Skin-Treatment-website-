import { SKIN_CONCERNS } from "@/constants/clinic-data";
import { ConcernCard } from "./concern-card";

export function ConcernsGridSection() {
  return (
    <section className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKIN_CONCERNS.map((concern) => (
            <ConcernCard key={concern.id} concern={concern} />
          ))}
        </div>
      </div>
    </section>
  );
}
