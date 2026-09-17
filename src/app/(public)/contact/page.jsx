import { ContactView } from "@/components/modules/contact";

export const metadata = {
  title: "Contact & Location | Luminous Skin Clinic Leeds",
  description:
    "Get in touch with our Leeds clinical team for bespoke facial consultations, skin assessments, and appointment queries. View our central Leeds suite address, opening hours, transit directions, and contact channels.",
  keywords: [
    "Luminous Skin Clinic contact",
    "Leeds facial clinic address",
    "Skin consultation Leeds",
    "Dermaplaning Leeds booking",
    "Microneedling clinic LS1",
    "Leeds aesthetics enquiry",
  ],
  openGraph: {
    title: "Contact & Consultations | Luminous Skin Clinic Leeds",
    description:
      "Get in touch with our Leeds clinical team. Private consultations, skin assessments, opening hours, and central Leeds directions.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactView />;
}
