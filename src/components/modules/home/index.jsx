import { HeroSection } from "./hero-section";
import { TrustStrip } from "./trust-strip";
import { ConcernsGrid } from "./concerns-grid";
import { PopularTreatments } from "./popular-treatments";
import { ClinicalProtocol } from "./clinical-protocol";
import { PractitionerSplit } from "./practitioner-split";
import { ReviewsStrip } from "./reviews-strip";
import { FaqsSection } from "./faqs-section";
import { ConsultationCta } from "./consultation-cta";

export function HomeView() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TrustStrip />
      <ConcernsGrid />
      <PopularTreatments />
      <ClinicalProtocol />
      <PractitionerSplit />
      <ReviewsStrip />
      <FaqsSection />
      <ConsultationCta />
    </div>
  );
}
