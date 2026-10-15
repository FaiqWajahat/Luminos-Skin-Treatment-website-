/**
 * Luminous Skin Clinic - Treatment Catalogue
 *
 * The five service categories and every treatment the clinic offers.
 * This is the default catalogue: it seeds the database and is shown on the
 * public site until the database holds treatments in these categories.
 *
 * Treatment fields (shown on the detail page in this order):
 *   title, shortDescription, journey[], benefits[], idealFor,
 *   duration, price / priceOptions[], aftercare[], frequency
 *
 * `price` is the starting price in GBP (0 = priced at consultation).
 * Empty fields are simply not shown on the treatment page.
 */

const CLOUD = "https://res.cloudinary.com/x4j3r8wq/image/upload";

const IMAGES = {
  microneedling: `${CLOUD}/v1790104711/luminous_clinic/f9immgcruvktqynqzmry.png`,
  acne: `${CLOUD}/v1790105139/luminous_clinic/hgwedwst2gbildriuxsi.png`,
  enzymePeel: `${CLOUD}/v1790081218/luminous_clinic/crfcq1wjkwc16hvcaddj.png`,
  oxygen: `${CLOUD}/v1790080949/luminous_clinic/oqexqsyyqzijpq9g2qln.png`,
  ultrasound: `${CLOUD}/v1790104403/luminous_clinic/fhsvbwfqhfkdxvvd5ypm.png`,
  rf: `${CLOUD}/v1790080445/luminous_clinic/ouedmo6ck43fxi5gdyp9.png`,
  rfFacial: `${CLOUD}/v1790104956/luminous_clinic/f2uxhbei4wg8wneobmuj.png`,
  highFrequency: `${CLOUD}/v1790081783/luminous_clinic/ha9elyq9hfnkpm2iqmwf.png`,
  led: `${CLOUD}/v1790082715/luminous_clinic/sptyno0nnhjpe2uodzyb.jpg`,
  signatureFacial: `${CLOUD}/v1789813676/luminous_clinic/ametysyd1aimuhokcha1.png`,
  dermaplaning: `${CLOUD}/v1789814265/luminous_clinic/hvojoeqj1tv3729ug2f3.png`,
  facialMassage: `${CLOUD}/v1789935964/luminous_clinic/rwmdjv2fkpztyevuzbth.png`,
  facialMassageAlt: `${CLOUD}/v1790083918/luminous_clinic/ggdesu42dj1wu7lqpdpt.png`,
  guaSha: `${CLOUD}/v1790082870/luminous_clinic/mis2hcdjz9m0jwvbsukt.png`,
  swedish: `${CLOUD}/v1790105352/luminous_clinic/yst0kcc7mgk9xrk6atqn.png`,
  hotStones: `${CLOUD}/v1789814847/luminous_clinic/jqvcpzqdtbmrthdpcinh.png`,
  woodSculpt: `${CLOUD}/v1790082008/luminous_clinic/zltt7pzifogwbuxxm4cf.png`,
  reflexology: `${CLOUD}/v1790081434/luminous_clinic/weifmvllxzwuepl70ssj.png`,
  brows: `${CLOUD}/v1790083004/luminous_clinic/m8arqkux3c3rjro4jqnx.png`,
  waxing: `${CLOUD}/v1790083160/luminous_clinic/pbptdgyrqbum5wxxchej.png`,
  nails: `${CLOUD}/v1790083437/luminous_clinic/w9naafanto8qttfdujn0.png`,
  backPolish: `${CLOUD}/v1790082413/luminous_clinic/smvh8jd2hrdyqmgjmnfo.png`,
};

export const TREATMENT_CATEGORIES = [
  {
    slug: "advanced-facial-treatments",
    title: "Advanced Facial Treatments",
    summary: "Results-driven treatments for clarity, renewal and lasting radiance.",
    image: IMAGES.microneedling,
  },
  {
    slug: "ritual-facials",
    title: "Ritual Facials",
    summary: "Signature facials that cleanse, nourish and restore your glow.",
    image: IMAGES.signatureFacial,
  },
  {
    slug: "facial-massage-therapies",
    title: "Facial Massage Therapies",
    summary: "Hands-on sculpting massages to lift, de-puff and relax.",
    image: IMAGES.guaSha,
  },
  {
    slug: "relaxation-therapies",
    title: "Relaxation Therapies",
    summary: "Calming body therapies to release tension and restore balance.",
    image: IMAGES.hotStones,
  },
  {
    slug: "other-treatments",
    title: "Other Treatments",
    summary: "Brows, threading, waxing, nails and back care.",
    image: IMAGES.nails,
  },
];

