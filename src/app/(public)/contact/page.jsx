import { ContactView } from "@/components/modules/contact";
import { SiteClosing } from "@/components/shared/site-closing";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Contact & Booking | Luminous Skin Clinic Leeds",
  description:
    "Contact Luminous Skin Clinic in Leeds LS11 by phone, WhatsApp or email, see opening hours and book your appointment.",
};

export default function ContactPage() {
  return (
    <>
      <ContactView />
      <SiteClosing />
    </>
  );
}
