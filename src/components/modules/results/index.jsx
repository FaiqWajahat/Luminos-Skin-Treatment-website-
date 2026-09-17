import { ResultsHero } from "./results-hero";
import { ResultsGallery } from "./results-gallery";
import { ResultsNotice } from "./results-notice";

export function ResultsView() {
  return (
    <div className="flex flex-col">
      <ResultsHero />
      <ResultsGallery />
      <ResultsNotice />
    </div>
  );
}
