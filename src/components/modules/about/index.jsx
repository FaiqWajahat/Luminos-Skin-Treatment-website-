import { AboutHero } from "./about-hero";
import { AboutPhilosophy } from "./about-philosophy";
import { ClinicValues } from "./clinic-values";
import { PractitionerBio } from "./practitioner-bio";
import { ClinicSanctuary } from "./clinic-sanctuary";
import { AboutCta } from "./about-cta";
import { ClinicLocation } from "@/components/modules/contact/clinic-location";

export function AboutView({ data = {} }) {
  return (
    <div className="flex flex-col">
      <AboutHero 
        image={data.heroImage} 
        title={data.heroTitle}
        titleHighlight={data.heroTitleHighlight}
        subtitle={data.heroSubtitle}
        highlight={data.heroHighlight}
      />
      <AboutPhilosophy />
      <ClinicValues />
      <PractitionerBio data={data} />
      <ClinicSanctuary />
      <ClinicLocation />
      <AboutCta />
    </div>
  );
}
