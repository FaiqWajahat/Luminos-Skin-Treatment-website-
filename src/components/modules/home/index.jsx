import { HeroSection } from "./hero-section";
import { TrustStrip } from "./trust-strip";
import { ConcernsGrid } from "./concerns-grid";
import { PopularTreatments } from "./popular-treatments";
import { ClinicalProtocol } from "./clinical-protocol";
import { ClinicExperience } from "./clinic-experience";
import { ClinicVideos } from "./clinic-videos";
import { ReviewsStrip } from "./reviews-strip";
import { InstagramFeed } from "./instagram-feed";
import { FaqsSection } from "./faqs-section";
import { ConsultationCta } from "./consultation-cta";

export function HomeView({ data = {} }) {
  return (
    <div className="flex flex-col">
      <HeroSection 
        image={data.heroImage} 
        title={data.heroTitle}
        titleHighlight={data.heroTitleHighlight}
        subtitle={data.heroSubtitle}
        highlight={data.heroHighlight}
      />
      <TrustStrip />
      <ConcernsGrid />
      <PopularTreatments />
      <ClinicalProtocol />
      <ClinicExperience />
      <ClinicVideos videos={data.videos} />
      <ReviewsStrip />
      <InstagramFeed />
      <FaqsSection faqs={data.faqs} image={data.consultantLoungeImage} />
      <ConsultationCta />
    </div>
  );
}
