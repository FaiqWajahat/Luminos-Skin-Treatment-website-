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
    href: "https://wa.me/447950774790",
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
    title: "Visit Us",
    description: "We are located near Elland Road Stadium in Leeds, Beeston LS11 with private, by-appointment one-to-one rooms.",
    value: "Near Elland Road Stadium, Beeston, Leeds, LS11",
    actionLabel: "Get Directions",
    href: "https://maps.google.com/?q=Elland+Road+Stadium+Beeston+Leeds+LS11",
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
    href: "https://wa.me/447950774790",
    description: "Instant messaging and booking assistance",
    type: "whatsapp",
  },
  {
    name: "Instagram",
    handle: "@luminouss_skin_clinic",
    href: "https://www.instagram.com/luminouss_skin_clinic",
    description: "Client results, stories and skincare tips",
    type: "instagram",
  },
  {
    name: "TikTok",
    handle: "@luminous_skin_clinic",
    href: "https://www.tiktok.com/@luminous_skin_clinic",
    description: "Treatment tutorials and clinic walkthroughs",
    type: "tiktok",
  },
  {
    name: "Facebook",
    handle: "Luminous Skin Clinic",
    href: "https://www.facebook.com/share/1CYA2nkRLr/?mibextid=wwXIfr",
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
    mode: "Car & Parking",
    title: "Elland Road & Beeston Parking",
    duration: "Convenient Parking",
    details: "Safe visitor and on-street parking available near Elland Road Stadium in Beeston (LS11) with swift motorway access via M621 (Junctions 1 & 2).",
  },
  {
    mode: "Bus",
    title: "Beeston & Elland Road Buses",
    duration: "2 min walk",
    details: "Frequent buses from Leeds City Centre (routes 51, 52, 55, 65, 75, 86) stop within brief walking distance of our private entrance.",
  },
  {
    mode: "Train",
    title: "Leeds Rail Station",
    duration: "8-10 min drive / taxi",
    details: "A quick 8-10 minute taxi or direct connecting bus ride from Leeds City Rail Station directly to our Beeston sanctuary.",
  },
  {
    mode: "Accessibility",
    title: "Step-Free Access",
    duration: "Ground Floor",
    details: "Level step-free entrance with accessible facilities designed for your comfort and convenience.",
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
      "Yes. You can message our WhatsApp Concierge (+44 7950 774790) with clear photos in natural light. All photos are handled with strict clinical confidentiality and GDPR compliance. Only certified practitioners review your photos to recommend appropriate treatments.",
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
      "Convenient visitor and on-street parking is readily available near Elland Road Stadium in Beeston (LS11), situated within a very short walk of our private clinic suite. If you require any accessibility guidance, please let us know in advance.",
  },
  {
    id: "faq-patch-test",
    question: "Do I need a consultation or patch test before clinical treatments?",
    answer:
      "Yes, for advanced treatments like microneedling and active chemical peels, we conduct a medical consultation and skin assessment to confirm suitability. Rejuvenating facials and dermaplaning can frequently be performed on your initial visit.",
  },
];
