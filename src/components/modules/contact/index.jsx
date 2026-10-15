"use client";

import { ContactHero } from "./contact-hero";
import { ContactMethods } from "./contact-methods";
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

      {/* 3. Booking Information & WhatsApp Concierge */}
      <ConciergeBanner />

      {/* 4. Location, Transit & Operating Hours */}
      <ClinicLocation />

      {/* 5. Contact & Visit FAQs */}
      <ContactFAQ faqs={data.faqs} />
    </div>
  );
}

export { ContactHero, ContactMethods, ConciergeBanner, ClinicLocation, ContactFAQ };
