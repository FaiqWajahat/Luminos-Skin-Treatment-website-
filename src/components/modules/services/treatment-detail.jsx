import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronRight, Clock, Info, MapPin, Repeat, Sparkles } from "lucide-react";
import { CLINIC_INFO } from "@/constants/clinic-data";
import { formatTreatmentPrice, getCategoryByTitle } from "@/constants/treatment-catalog";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { PetalMark } from "@/components/shared/floral-accent";
import { TreatmentImage } from "./treatment-image";
import { TreatmentCard } from "./treatment-card";
import { MobileBookingBar } from "./mobile-booking-bar";

const primaryAction = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#EC9C9D]/25 transition-all hover:brightness-105 hover:shadow-lg active:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97E80] motion-reduce:transition-none";
const secondaryAction = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#F0CECB] bg-[#FFF8F7] px-5 py-3 text-sm font-medium text-[#57534E] transition-colors hover:border-[#EC9C9D] hover:bg-[#FCECEA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97E80]";

function splitPriceOption(option) {
  const index = option.lastIndexOf(" — ");
  if (index === -1) return { label: option, value: "" };
  return { label: option.slice(0, index), value: option.slice(index + 3) };
}

function Section({ id, title, description, children, showAccent = true }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-b border-[#F0EAE7] pb-9 sm:pb-12">
      <div className="mb-6">
        {showAccent && <span aria-hidden="true" className="mb-4 block h-0.5 w-9 rounded-full bg-[#EC9C9D]" />}
        <h2 id={`${id}-title`} className="font-serif text-2xl font-semibold tracking-tight text-[#1C1917] sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 text-sm leading-relaxed text-[#78716C]">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function BookingLink({ href, children = "Book this treatment", className = "" }) {
  return (
    <Link href={href} className={`${primaryAction} ${className}`}>
      <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />{children}
    </Link>
  );
}

export function TreatmentDetail({ treatment, related = [] }) {
  const category = getCategoryByTitle(treatment.category);
  const bookingHref = `/booking?treatment=${encodeURIComponent(treatment.slug)}`;
  const servicesHref = category ? `/services#${category.slug}` : "/services";
  const price = formatTreatmentPrice(treatment);
  const journey = treatment.journey || [];
  const benefits = treatment.benefits || [];
  const aftercare = treatment.aftercare || [];
  const options = (treatment.priceOptions || []).filter(Boolean).map(splitPriceOption);
  const pricedOptions = options.filter((option) => option.value);
  const priceNotes = options.filter((option) => !option.value);
  const whatsappHref = `${CLINIC_INFO.socials.whatsapp}?text=${encodeURIComponent(`Hello Luminous Skin Clinic, I'd like to ask about ${treatment.title}.`)}`;
  const sections = [
    ...(benefits.length || treatment.idealFor ? [{ id: "benefits", label: "Benefits & suitability" }] : []),
    ...(journey.length ? [{ id: "experience", label: "Your experience" }] : []),
    { id: "pricing", label: "Time & pricing" },
    ...(aftercare.length || treatment.frequency ? [{ id: "aftercare", label: "Aftercare" }] : []),
  ];

  return (
    <article className="bg-white text-[#292524] [overflow-wrap:anywhere]">
      <header id="treatment-overview" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-9 pt-5 sm:px-6 sm:pb-12 lg:px-8 lg:pt-7">
          <nav aria-label="Breadcrumb" className="mb-7 sm:mb-9">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-6 text-[#78716C]">
              <li><Link href="/services" className="inline-flex min-h-8 items-center gap-1.5 transition-colors hover:text-[#292524]"><ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />All treatments</Link></li>
              {category && <><li aria-hidden="true"><ChevronRight className="h-3 w-3 text-[#C4BAB4]" /></li><li><Link href={servicesHref} className="hover:text-[#292524]">{category.title}</Link></li></>}
              <li aria-hidden="true" className="hidden sm:block"><ChevronRight className="h-3 w-3 text-[#C4BAB4]" /></li>
              <li aria-current="page" className="hidden text-[#57534E] sm:block">{treatment.title}</li>
            </ol>
          </nav>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#78716C]">
                <PetalMark className="h-4 w-4 text-[#EC9C9D]" />{category?.title || "Luminous treatments"}
              </div>
              <h1 className="max-w-2xl text-balance font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-[#1C1917] sm:text-5xl lg:text-[3.25rem]">{treatment.title}</h1>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#57534E] sm:text-base">{treatment.shortDescription}</p>
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-y border-[#F0EAE7] py-5 sm:gap-x-10">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#78716C]">Treatment price</dt>
                  <dd className="mt-1.5 text-xl font-semibold tracking-tight text-[#292524]">{price}</dd>
                </div>
                {treatment.duration && <div><dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#78716C]">Appointment time</dt><dd className="mt-1.5 flex items-center gap-2 text-base font-medium"><Clock className="h-4 w-4 text-[#D97E80]" aria-hidden="true" />{treatment.duration}</dd></div>}
              </dl>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <BookingLink href={bookingHref} />
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={secondaryAction}><WhatsAppIcon className="h-4 w-4 text-[#237A4B]" />Ask a question<span className="sr-only"> on WhatsApp (opens in a new tab)</span></a>
              </div>
              <p className="mt-4 flex items-start gap-1.5 text-xs leading-5 text-[#78716C]"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D97E80]" aria-hidden="true" />{CLINIC_INFO.address}</p>
            </div>
            <div className="min-w-0 lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#FFF5F3] sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[510px]">
                <TreatmentImage src={treatment.image} alt={treatment.title} sizes="(max-width: 1023px) 100vw, 440px" priority />
              </div>
              <p className="mt-3 flex items-center justify-center gap-2 text-[11px] tracking-wide text-[#78716C]"><PetalMark className="h-3.5 w-3.5 text-[#EC9C9D]" />Luminous Skin Clinic · Leeds</p>
            </div>
          </div>
        </div>
      </header>

      <nav aria-label="On this page" className="border-y border-[#F0EAE7] bg-[#FFFBFA]">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          <span className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#78716C] sm:block">Explore treatment</span>
          <ul className="flex flex-wrap gap-x-5 sm:gap-x-7">
            {sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="inline-flex min-h-12 items-center border-b-2 border-transparent py-3 text-xs font-medium text-[#57534E] transition-colors hover:border-[#EC9C9D] hover:text-[#292524] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97E80] sm:text-sm">{section.label}</a></li>)}
          </ul>
        </div>
      </nav>

      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-14 lg:px-8">
        <div className="min-w-0 space-y-9 sm:space-y-12 lg:col-span-8">
          {(benefits.length > 0 || treatment.idealFor) && <Section id="benefits" showAccent={false} title="Benefits & suitability">
            {benefits.length > 0 && <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {benefits.map((benefit, index) => <li key={index} className="flex items-start gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FCECEA]"><Check className="h-3.5 w-3.5 text-[#57534E]" aria-hidden="true" /></span><span className="text-[15px] leading-6 text-[#57534E]">{benefit}</span></li>)}
            </ul>}
            {treatment.idealFor && <div className={`${benefits.length ? "mt-7" : ""} rounded-xl border border-[#F3E2DF] bg-[#FFF8F7] p-5 sm:p-6`}><h3 className="mb-2 flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-[#D97E80]" aria-hidden="true" />Who is this for?</h3><p className="text-[15px] leading-7 text-[#57534E]">{treatment.idealFor}</p></div>}
          </Section>}

          {journey.length > 0 && <Section id="experience" showAccent={false} title="Your treatment, step by step" description="A guide to what happens during your appointment.">
            <ol>
              {journey.map((step, index) => <li key={index} className="relative flex gap-4 pb-6 last:pb-0 before:absolute before:bottom-0 before:left-[17px] before:top-9 before:w-px before:bg-[#F3DAD7] last:before:hidden"><span aria-hidden="true" className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#F0D0CC] bg-[#FFF8F7] text-xs font-semibold tabular-nums text-[#57534E]">{String(index + 1).padStart(2, "0")}</span><p className="pt-1.5 text-[15px] leading-7 text-[#57534E]">{step}</p></li>)}
            </ol>
          </Section>}

          <Section id="pricing" showAccent={false} title="Time & pricing">
            <div className="overflow-hidden rounded-2xl border border-[#F0E3DF]">
              <dl className="flex flex-wrap items-center justify-between gap-5 bg-[#FFF8F7] p-5 sm:p-6">
                <div><dt className="text-xs text-[#78716C]">Treatment price</dt><dd className="mt-1 text-2xl font-semibold tracking-tight">{price}</dd></div>
                {treatment.duration && <div><dt className="text-xs text-[#78716C]">Appointment time</dt><dd className="mt-1 flex items-center gap-2 text-sm font-medium"><Clock className="h-4 w-4 text-[#D97E80]" aria-hidden="true" />{treatment.duration}</dd></div>}
              </dl>
              {pricedOptions.length > 0 && <dl className="divide-y divide-[#F0EAE7] border-t border-[#F0E3DF]">
                {pricedOptions.map(({ label, value }, index) => <div key={index} className="grid gap-1.5 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-5 sm:px-6"><dt className="text-sm font-medium leading-6">{label}</dt><dd className="text-sm leading-6 text-[#57534E] sm:text-right">{value}</dd></div>)}
              </dl>}
            </div>
            {priceNotes.length > 0 && <ul className="mt-4 space-y-2">{priceNotes.map(({ label }, index) => <li key={index} className="flex items-start gap-2 text-sm leading-6 text-[#57534E]"><Info className="mt-1 h-4 w-4 shrink-0 text-[#D97E80]" aria-hidden="true" />{label}</li>)}</ul>}
          </Section>

          {(aftercare.length > 0 || treatment.frequency) && <Section id="aftercare" showAccent={false} title="Aftercare & your next visit">
            {aftercare.length > 0 && <div><h3 className="mb-4 text-sm font-semibold">Important information & aftercare</h3><ul className="space-y-3">{aftercare.map((item, index) => <li key={index} className="flex items-start gap-3 text-[15px] leading-7 text-[#57534E]"><span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EC9C9D]" />{item}</li>)}</ul></div>}
            {treatment.frequency && <div className={`${aftercare.length ? "mt-6" : ""} flex items-start gap-3 rounded-xl border border-[#F3E2DF] bg-[#FFF8F7] p-5`}><Repeat className="mt-0.5 h-5 w-5 shrink-0 text-[#D97E80]" aria-hidden="true" /><div><h3 className="text-sm font-semibold">Recommended frequency</h3><p className="mt-1 text-sm leading-6 text-[#57534E]">{treatment.frequency}</p></div></div>}
          </Section>}
        </div>

        <aside aria-label="Book your treatment" className="hidden min-w-0 lg:sticky lg:top-24 lg:col-span-4 lg:block">
          <div className="overflow-hidden rounded-2xl border border-[#F0E3DF] bg-white shadow-[0_12px_36px_-24px_rgba(28,25,23,0.2)]">
            <div className="border-b border-[#F3E2DF] bg-[#FFF8F7] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#78716C]">Your appointment</p>
              <h2 className="mt-3 text-lg font-semibold leading-6">{treatment.title}</h2>
              <p className="mt-4 text-2xl font-semibold tracking-tight">{price}</p>
              {treatment.duration && <p className="mt-2 flex items-center gap-2 text-sm text-[#57534E]"><Clock className="h-4 w-4 text-[#D97E80]" aria-hidden="true" />{treatment.duration}</p>}
              {pricedOptions.length > 0 && <a href="#pricing" className="mt-3 inline-flex min-h-8 items-center gap-1 text-xs text-[#57534E] underline decoration-[#EC9C9D] underline-offset-4">View treatment options<ChevronRight className="h-3 w-3" aria-hidden="true" /></a>}
            </div>
            <div className="space-y-3 p-6">
              <BookingLink href={bookingHref} className="w-full" />
              <p className="text-center text-xs leading-5 text-[#78716C]">Choose your date and time on the next step.</p>
              <div className="border-t border-[#F0EAE7] pt-5">
                <p className="mb-3 text-center text-sm text-[#57534E]">Have a question before booking?</p>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`${secondaryAction} w-full`}><WhatsAppIcon className="h-4 w-4 text-[#237A4B]" />Ask on WhatsApp<span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </div>
          </div>
          <p className="mt-4 flex items-start gap-2 px-2 text-xs leading-5 text-[#78716C]"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D97E80]" aria-hidden="true" />{CLINIC_INFO.address}</p>
        </aside>
      </div>

      <section aria-labelledby="booking-heading" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-[#F3DAD7] bg-[#FFF5F3] p-6 sm:p-9 lg:p-10">
          <PetalMark className="pointer-events-none absolute -bottom-10 -right-8 h-48 w-48 text-[#F7E1DE]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#78716C]">A little time for you</p><h2 id="booking-heading" className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">Ready to book your visit?</h2><p className="mt-3 text-sm leading-6 text-[#57534E]">Choose your appointment for {treatment.title}, or get in touch if you have a question.</p></div>
            <div className="flex shrink-0 flex-col items-stretch gap-3"><BookingLink href={bookingHref} /><Link href={servicesHref} className="inline-flex min-h-11 items-center justify-center gap-2 text-sm text-[#57534E] hover:text-[#292524]"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Explore all treatments</Link></div>
          </div>
        </div>
      </section>

      {related.length > 0 && <section aria-labelledby="related-heading" className="border-t border-[#F0EAE7] bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-10 sm:px-6 sm:pt-12 sm:pb-12 lg:px-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#78716C]">Continue exploring</p><h2 id="related-heading" className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">More treatments for you</h2>{category && <p className="mt-2 text-sm text-[#78716C]">Explore more {category.title.toLowerCase()}.</p>}</div><Link href={servicesHref} className={secondaryAction}>View all treatments<ArrowRight className="h-4 w-4 text-[#D97E80]" aria-hidden="true" /></Link></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <TreatmentCard key={item.slug} treatment={item} variant="related" />)}</div>
        </div>
      </section>}
      <div id="treatment-end" className="h-px" aria-hidden="true" />
      <MobileBookingBar key={treatment.slug}>
        <div className="min-w-0 flex-1"><p className="truncate text-[11px] text-[#78716C]">{treatment.title}</p><p className="mt-0.5 text-sm font-semibold leading-5">{price}</p></div>
        <BookingLink href={bookingHref} className="shrink-0 px-4">Book now</BookingLink>
      </MobileBookingBar>
    </article>
  );
}