const [ADVANCED, RITUAL, MASSAGE, RELAXATION, OTHER] = TREATMENT_CATEGORIES.map((c) => c.title);

// Shared by every facial massage
const FACIAL_MASSAGE_JOURNEY = [
  "Double cleanse",
  "Warm towel",
  "Facial massage",
  "Relaxing hand massage",
  "10-minute mask",
  "SPF finish",
];
const FACIAL_MASSAGE_ADD_ONS = "Add-ons: High Frequency or Hydrating Sheet Mask + LED — +£10 each";

export const CATALOG_TREATMENTS = [
  // ── 1. Advanced Facial Treatments ─────────────────────────
  {
    slug: "micro-hydro-dermabrasion",
    title: "Micro/Hydro Dermabrasion",
    category: ADVANCED,
    image: "/home-treatment-2.png",
    shortDescription:
      "A gentle resurfacing facial combining micro and hydro dermabrasion to lift away dead skin cells and reveal smoother, brighter-looking skin.",
    journey: [
      "Skin consultation and double cleanse",
      "Micro or hydro dermabrasion exfoliation",
      "Hydrating serum and mask",
      "Optional LED Light or Oxygen Therapy",
      "Moisturiser and SPF finish",
    ],
    benefits: [
      "Smoother, softer skin texture",
      "Brighter, more even-looking tone",
      "Helps soften the look of fine lines, acne marks and enlarged pores",
      "Visible results with minimal downtime",
    ],
    idealFor: "Dull or uneven skin, rough texture, congestion and early signs of ageing.",
    duration: "35–70 minutes",
    price: 45,
    priceOptions: ["Face — £45", "Face & Neck — £65", "Save 20% when booking a course of 3"],
    aftercare: [
      "Avoid makeup for 24 hours",
      "Avoid retinol, acids and harsh skincare for 5–7 days",
      "Wear SPF daily and avoid direct sun for 1 week",
      "Mild redness or dryness may occur and usually settles within 1–2 days",
    ],
    frequency: "A course of 2–3 treatments for the best long-term results",
  },
  {
    slug: "hydrafacial",
    title: "Hydrafacial",
    category: ADVANCED,
    image: "/home-treatment-3.png",
    popular: true,
    shortDescription:
      "A multi-step facial that deeply cleanses, exfoliates, extracts and hydrates in one relaxing, non-invasive treatment.",
    journey: [
      "Deep cleanse and exfoliation",
      "Gentle peel to loosen pore debris",
      "Painless hydro extractions",
      "Hydration infusion with hyaluronic acid, peptides and antioxidants",
      "Optional advanced therapy — Oxygen, Ultrasound, RF, High Frequency, Electric Roller or Microneedling",
      "LED Light Therapy",
      "Custom serums and SPF",
    ],
    benefits: [
      "Deep cleansing and refined-looking pores",
      "Intense, lasting hydration",
      "Smoother texture and brighter tone",
      "A fresh, youthful glow with no downtime",
    ],
    idealFor: "All skin types — congestion, dehydration, dullness, enlarged pores and fine lines.",
    duration: "60–80 minutes",
    price: 95,
    priceOptions: [],
    aftercare: [
      "Avoid makeup, heat and exercise for 24 hours",
      "Skip retinol and exfoliants for 2–3 days",
      "Use SPF daily and stay well hydrated",
    ],
    frequency: "Every 4–6 weeks",
  },
  {
    slug: "microneedling",
    title: "Microneedling (Collagen Induction Therapy)",
    category: ADVANCED,
    image: IMAGES.microneedling,
    popular: true,
    shortDescription:
      "Creates tiny, controlled micro-channels in the skin to stimulate natural collagen and elastin for firmer, smoother skin.",
    journey: [
      "Skin consultation and triple cleanse",
      "Numbing cream for comfort",
      "Microneedling of your chosen area — face, neck, chest or hands",
      "Targeted treatment serum",
      "Sheet mask and LED Light Therapy",
    ],
    benefits: [
      "Stimulates natural collagen and elastin",
      "Helps improve fine lines, acne scars and enlarged pores",
      "Smoother, more even skin texture",
      "Long-lasting skin rejuvenation",
    ],
    idealFor: "Acne scarring, fine lines, enlarged pores and uneven texture.",
    duration: "",
    price: 70,
    priceOptions: [
      "Full Face — £99 (2 sessions £150 · 3 sessions £210 · 4 sessions £250)",
      "Face & Neck — £120 (3 sessions £330 · 4 sessions £400)",
      "Eye Lift Therapy — £70 (3 sessions £150 · 4 sessions £200)",
      "Both Hands — £80 (2 sessions £120 · 4 sessions £200)",
    ],
    aftercare: [
      "A £100 deposit is required when booking a 3 or 4 session package",
      "Full before and aftercare guidance is given with every treatment",
    ],
    frequency: "A course of 3–4 sessions for the best results",
  },
  {
    slug: "prp-hair-and-face",
    title: "PRP (Hair & Face)",
    category: ADVANCED,
    image: "/home-treatment-4.png",
    shortDescription:
      "Platelet-Rich Plasma therapy uses a concentrated preparation from your own blood to support natural skin renewal and healthier-looking hair.",
    journey: [],
    benefits: [
      "Supports natural skin renewal and radiance",
      "Helps improve skin texture and tone",
      "Can support thicker, healthier-looking hair",
    ],
    idealFor: "Dull or tired skin, fine lines and thinning hair.",
    duration: "",
    price: 0,
    priceOptions: [],
    aftercare: ["A consultation is required before treatment"],
    frequency: "",
  },
  {
    slug: "acne-treatment",
    title: "Acne Treatment",
    category: ADVANCED,
    image: IMAGES.acne,
    shortDescription:
      "A clarifying treatment for acne, blackheads and clogged pores, combining hydro extraction, High Frequency and LED Light Therapy.",
    journey: [
      "Skin consultation",
      "Deep double cleanse",
      "Hydro extraction to cleanse, exfoliate and hydrate",
      "High Frequency therapy to target acne-causing bacteria",
      "LED Light Therapy to calm redness and support healing",
    ],
    benefits: [
      "Helps reduce congestion, breakouts and excess oil",
      "Calms redness and inflammation",
      "Leaves skin clearer, smoother and more radiant",
    ],
    idealFor: "Acne-prone, congested or oily skin, blackheads and clogged pores.",
    duration: "",
    price: 45,
    priceOptions: [],
    aftercare: [
      "Mild redness may occur and usually settles within a few days",
      "Avoid makeup, heat, retinol and exfoliants for 24–48 hours",
      "Stay well hydrated",
    ],
    frequency: "3 weekly sessions for best results — save 20% when booking all 3",
  },
  {
    slug: "enzyme-peel-facial",
    title: "Enzyme Peel Facial",
    category: ADVANCED,
    image: IMAGES.enzymePeel,
    shortDescription:
      "A gentle peel using natural fruit enzymes to dissolve dead skin cells and reveal brighter, smoother skin — without harsh downtime.",
    journey: [
      "Cleanse and skin preparation",
      "Natural fruit enzyme peel",
      "Cold Therapy to calm and refine",
      "LED Light Therapy",
      "Moisturiser and SPF finish",
    ],
    benefits: [
      "Brightens dull skin and restores a healthy glow",
      "Smooths texture and refines the look of pores",
      "Helps even skin tone and improves product absorption",
      "Suitable for sensitive skin",
    ],
    idealFor: "Dull, uneven or sensitive skin and rough texture.",
    duration: "",
    price: 45,
    priceOptions: [],
    aftercare: [
      "Keep skin hydrated and drink plenty of water",
      "Apply SPF 30+ and avoid direct sun for 48 hours",
      "Avoid makeup for 24 hours, and retinol, acids and exfoliants for 3 days",
      "Avoid heat, steam, saunas and intense exercise for 24 hours",
    ],
    frequency: "",
  },
  {
    slug: "oxygen-therapy",
    title: "Oxygen Therapy (Deeper Hydration)",
    category: ADVANCED,
    image: IMAGES.oxygen,
    shortDescription:
      "Oxygen infusion therapy deeply hydrates and revitalises the skin, leaving it smoother, brighter and naturally radiant.",
    journey: [
      "Cleanse and skin preparation",
      "Oxygen infusion with Zemits OXYTIGHT serum",
      "Luxury facial with LED Light Therapy",
      "Moisturiser and SPF finish",
    ],
    benefits: [
      "Deep, lasting hydration",
      "Supports collagen and skin elasticity",
      "Brightens dull, tired-looking skin",
      "A visible glow after one session",
    ],
    idealFor: "Dehydrated, dull or tired skin, and pre-event glow.",
    duration: "",
    price: 15,
    priceOptions: ["Full treatment — £60", "Add to any facial — £15"],
    aftercare: [],
    frequency: "Best as a course, followed by maintenance treatments",
  },
  {
    slug: "ultrasound-therapy",
    title: "Ultrasound (Anti-Ageing & Hydrating)",
    category: ADVANCED,
    image: IMAGES.ultrasound,
    shortDescription:
      "Gentle ultrasonic vibrations nourish and hydrate the skin, boost circulation and give a naturally lifted, refreshed look.",
    journey: [],
    benefits: [
      "Boosts blood and lymphatic circulation",
      "Helps reduce facial puffiness",
      "A natural lifting effect",
      "Deeply nourishes and hydrates",
      "Improves skin tone and texture",
    ],
    idealFor: "Dehydrated skin, puffiness, dullness and early signs of ageing.",
    duration: "",
    price: 10,
    priceOptions: ["Full treatment — £45", "Add to any facial — £10"],
    aftercare: [],
    frequency: "A course of 6–8 weekly sessions, then every 2–4 weeks to maintain",
  },
  {
    slug: "rf-skin-tightening",
    title: "RF Skin Tightening Treatment",
    category: ADVANCED,
    image: IMAGES.rf,
    shortDescription:
      "Non-surgical Radio Frequency gently warms the deeper layers of the skin to stimulate collagen, firm and lift.",
    journey: [
      "Skin consultation and cleanse",
      "Radio Frequency skin tightening",
      "Complete facial for maximum rejuvenation",
      "Moisturiser and SPF finish",
    ],
    benefits: [
      "Stimulates collagen and elastin for firmer-looking skin",
      "Helps soften fine lines and wrinkles",
      "A naturally lifted appearance",
      "Comfortable, with no recovery time",
    ],
    idealFor: "Loss of firmness, early signs of ageing and a softening jawline.",
    duration: "",
    price: 60,
    priceOptions: [],
    aftercare: [],
    frequency: "A course of 6 sessions for long-lasting results",
  },
  {
    slug: "high-frequency-treatment",
    title: "High Frequency Treatment",
    category: ADVANCED,
    image: IMAGES.highFrequency,
    shortDescription:
      "A gentle electrical current cleanses, calms and rejuvenates the skin while targeting acne-causing bacteria.",
    journey: [
      "Skin consultation",
      "Cleanse, exfoliation and optional steam",
      "Extractions if required",
      "High Frequency treatment",
      "Calming mask",
      "Targeted serum, moisturiser and SPF",
    ],
    benefits: [
      "Targets acne-causing bacteria and reduces inflammation",
      "Boosts circulation",
      "Supports collagen production",
      "Visible results after one session",
    ],
    idealFor: "Acne-prone, congested, dull and ageing skin.",
    duration: "",
    price: 35,
    priceOptions: [],
    aftercare: [
      "Avoid makeup for 24 hours",
      "Use SPF daily",
      "Avoid heat, retinol and exfoliants for 2–3 days",
    ],
    frequency: "Best results with a course of 3 treatments",
  },
  {
    slug: "led-light-therapy",
    title: "LED Light Therapy (Add-on)",
    category: ADVANCED,
    image: IMAGES.led,
    shortDescription:
      "Targeted light wavelengths support natural skin renewal — lovely on its own or to enhance any facial.",
    journey: [
      "Cleanse and skin preparation",
      "LED Light Therapy",
      "Hydrating sheet mask",
    ],
    benefits: [
      "Supports collagen and skin repair",
      "Helps reduce acne-causing bacteria and inflammation",
      "Improves tone, texture and radiance",
      "Non-invasive with no downtime",
    ],
    idealFor: "Acne, redness, sensitive skin and dullness.",
    duration: "",
    price: 10,
    priceOptions: ["Add-on to any facial — £10", "Full treatment with a 60-minute facial — £40"],
    aftercare: [],
    frequency: "",
  },

  // ── 2. Ritual Facials ─────────────────────────────────────
  {
    slug: "luminous-signature-spa-facial",
    title: "Luminous Signature Spa Facial",
    category: RITUAL,
    image: IMAGES.signatureFacial,
    popular: true,
    shortDescription:
      "Our signature facial — a complete, deeply relaxing ritual to cleanse, nourish and restore your natural glow.",
    journey: [
      "Double cleanse and gentle exfoliation",
      "Steam, hot towel and deep pore cleansing",
      "Professional extractions",
      "Facial, neck and lymphatic drainage massage",
      "Nourishing mask with optional LED therapy",
      "Relaxing hand and arm massage",
      "Hydrating moisturiser and SPF",
    ],
    benefits: [
      "Brighter, smoother, healthier-looking skin",
      "Clearer, refreshed pores",
      "Deep relaxation",
    ],
    idealFor: "All skin types — anyone in need of a relaxing skin reset.",
    duration: "",
    price: 35,
    priceOptions: [],
    aftercare: [
      "Stay hydrated and wear SPF",
      "Avoid heat, exfoliants and retinol for 24–48 hours",
    ],
    frequency: "Once a month",
  },
  {
    slug: "extraction-deep-cleansing-facial",
    title: "Extraction Deep Cleansing Facial",
    category: RITUAL,
    image: "/home-treatment-1.png",
    shortDescription:
      "A results-driven deep cleansing facial that clears congestion and blackheads while hydrating and restoring balance.",
    journey: [
      "Personal skin consultation",
      "Deep cleanse to remove impurities and excess oil",
      "Gentle exfoliation",
      "Steam to soften pores",
      "Professional blackhead and congestion extraction",
      "Hot towel cleanse",
      "Calming mask",
      "Hydrating serum, moisturiser and SPF",
    ],
    benefits: [
      "Clears blackheads and congestion",
      "Calms redness and restores balance",
      "A smoother, clearer complexion",
    ],
    idealFor: "Congested skin, blackheads, and oily or breakout-prone skin.",
    duration: "",
    price: 30,
    priceOptions: [
      "Extraction Deep Cleansing Facial — £30",
      "Add High Frequency — +£5",
      "Add LED Hydrating Sheet Mask — +£10",
    ],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "dermaplaning-facial",
    title: "Dermaplaning Facial",
    category: RITUAL,
    image: IMAGES.dermaplaning,
    popular: true,
    shortDescription:
      "A sterile blade gently removes dead skin cells and peach fuzz, revealing smoother, brighter skin.",
    journey: [
      "Skin consultation",
      "Double cleanse and skin preparation",
      "Professional dermaplaning",
      "Gentle cleanse and tone",
      "Optional LED, Cold Therapy or enzyme treatment",
      "Custom mask and facial massage (optional)",
      "Serums, moisturiser and SPF",
    ],
    benefits: [
      "Instantly smoother, brighter skin",
      "Removes peach fuzz",
      "Better absorption of skincare",
      "A flawless base for makeup",
    ],
    idealFor: "Dullness, peach fuzz, rough texture and makeup that won't sit smoothly.",
    duration: "",
    price: 40,
    priceOptions: [],
    aftercare: [
      "Avoid makeup, heat and sun for 24–48 hours",
      "Avoid retinol, acids and exfoliation for 5–7 days",
      "Use SPF daily",
    ],
    frequency: "Every 3–4 weeks",
  },

  // ── 3. Facial Massage Therapies ───────────────────────────
  {
    slug: "face-lifting-anti-ageing-massage",
    title: "Face Lifting / Anti-Ageing Hand Massage",
    category: MASSAGE,
    image: IMAGES.facialMassageAlt,
    shortDescription:
      "A sculpting, hands-on facial massage that lifts, tones and relaxes the facial muscles for a naturally refreshed look.",
    journey: FACIAL_MASSAGE_JOURNEY,
    benefits: [
      "A lifted, toned appearance",
      "Boosts circulation and glow",
      "Releases facial tension",
      "Deeply relaxing",
    ],
    idealFor: "Tired or dull skin, facial tension and early signs of ageing.",
    duration: "45 minutes",
    price: 25,
    priceOptions: [
      "Face Lifting Massage — £25",
      "Anti-Ageing Massage — £30",
      "Face + Neck, Shoulders, Back & Arms (1 hour) — £40",
      FACIAL_MASSAGE_ADD_ONS,
    ],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "gua-sha-therapy",
    title: "Gua Sha Therapy",
    category: MASSAGE,
    image: IMAGES.guaSha,
    shortDescription:
      "The ancient art of Gua Sha — a soothing facial massage that sculpts, de-puffs and restores your natural radiance.",
    journey: [
      "Personalised skin assessment",
      "Double cleanse and gentle exfoliation",
      "Hot towel therapy",
      "Gua Sha massage — face, neck and shoulders",
      "Fresh hot towel",
      "Custom face mask",
      "Serums, moisturiser and SPF",
    ],
    benefits: [
      "Lifts and tones",
      "Boosts circulation",
      "Reduces puffiness",
      "Relieves facial tension",
    ],
    idealFor: "Puffiness, facial tension and dull skin.",
    duration: "45 minutes",
    price: 30,
    priceOptions: [FACIAL_MASSAGE_ADD_ONS],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "facial-lymphatic-drainage",
    title: "Facial Lymphatic Drainage",
    category: MASSAGE,
    image: IMAGES.facialMassage,
    shortDescription:
      "A gentle, rhythmic facial massage that encourages lymphatic flow to reduce puffiness and leave skin calm and refreshed.",
    journey: FACIAL_MASSAGE_JOURNEY,
    benefits: [
      "Reduces puffiness and fluid retention",
      "Defines facial contours",
      "Calms and refreshes the skin",
      "Deeply relaxing",
    ],
    idealFor: "Puffiness, congestion and dull or tired-looking skin.",
    duration: "45 minutes",
    price: 30,
    priceOptions: [FACIAL_MASSAGE_ADD_ONS],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "facial-cupping-therapy",
    title: "Facial Cupping Therapy",
    category: MASSAGE,
    image: IMAGES.facialMassageAlt,
    shortDescription:
      "Gentle facial cups create a light suction to boost circulation, release tension and bring a healthy glow to the skin.",
    journey: FACIAL_MASSAGE_JOURNEY,
    benefits: [
      "Boosts circulation and glow",
      "Helps release facial tension",
      "Reduces puffiness",
      "Supports firmer-looking skin",
    ],
    idealFor: "Dull skin, facial tension and puffiness.",
    duration: "45 minutes",
    price: 30,
    priceOptions: [FACIAL_MASSAGE_ADD_ONS],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "electric-roller-massage",
    title: "Electric Roller Massage",
    category: MASSAGE,
    image: IMAGES.facialMassage,
    shortDescription:
      "A relaxing facial massage using an electric roller to lift, tone and energise the skin.",
    journey: FACIAL_MASSAGE_JOURNEY,
    benefits: [
      "Lifts and tones",
      "Stimulates circulation",
      "Reduces puffiness",
      "Leaves skin refreshed and glowing",
    ],
    idealFor: "Tired, dull or puffy skin.",
    duration: "45 minutes",
    price: 30,
    priceOptions: [FACIAL_MASSAGE_ADD_ONS],
    aftercare: [],
    frequency: "",
  },

  // ── 4. Relaxation Therapies ───────────────────────────────
  {
    slug: "swedish-relaxation-therapy",
    title: "Swedish Relaxation Therapy",
    category: RELAXATION,
    image: IMAGES.swedish,
    popular: true,
    shortDescription:
      "A classic relaxation massage with long, flowing strokes that relieve muscle tension, reduce stress and restore balance.",
    journey: [],
    benefits: [
      "Relieves muscle tension",
      "Improves circulation",
      "Reduces stress",
      "Promotes relaxation and overall wellbeing",
    ],
    idealFor: "Stress, fatigue, and tight shoulders and back.",
    duration: "30–90 minutes",
    price: 20,
    priceOptions: [
      "30 min Deep Tissue Back Massage — £20",
      "30 min Legs & Foot Massage — £20",
      "40 min Head, Neck, Shoulders & Arms — £25",
      "1 hour Full Back, or Face, Head, Neck & Arms — £35",
      "90 min Full Body, Head & Face Massage — £60",
    ],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "aromatherapy-relaxation",
    title: "Aromatherapy Relaxation",
    category: RELAXATION,
    image: IMAGES.swedish,
    shortDescription:
      "A soothing warm-oil massage with aromatic essential oils to calm the mind and melt away tension.",
    journey: [],
    benefits: [
      "Calms the mind and reduces stress",
      "Relieves tension in the back, neck and shoulders",
      "Nourishes the skin",
      "Supports restful sleep",
    ],
    idealFor: "Stress, poor sleep and muscle tension.",
    duration: "40 minutes",
    price: 25,
    priceOptions: ["Aromatherapy with hot oil — back, neck, shoulders, arms & hands — £25"],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "hot-stones-therapy",
    title: "Hot Stones Therapy",
    category: RELAXATION,
    image: IMAGES.hotStones,
    shortDescription:
      "Smooth, heated stones and relaxing massage work together to ease deep muscle tension and restore calm.",
    journey: [],
    benefits: [
      "Eases deep muscle tension",
      "Improves circulation",
      "Deeply calming",
      "Supports overall wellbeing",
    ],
    idealFor: "Muscle tension, stiffness and stress.",
    duration: "35–90 minutes",
    price: 25,
    priceOptions: [
      "35 min Back Deep Tissue + Hot Stones + Lymphatic Drainage — £25",
      "50 min Head & Back Relaxation with Hot Stones — £35",
      "60 min Full Body Back Relaxation with Hot Stones — £45",
      "75 min Full Body Hot Stone Massage — £55",
      "90 min Full Body Hot Stone Massage — £65",
    ],
    aftercare: [],
    frequency: "40–90 minute sessions are recommended for deep relaxation",
  },
  {
    slug: "lymphatic-drainage-therapy",
    title: "Lymphatic Drainage Therapy",
    category: RELAXATION,
    image: IMAGES.woodSculpt,
    shortDescription:
      "Body sculpting and lymphatic drainage with precision wooden tools to improve circulation, reduce fluid retention and help contour the body.",
    journey: [],
    benefits: [
      "Improves circulation and lymphatic drainage",
      "Helps contour and firm",
      "Improves the appearance of cellulite",
      "A lighter, less puffy feeling",
    ],
    idealFor: "Body sculpting, toning and fluid retention.",
    duration: "30–90 minutes",
    price: 40,
    priceOptions: [
      "30 min Targeted body sculpting — £40",
      "60 min Full body sculpt & lymphatic drainage — £70",
      "90 min Intensive body contouring — £100",
      "Course of 6 — 30 min £200 · 60 min £380 · 90 min £500",
    ],
    aftercare: [
      "Not suitable during pregnancy, or with varicose veins in the treatment area, blood clotting disorders, severe heart conditions, active infections, open wounds, cancer (without medical approval) or severe osteoporosis",
    ],
    frequency: "1–2 sessions a week; a course of 6–10 for best results, then every 3–4 weeks",
  },
  {
    slug: "electric-cupping-therapy",
    title: "Electric Cupping Therapy",
    category: RELAXATION,
    image: IMAGES.hotStones,
    shortDescription:
      "Modern cupping therapy using electric suction cups to release muscle tension, boost circulation and aid relaxation.",
    journey: [],
    benefits: [
      "Releases tight, knotted muscles",
      "Boosts circulation",
      "Supports lymphatic flow",
      "Deeply relaxing",
    ],
    idealFor: "Muscle tightness and back and shoulder tension.",
    duration: "",
    price: 0,
    priceOptions: [],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "hand-and-foot-reflexology",
    title: "Hand & Foot Reflexology",
    category: RELAXATION,
    image: IMAGES.reflexology,
    shortDescription:
      "Gentle pressure on reflex points of the hands or feet to promote deep relaxation, circulation and wellbeing.",
    journey: [
      "Personal consultation",
      "Cleansing and hot towel",
      "Relaxing reflexology massage",
      "Mask and hot pads",
    ],
    benefits: [
      "Deep relaxation and stress relief",
      "Improves circulation",
      "Supports better sleep",
      "Relieves aches in the hands and feet",
    ],
    idealFor: "Stress, poor sleep and tired hands or feet.",
    duration: "40 minutes",
    price: 25,
    priceOptions: [
      "Hand Reflexology — £25",
      "Foot Reflexology — £25",
      "With hot stones — £30",
    ],
    aftercare: [],
    frequency: "",
  },

  // ── 5. Other Treatments ───────────────────────────────────
  {
    slug: "eyebrow-shaping",
    title: "Eyebrow Shaping",
    category: OTHER,
    image: IMAGES.brows,
    shortDescription:
      "Beautifully defined brows shaped to suit your face — by thread, wax or tweezer, with tinting and lamination available.",
    journey: [],
    benefits: ["Defined, balanced brows", "Beautifully frames the face", "Long-lasting tint options"],
    idealFor: "Anyone wanting neat, defined brows.",
    duration: "30 minutes – 1 hour 30 minutes",
    price: 5,
    priceOptions: [
      "Brow Shape — thread, wax or tweezer (30 min) — £5",
      "Brow Shape & Tint — £15",
      "Brow & Lash Tint — £15",
      "Brow Lamination — £20",
    ],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "face-threading",
    title: "Face Threading",
    category: OTHER,
    image: IMAGES.brows,
    shortDescription:
      "A precise, gentle hair removal method using cotton thread — ideal for the upper lip, chin and full face.",
    journey: [],
    benefits: ["A precise, clean finish", "Gentle on sensitive skin", "No chemicals"],
    idealFor: "Fine facial hair and sensitive skin.",
    duration: "",
    price: 4,
    priceOptions: [
      "Upper Lip or Chin — from £4",
      "Face (sides, chin & upper lip) — £10",
      "Full Face (including eyebrows) — £20",
    ],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "waxing",
    title: "Waxing",
    category: OTHER,
    image: IMAGES.waxing,
    shortDescription:
      "Waxing removes unwanted hair from the root, leaving your skin smooth, soft and hair-free for weeks.",
    journey: [],
    benefits: ["Smooth skin for weeks", "Finer regrowth over time"],
    idealFor: "Face and body hair removal.",
    duration: "",
    price: 4,
    priceOptions: [
      "Upper Lip / Chin — from £4",
      "Eyebrows — £5",
      "Face (sides, chin & upper lip) — £10",
      "Full Face (including eyebrows) — £20",
      "Underarms / Half Arms / Full Arms — from £8",
      "Bikini Line / Hollywood — from £8",
      "Half Legs / Full Legs — from £10",
      "Back or Tummy — from £10",
      "Full Body — £55",
      "Combos: Full Legs + Hollywood £35 · Half Legs + Hollywood £25 · Full Legs + Underarms + Hollywood £40",
    ],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "manicure-and-pedicure",
    title: "Manicure & Pedicure",
    category: OTHER,
    image: IMAGES.nails,
    shortDescription:
      "A luxury manicure or pedicure with cuticle care, exfoliation, a hydrating mask and a relaxing massage.",
    journey: [
      "Deep cuticle care",
      "Exfoliation",
      "Hydrating mask",
      "Relaxing massage",
      "Optional nail polish",
    ],
    benefits: ["Soft, healthy-looking hands and feet", "Neat, cared-for nails", "Deeply relaxing"],
    idealFor: "Anyone wanting beautifully cared-for hands and feet.",
    duration: "50–90 minutes",
    price: 10,
    priceOptions: [
      "Luxury Relaxing Manicure (50–60 min) — £20",
      "Luxury Relaxing Pedicure (60–90 min) — £25",
      "Dry Manicure — £10",
      "Nail polish — +£5",
    ],
    aftercare: [],
    frequency: "",
  },
  {
    slug: "luxury-back-polish",
    title: "Luxury Back Polish",
    category: OTHER,
    image: IMAGES.backPolish,
    shortDescription:
      "A professional back facial with steam, a deep-cleansing scrub, extractions, hot towels and a tension-relieving hot stone massage.",
    journey: [
      "Cleanse",
      "Deep-cleansing scrub",
      "Steam and extractions",
      "Hot towel treatment",
      "Hot stone massage",
      "Mask and moisturiser",
    ],
    benefits: [
      "Clears congestion and breakouts on the back",
      "Hydrates and smooths",
      "Relieves muscle tension",
      "Leaves skin refined and refreshed",
    ],
    idealFor: "Back congestion or acne, dehydrated skin and muscle tension.",
    duration: "",
    price: 30,
    priceOptions: ["The Luxury Back Polish — £30", "Back Polish & Massage (60 min) — £40"],
    aftercare: [],
    frequency: "",
  },
];

export const CATEGORY_TITLES = TREATMENT_CATEGORIES.map((c) => c.title);

export function getCategoryBySlug(slug) {
  return TREATMENT_CATEGORIES.find((c) => c.slug === slug) || null;
}

export function getCategoryByTitle(title) {
  const key = (title || "").trim().toLowerCase();
  return TREATMENT_CATEGORIES.find((c) => c.title.toLowerCase() === key) || null;
}

/** "£45", "From £25" or "Price on consultation" */
export function formatTreatmentPrice(treatment) {
  const price = Number(treatment?.price) || 0;
  if (price <= 0) return "Price on consultation";
  const hasTiers = (treatment.priceOptions || []).filter(Boolean).length > 1;
  return hasTiers ? `From £${price}` : `£${price}`;
}
