import { AboutHero } from "./about-hero";
import { AboutPhilosophy } from "./about-philosophy";
import { ClinicValues } from "./clinic-values";
import { PractitionerBio } from "./practitioner-bio";
import { ClinicSanctuary } from "./clinic-sanctuary";
import { AboutCta } from "./about-cta";

export function AboutView() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutPhilosophy />
      <ClinicValues />
      <PractitionerBio />
      <ClinicSanctuary />
      <AboutCta />
    </div>
  );
}
