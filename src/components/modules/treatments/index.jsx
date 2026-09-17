import { TreatmentsHero } from "./treatments-hero";
import { TreatmentsList } from "./treatments-list";

export function TreatmentsView() {
  return (
    <div className="flex flex-col">
      <TreatmentsHero />
      <TreatmentsList />
    </div>
  );
}
