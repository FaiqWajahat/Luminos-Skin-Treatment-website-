import { AboutHero } from "./about-hero";
import { AboutPhilosophy } from "./about-philosophy";
import { PractitionerBio } from "./practitioner-bio";
import { AboutCta } from "./about-cta";

// About Madi & qualifications → short clinic story → book
export function AboutView({ data = {} }) {
  return (
    <div className="flex flex-col">
      <AboutHero
        image={data.heroImage}
        title={data.heroTitle}
        titleHighlight={data.heroTitleHighlight}
        subtitle={data.heroSubtitle}
      />
      <PractitionerBio data={data} />
      <AboutPhilosophy />
      <AboutCta />
    </div>
  );
}
