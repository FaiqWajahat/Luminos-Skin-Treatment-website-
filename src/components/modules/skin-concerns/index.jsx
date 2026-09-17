import { ConcernsHero } from "./concerns-hero";
import { ConcernsGridSection } from "./concerns-grid";

export function SkinConcernsView() {
  return (
    <div className="flex flex-col">
      <ConcernsHero />
      <ConcernsGridSection />
    </div>
  );
}
