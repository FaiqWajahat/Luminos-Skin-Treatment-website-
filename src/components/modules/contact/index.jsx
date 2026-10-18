import Link from "next/link";
import { ArrowRight, Clock, Mail, Phone } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";
import { PageHero, heroText } from "@/components/shared/page-hero";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { CLINIC_INFO } from "@/constants/clinic-data";

const mapQuery = encodeURIComponent(CLINIC_INFO.mapQuery);

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Call / Text",
    value: CLINIC_INFO.phoneDisplay,
    href: `tel:${CLINIC_INFO.phone.replace(/\s/g, "")}`,
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Chat with me directly",
    href: CLINIC_INFO.socials.whatsapp,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: CLINIC_INFO.email,
    href: `mailto:${CLINIC_INFO.email}`,
  },
];

export function ContactView() {
  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Get in Touch"
        title="Contact & Booking"
        image="/contact_hero.jpeg"
        imagePosition="object-[center_38%]"
        alt="Inside Luminous Skin Clinic"
      >
        <p className={heroText}>
          I’d love to hear from you! Whether you have a question, want more information or would like to book
          your appointment, please get in touch.
        </p>
      </PageHero>

      <section className="py-16 lg:py-20 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Contact & booking details */}
          <FadeIn className="lg:col-span-6 space-y-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">Contact Details</h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-3.5"
                  >
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#EC9C9D] text-white shrink-0 group-hover:bg-[#D97E80] transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[#1C1917]">{label}</span>
                      <span className="block text-sm text-[#57534E] break-words group-hover:text-[#D97E80] transition-colors">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Booking */}
            <div className="rounded-2xl bg-white border border-[#E8DFD5] p-6 space-y-5">
              <div className="flex items-start gap-3.5">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FBEDEC] text-[#D97E80] shrink-0">
                  <Clock className="w-5 h-5" />
                </span>
                <div className="flex-1 text-sm">
                  <h2 className="font-semibold text-[#1C1917]">Opening Hours</h2>
                  <dl>
                    {CLINIC_INFO.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-4 py-1 border-b border-dashed border-[#E8DFD5] last:border-none">
                        <dt className="text-[#57534E]">{h.days}</dt>
                        <dd className="font-medium text-[#1C1917]">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <Link
                href="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] shadow-md hover:shadow-lg hover:brightness-105 transition-all"
              >
                Book Your Appointment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          {/* Map */}
          <FadeIn delay={0.1} className="lg:col-span-6 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">Find Us</h2>
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[460px] rounded-3xl overflow-hidden border border-[#E8DFD5] shadow-sm bg-[#F3ECE6]">
              <iframe
                title="Luminous Skin Clinic location map"
                src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <p className="font-serif italic text-lg text-center text-[#D97E80]">
              A peaceful space for your skin and wellbeing.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
