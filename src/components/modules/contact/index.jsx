"use client";

import { ContactHero } from "./contact-hero";
import { ContactMethods } from "./contact-methods";
import { VisitExperience } from "./visit-experience";
import { ConciergeBanner } from "./concierge-banner";
import { ClinicLocation } from "./clinic-location";
import { ContactFAQ } from "./contact-faq";

export function ContactView({ data = {} }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. Hero & Trust Metrics */}
      <ContactHero />

      {/* 2. Direct Channels (Phone, WhatsApp, Email, Suite) */}
      <ContactMethods />

      {/* 3. The 1:1 Clinic Experience & Patient Journey */}
      <VisitExperience />

      {/* 4. Instant Online Booking & WhatsApp Concierge */}
      <ConciergeBanner />

      {/* 5. Leeds Clinic Sanctuary, Transit & Operating Hours */}
      <ClinicLocation />

      {/* 6. Contact & Visit FAQs */}
      <ContactFAQ faqs={data.faqs} />
    </div>
  );
}

export { ContactHero, ContactMethods, VisitExperience, ConciergeBanner, ClinicLocation, ContactFAQ };
