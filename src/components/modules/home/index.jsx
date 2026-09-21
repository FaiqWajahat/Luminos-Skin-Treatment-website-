import { HeroSection } from "./hero-section";
import { TrustStrip } from "./trust-strip";
import { ConcernsGrid } from "./concerns-grid";
import { PopularTreatments } from "./popular-treatments";
import { ClinicalProtocol } from "./clinical-protocol";
import { ClinicExperience } from "./clinic-experience";
import { ReviewsStrip } from "./reviews-strip";
import { InstagramFeed } from "./instagram-feed";
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
      <ClinicExperience />
      <ReviewsStrip />
      <InstagramFeed />
      <FaqsSection />
      <ConsultationCta />
    </div>
  );
}
