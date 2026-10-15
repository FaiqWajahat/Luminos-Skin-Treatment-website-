import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import { CLINIC_INFO } from "@/constants/clinic-data";
import { FadeIn } from "@/components/shared/animations";
import { FloralDivider, PetalMark } from "@/components/shared/floral-accent";
import { WhatsAppIcon } from "@/components/shared/social-icons";

export function BookingCta() {
  return (
    <section className="pt-20 lg:pt-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[2rem] border border-[#EC9C9D]/25 shadow-2xl shadow-[#D97E80]/10">
            {/* Copy */}
            <div className="relative bg-gradient-to-br from-[#FDF4F3] via-[#FBEAE8] to-[#F7DAD8] px-6 py-12 sm:px-12 sm:py-16 lg:px-14 lg:py-20 order-2 lg:order-1">
              <PetalMark className="absolute -left-8 -bottom-10 w-44 h-44 text-white/60 pointer-events-none" />

              <div className="relative space-y-6 max-w-lg">
                <FloralDivider />
                <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[#D97E80]">
                  Book Your Visit
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#1C1917] leading-[1.12]">
                  Ready to let your skin <em className="italic font-normal text-[#D97E80]">glow?</em>
                </h2>
                <p className="text-base sm:text-lg text-[#44403C] leading-relaxed">
                  Choose your treatment and book a calm, one-to-one appointment at our private clinic in Leeds.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] shadow-lg shadow-[#D97E80]/25 hover:brightness-105 hover:-translate-y-0.5 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </Link>
                  <a
                    href={CLINIC_INFO.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-[#1C1917] bg-white border border-[#E8DFD5] hover:border-[#25D366]/50 hover:-translate-y-0.5 shadow-sm transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    Message on WhatsApp
                  </a>
                </div>

                <div className="pt-6 border-t border-[#EC9C9D]/25 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#44403C]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#D97E80] shrink-0 mt-0.5" />
                    <span>{CLINIC_INFO.address}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#D97E80] shrink-0 mt-0.5" />
                    <span>
                      Mon – Sat, from 9:30 AM
                      <br />
                      Sunday by appointment
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo */}
            <div className="relative min-h-[18rem] sm:min-h-[22rem] lg:min-h-full order-1 lg:order-2">
              <Image
                src="/home-hero-secimg.png"
                alt="A calm treatment room at Luminous Skin Clinic"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/30 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white px-4 py-3 shadow-xl">
                <div className="flex gap-0.5 text-[#EC9C9D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#1C1917]">Loved by clients across Leeds</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
