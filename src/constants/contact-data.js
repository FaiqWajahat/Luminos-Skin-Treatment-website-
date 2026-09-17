/**
 * Luminous Skin Clinic Leeds - Contact Page Constants
 */

export const CONTACT_CHANNELS = [
  {
    id: "whatsapp",
    title: "Concierge WhatsApp",
    description: "Instant messaging for quick questions, photos, and appointment assistance.",
    value: "+44 7950 774790",
    actionLabel: "Chat on WhatsApp",
    href: "https://tr.ee/zK8bgJAg4I",
    icon: "MessageSquare",
    badge: "Fastest Response",
    badgeVariant: "gold",
    availability: "Replies usually in ~30 mins",
  },
  {
    id: "phone",
    title: "Direct Clinic Line",
    description: "Speak directly with our clinic reception or consultation coordinator.",
    value: "+44 7950 774790",
    actionLabel: "Call Clinic",
    href: "tel:+447950774790",
    icon: "Phone",
    badge: "Direct Line",
    badgeVariant: "neutral",
    availability: "Mon–Sat from 9:30 AM",
  },
  {
    id: "email",
    title: "Clinic Inbox",
    description: "For detailed medical history enquiries, course questions, or press.",
    value: "info@luminousskinclinic.co.uk",
    actionLabel: "Send Email",
    href: "mailto:info@luminousskinclinic.co.uk",
    icon: "Mail",
    badge: "24hr Guarantee",
    badgeVariant: "neutral",
    availability: "Checked daily by clinicians",
  },
  {
    id: "visit",
    title: "Private Wellness Suite",
    description: "Central Leeds LS1 location with private, by-appointment one-to-one rooms.",
    value: "Central Leeds Wellness Suite, LS1",
    actionLabel: "Get Directions",
    href: "https://maps.google.com/?q=Central+Leeds+LS1",
    icon: "MapPin",
    badge: "Open Today",
    badgeVariant: "gold",
    availability: "Strictly by appointment",
  },
];

export const SOCIAL_CHANNELS = [
  {
    name: "WhatsApp",
    handle: "+44 7950 774790",
    href: "https://tr.ee/zK8bgJAg4I",
    description: "Instant messaging and booking assistance",
    type: "whatsapp",
  },
  {
    name: "Instagram",
    handle: "@luminouss_skin_clinic",
    href: "https://tr.ee/wPOUAgbqjK",
    description: "Client results, stories and skincare tips",
    type: "instagram",
  },
  {
    name: "TikTok",
    handle: "@luminous_skin_clinic",
    href: "https://tr.ee/T77hoYIgSw",
    description: "Treatment tutorials and clinic walkthroughs",
    type: "tiktok",
  },
  {
    name: "Facebook",
    handle: "Luminous Skin Clinic",
    href: "https://tr.ee/K4h68VN--4",
    description: "Community updates, reviews and announcements",
    type: "facebook",
  },
];

export const ENQUIRY_TOPICS = [
  { value: "consultation", label: "Skin Consultation & Treatment Advice" },
  { value: "rejuvenating-facial", label: "Rejuvenating Facial Enquiry" },
  { value: "dermaplaning", label: "Dermaplaning & Glow Enquiry" },
  { value: "microneedling", label: "Microneedling Collagen Induction" },
  { value: "led-therapy", label: "LED Phototherapy Session" },
  { value: "packages", label: "Treatment Packages & Course Pricing" },
  { value: "reschedule", label: "Rescheduling Existing Appointment" },
  { value: "other", label: "Other / General Question" },
];

export const SKIN_CONCERNS_LIST = [
  { id: "acne", label: "Acne & Breakouts" },
  { id: "scarring", label: "Acne Scarring & Marks" },
  { id: "aging", label: "Fine Lines & Aging" },
  { id: "pigmentation", label: "Hyperpigmentation & Melasma" },
  { id: "dullness", label: "Dullness & Uneven Tone" },
  { id: "texture", label: "Rough Skin & Large Pores" },
  { id: "redness", label: "Redness & Rosacea" },
  { id: "dehydration", label: "Dryness & Dehydrated Barrier" },
  { id: "sensitive", label: "Sensitive & Reactive Skin" },
];

export const PREFERRED_CONTACT_METHODS = [
  { id: "email", label: "Email", icon: "Mail" },
  { id: "phone", label: "Phone Call", icon: "Phone" },
  { id: "whatsapp", label: "WhatsApp", icon: "MessageSquare" },
];

export const CONSULTATION_TIMEFRAMES = [
  { id: "urgent", label: "This Week", desc: "Priority booking" },
  { id: "two-weeks", label: "Within 2 Weeks", desc: "Flexible slots" },
  { id: "month", label: "Next Month", desc: "Planning ahead" },
  { id: "exploring", label: "Just Inquiring", desc: "Information only" },
];

export const TIME_SLOT_PREFERENCES = [
  { id: "morning", label: "Morning", time: "9:30 AM – 12:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "12:00 PM – 4:00 PM" },
  { id: "evening", label: "Late / Evening", time: "4:00 PM – 6:30 PM" },
];

export const LEEDS_TRANSIT_INFO = [
  {
    mode: "Train",
    title: "Leeds Rail Station",
    duration: "7 min walk",
    details: "Exit via City Square. Head north along Park Row directly towards the Leeds Financial and Wellness Quarter.",
  },
  {
    mode: "Car & Parking",
    title: "Q-Park The Light",
    duration: "3 min walk",
    details: "Safe, secure multi-storey parking available 24/7 at The Light (LS1 8TL). Clinic clients receive a discount ticket on request.",
  },
  {
    mode: "Bus",
    title: "The Headrow & Infirmary St",
    duration: "2 min walk",
    details: "All central Leeds bus routes stop within 200 metres of our private entrance.",
  },
  {
    mode: "Accessibility",
    title: "Step-Free Access",
    duration: "Direct Lift",
    details: "The building features level street access and private elevator access directly to our clinic suite.",
  },
];

export const CONTACT_FAQS = [
  {
    id: "faq-resp-time",
    question: "How quickly will I receive a reply to my enquiry?",
    answer:
      "During clinic hours (Monday to Saturday), our consultation team usually responds within 2 hours. If you submit your enquiry outside of opening hours, we will contact you first thing the following morning.",
  },
  {
    id: "faq-photos",
    question: "Can I send photographs of my skin for advice?",
    answer:
      "Yes. You can message our WhatsApp Concierge (+44 7700 900123) with clear photos in natural light. All photos are handled with strict clinical confidentiality and GDPR compliance. Only certified practitioners review your photos to recommend appropriate treatments.",
  },
  {
    id: "faq-free-phone",
    question: "Can I have a telephone consultation before visiting the clinic?",
    answer:
      "Yes! Simply call our clinic line or drop us a WhatsApp message to arrange a complimentary 10-minute discovery call with a skin practitioner to discuss your skin goals and answer any treatment questions.",
  },
  {
    id: "faq-parking",
    question: "Where is the best place to park when visiting the Leeds clinic?",
    answer:
      "We recommend Q-Park The Light (LS1 8TL) or Trinity Leeds car park, both located within a 3–5 minute walk of our suite. If you require accessible step-free parking, please let us know when confirming your appointment.",
  },
  {
    id: "faq-patch-test",
    question: "Do I need a consultation or patch test before clinical treatments?",
    answer:
      "Yes, for advanced treatments like microneedling and active chemical peels, we conduct a medical consultation and skin assessment to confirm suitability. Rejuvenating facials and dermaplaning can frequently be performed on your initial visit.",
  },
];
