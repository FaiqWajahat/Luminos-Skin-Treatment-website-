/**
 * Luminous Skin Clinic - Leeds
 * Central Data Store
 */

export const CLINIC_INFO = {
  name: "Luminous Skin Clinic",
  shortName: "Luminous",
  tagline: "Your Skin. Your Confidence. Your Glow.",
  subTagline: "Personalised skin, facial and wellness treatments in Leeds.",
  location: "Leeds, West Yorkshire, United Kingdom",
  address: "Central Leeds Wellness Suite, Leeds, LS1",
  email: "hello@luminous-skin.co.uk",
  phone: "+44 (0) 113 892 0100",
  hours: [
    { days: "Monday - Friday", time: "9:30 AM - 6:30 PM" },
    { days: "Saturday", time: "10:00 AM - 5:00 PM" },
    { days: "Sunday", time: "By Appointment Only" },
  ],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Pricing", href: "/pricing" },
  { label: "Results", href: "/results" },
  { label: "Contact", href: "/contact" },
];

export const TRUST_PILLARS = [
  {
    number: "01",
    title: "Personalised Treatments",
    description: "Customised clinical formulations tailored specifically to your unique skin type.",
  },
  {
    number: "02",
    title: "Leeds Based Clinic",
    description: "Centrally situated calm, private one-to-one clinic environment in Leeds.",
  },
  {
    number: "03",
    title: "Professional Care",
    description: "Evidence-backed dermatology protocols and certified practitioner attention.",
  },
  {
    number: "04",
    title: "Accessible Pricing",
    description: "Transparent pricing starting from £20 with no hidden consultation add-ons.",
  },
];

export const TREATMENTS = [
  {
    "id": "classic-facial",
    "slug": "classic-facial",
    "title": "Classic Facial",
    "category": "All Clinic Facials",
    "price": 25,
    "popular": true,
    "image": "/home-treatment-1.png",
    "tagline": "Gentle essential skin rejuvenation and deep cellular nourishment",
    "shortDescription": "A personalised clinical facial designed to cleanse, exfoliate, and refresh dull complexions with bespoke botanical nourishment.",
    "fullDescription": "Our Classic Facial combines ultrasonic cleansing, gentle enzymatic exfoliation, and a restorative moisture barrier treatment. Tailored for stressed or tired skin, it restores natural balance and healthy radiance.",
    "benefits": [
      "Instant healthy glow & supple skin finish",
      "Gentle exfoliation without redness or irritation",
      "Balances natural skin barrier moisture levels",
      "Includes tailored lymphatic relaxation massage"
    ],
    "idealFor": "Dullness, uneven texture, routine skin maintenance"
  },
  {
    "id": "extraction-deep-cleansing-facial",
    "slug": "extraction-deep-cleansing-facial",
    "title": "Extraction Deep Cleansing Facial",
    "category": "All Clinic Facials",
    "price": 30,
    "popular": false,
    "image": "/home-treatment-2.png",
    "tagline": "Targeted ultrasonic deep pore cleansing and precision extractions",
    "shortDescription": "Clinical deep-pore decongestion that gently clears stubborn blackheads, comedones, and sebum buildup to prevent future breakouts.",
    "fullDescription": "Utilising sterile clinical extraction protocols alongside steam and ultrasonic purification, this facial decongests clogged follicles while calming active redness and tightening open pores.",
    "benefits": [
      "Clears stubborn blackheads and trapped sebum",
      "Decongests enlarged, suffocated pores",
      "Calming antibacterial post-extraction serum",
      "Smooths skin texture and prevents breakouts"
    ],
    "idealFor": "Congested skin, blackheads, excess oil, breakout-prone complexions"
  },
  {
    "id": "signature-spa-facial",
    "slug": "signature-spa-facial",
    "title": "Signature Spa Facial",
    "category": "All Clinic Facials",
    "price": 25,
    "popular": false,
    "image": "/aboutpage-clinicalphilosophy.png",
    "tagline": "A luxurious bespoke relaxation facial combining botanical care",
    "shortDescription": "A holistic clinical facial pairing potent antioxidant botanicals with sculpting pressure-point massage for complete sensorial wellness.",
    "fullDescription": "This restorative facial immerses you in serene botanical aromatics while delivering clinical-grade moisture serums deep into tired skin layers. Relieves facial muscle strain and revives healthy circulation.",
    "benefits": [
      "Deep relaxation and release of hyperactive facial tension",
      "Restores vibrant, dewy skin hydration",
      "Aromatherapy infusion to calm the central nervous system",
      "Sculpts cheekbones and jawline contours"
    ],
    "idealFor": "Stress, fatigue, dull tone, self-care relaxation"
  },
  {
    "id": "ultimate-glow-facial",
    "slug": "ultimate-glow-facial",
    "title": "Ultimate Glow Facial",
    "category": "All Clinic Facials",
    "price": 90,
    "popular": false,
    "image": "/home-treatment-3.png",
    "tagline": "The premier multi-step brightening and radiance protocol",
    "shortDescription": "High-potency clinical illumination combining lactic exfoliation, active vitamin infusions, and collagen boosting for mirror-like radiance.",
    "fullDescription": "Designed for maximum luminous transformation, the Ultimate Glow Facial utilizes layered clinical resurfacing and concentrated peptide infusion to instantly banish fatigue, hyperpigmentation traces, and texture irregularities.",
    "benefits": [
      "Delivers intense, long-lasting glass-skin radiance",
      "Softens fine expression lines and pigment spots",
      "Multi-depth hyaluronic acid hydration plumping",
      "Ideal red-carpet and special event treatment"
    ],
    "idealFor": "Event preparation, severe dullness, lackluster skin"
  },
  {
    "id": "enzyme-peel-facial-cold-therapy",
    "slug": "enzyme-peel-facial-cold-therapy",
    "title": "Enzyme Peel Facial + Cold Therapy",
    "category": "All Clinic Facials",
    "price": 90,
    "popular": false,
    "image": "/home-treatment-4.png",
    "tagline": "Natural fruit enzyme renewal paired with cryo-soothing therapy",
    "shortDescription": "Non-irritating biological enzyme resurfacing complemented by cryo globes to tighten pores, diminish inflammation, and refine texture.",
    "fullDescription": "Papaya and pineapple botanical enzymes digest keratinized dead cells without mechanical abrasion, followed immediately by sub-zero cryo-wand therapy to seal hydration, calm vascular flushing, and tighten the skin barrier.",
    "benefits": [
      "Dissolves dead stratum corneum cells gently",
      "Cryogenic cold therapy constricts dilated pores",
      "Soothes sensitive, reactive, or flushed skin",
      "Leaves complexion cool, velvety, and ultra-smooth"
    ],
    "idealFor": "Sensitive skin, rosacea-prone skin, rough surface texture"
  },
  {
    "id": "all-anti-aging-facial-massages",
    "slug": "all-anti-aging-facial-massages",
    "title": "All Anti-Aging Facial Massages",
    "category": "All Clinic Facials",
    "price": 90,
    "popular": false,
    "image": "/about-The Leeds-Sanctuary.png",
    "tagline": "Sculpting myofascial lymphatic drainage to lift and firm contours",
    "shortDescription": "Intensive manual face-sculpting therapy stimulating deep collagen fibres, draining lymphatic toxins, and lifting slackened facial contours.",
    "fullDescription": "A specialized aesthetic massage combining intra-oral buccal lifting techniques, myofascial release, and firm acupressure to stimulate microcirculation, reduce fluid retention, and restore natural facial youthfulness without injectables.",
    "benefits": [
      "Visibly sculpts and defines cheekbones and jawline",
      "Stimulates natural dermal collagen & elastin synthesis",
      "Eliminates morning puffiness through lymphatic drainage",
      "Softens nasolabial folds and forehead tension"
    ],
    "idealFor": "Loss of firmness, sagging contours, puffiness, natural anti-aging"
  },
  {
    "id": "swedish-relaxing-therapy",
    "slug": "swedish-relaxing-therapy",
    "title": "Swedish Relaxing Therapy",
    "category": "Massage Therapy",
    "price": 25,
    "popular": true,
    "image": "/about-The Leeds-Sanctuary.png",
    "tagline": "Classic gentle gliding Swedish strokes to melt away muscular stress",
    "shortDescription": "Rhythmic, soothing strokes designed to improve oxygen flow in the blood and release chronic tension from neck, shoulders, and back.",
    "fullDescription": "Our Swedish Relaxing Therapy employs long effleurage strokes, kneading, and light rhythmic tapping. Calibrating therapeutic touch to your preference, it lowers cortisol levels and promotes full-body restorative tranquility.",
    "benefits": [
      "Relieves daily desk-posture stiffness and tension",
      "Increases oxygen circulation and lymphatic flow",
      "Promotes deep, restorative sleep cycles",
      "Tailored pressure for complete comfort"
    ],
    "idealFor": "Overall stress, fatigue, tight upper back, relaxation"
  },
  {
    "id": "deep-tissue-therapy",
    "slug": "deep-tissue-therapy",
    "title": "Deep Tissue Therapy",
    "category": "Massage Therapy",
    "price": 35,
    "popular": false,
    "image": "/home-treatment-1.png",
    "tagline": "Firm therapeutic pressure focused on deeper muscle layers",
    "shortDescription": "Targeted clinical neuromuscular pressure designed to break down chronic adhesions, stubborn knots, and muscular tightness.",
    "fullDescription": "Focusing on the inner layers of muscles and connective tissues, our therapists use slow, deliberate strokes and deep finger pressure to release persistent structural tension, sports fatigue, and postural strain.",
    "benefits": [
      "Breaks up painful scar tissue and muscular knots",
      "Restores range of motion and joint flexibility",
      "Alleviates lower back, neck, and shoulder soreness",
      "Accelerates athletic recovery and lactic acid clearance"
    ],
    "idealFor": "Chronic pain, stubborn muscle knots, gym recovery, postural strain"
  },
  {
    "id": "hot-stone-therapy",
    "slug": "hot-stone-therapy",
    "title": "Hot Stone Therapy",
    "category": "Massage Therapy",
    "price": 35,
    "popular": false,
    "image": "/about-The Leeds-Sanctuary.png",
    "tagline": "Therapeutic basalt volcanic stone warmth for ultimate relaxation",
    "shortDescription": "Smooth heated volcanic basalt stones glide along tense muscles to melt deep stress and restore inner bodily equilibrium.",
    "fullDescription": "Therapeutic basalt stones retain comforting heat that penetrates deep into muscular tissue. The soothing heat encourages vascular dilation, relieving chronic desk posture strain and calming the autonomic nervous system.",
    "benefits": [
      "Penetrating volcanic warmth melts stubborn muscle tension",
      "Enhances blood vessel dilation and toxin drainage",
      "Deeply meditative calm for stressed nervous systems",
      "Harmonises full-body vitality and relaxation"
    ],
    "idealFor": "Chronic muscle tension, cold stiffness, stress relief"
  },
  {
    "id": "aroma-therapy-asmr",
    "slug": "aroma-therapy-asmr",
    "title": "Aroma Therapy & ASMR",
    "category": "Massage Therapy",
    "price": 35,
    "popular": false,
    "image": "/aboutpage-clinicalphilosophy.png",
    "tagline": "Sensory relaxation blending calming botanical oils and soothing techniques",
    "shortDescription": "A multi-sensory therapeutic journey combining tailored essential oils with delicate ASMR relaxation touches to quiet an overactive mind.",
    "fullDescription": "Immerse yourself in therapeutic aromatics blended to match your emotional state, paired with gentle scalp, ear, and neck tactile therapies designed to trigger soothing sensory tingles and profound tranquil mindfulness.",
    "benefits": [
      "Quiets racing thoughts and chronic mental fatigue",
      "Custom essential oil blends (Lavender, Bergamot, Neroli)",
      "Releases scalp and cranial fascia tension",
      "Induces deep state of meditative relaxation"
    ],
    "idealFor": "Anxiety, insomnia, high mental stress, sensory unwind"
  },
  {
    "id": "lymphatic-wood-sculpt-massage",
    "slug": "lymphatic-wood-sculpt-massage",
    "title": "Lymphatic (Wood Sculpt Massage)",
    "category": "Massage Therapy",
    "price": 35,
    "popular": false,
    "image": "/Practitioner-Split-img.png",
    "tagline": "Anatomical wooden tools and lymphatic drainage to sculpt and contour",
    "shortDescription": "Targeted wooden contouring tools combined with manual lymphatic drainage to stimulate circulation, reduce water retention, and tone tissue.",
    "fullDescription": "Maderotherapy (wood therapy) uses crafted anatomical wooden implements to break down localized fat deposits, stimulate sluggish lymph nodes, and boost elastin production, leaving the body sculpted and lighter.",
    "benefits": [
      "Stimulates lymphatic circulation and fluid elimination",
      "Smooths skin appearance and breaks down cellulite",
      "Sculpts natural contours of waist, limbs, and hips",
      "Relieves heavy, swollen sensation in legs and joints"
    ],
    "idealFor": "Fluid retention, sluggish metabolism, body contouring, detoxification"
  },
  {
    "id": "indian-head-hand-foot-reflexology",
    "slug": "indian-head-hand-foot-reflexology",
    "title": "Indian Head, Hand & Foot Reflexology",
    "category": "Massage Therapy",
    "price": 35,
    "popular": false,
    "image": "/home-treatment-2.png",
    "tagline": "Holistic acupressure targeting head, hands, and feet for full balance",
    "shortDescription": "Ancient Ayurvedic head massage combined with targeted hand and foot reflex zones to clear energetic blockages and relieve headaches.",
    "fullDescription": "Combining traditional Champi head and neck massage with precise zone therapy across the soles of the feet and palms of the hands. Clears tension headaches, relaxes eye fatigue, and promotes systemic harmony.",
    "benefits": [
      "Rapid relief from tension headaches and migraine pressure",
      "Relaxes tight neck, jaw, and cranial muscles",
      "Balances vital bodily organs via foot reflex pathways",
      "Nourishing oils promote scalp and hair vitality"
    ],
    "idealFor": "Headaches, TMJ tension, eye strain, holistic rebalancing"
  },
  {
    "id": "led-light-therapy-for-pains-add-on",
    "slug": "led-light-therapy-for-pains-add-on",
    "title": "LED Light Therapy for Pains (Add on)",
    "category": "Massage Therapy",
    "price": 35,
    "popular": false,
    "image": "/home-treatment-4.png",
    "tagline": "Near-infrared and red phototherapy for deep muscular comfort",
    "shortDescription": "Medical-grade 830nm near-infrared and 633nm red wavelength therapy applied directly over sore joints and muscles to reduce inflammation.",
    "fullDescription": "Near-infrared photons penetrate several centimeters into tissue to boost cellular ATP production, increase nitric oxide release, and significantly alleviate chronic joint aches, arthritis discomfort, and muscle strain.",
    "benefits": [
      "Clinically proven reduction in joint and muscle pain",
      "Accelerates cellular ATP and tissue repair",
      "Non-invasive, soothing thermal comfort",
      "Perfect booster alongside manual massage therapy"
    ],
    "idealFor": "Joint aches, back pain, stiff neck, post-workout soreness"
  },
  {
    "id": "led-light-treatment",
    "slug": "led-light-treatment",
    "title": "LED Light Treatment",
    "category": "Facial Skin Treatments",
    "price": 15,
    "popular": false,
    "image": "/home-treatment-4.png",
    "tagline": "Targeted medical phototherapy for calm, revitalised skin",
    "shortDescription": "Non-invasive wavelength light therapy calibrated to calm inflammation, accelerate cellular repair, and banish breakout bacteria.",
    "fullDescription": "Medical phototherapy delivers proven red, blue, and near-infrared wavelengths deep into the dermis. Blue light neutralises acne-causing P. acnes bacteria, while red light invigorates fibroblasts for healing, soothing redness and rosacea-prone skin.",
    "benefits": [
      "Calms active inflammation, redness, and irritation",
      "Destroys acne bacteria safely without peeling",
      "Boosts cellular ATP energy and microcirculation",
      "Relaxing, non-invasive experience with zero downtime"
    ],
    "idealFor": "Acne, rosacea, sensitive skin, post-procedure recovery"
  },
  {
    "id": "skin-regenerate-replenish-oxygen-therapy",
    "slug": "skin-regenerate-replenish-oxygen-therapy",
    "title": "Skin Regenerate & Replenish (Oxygen Therapy)",
    "category": "Facial Skin Treatments",
    "price": 35,
    "popular": false,
    "image": "/home-treatment-1.png",
    "tagline": "Enriched hyperbaric oxygen infusion carrying vital serums deep",
    "shortDescription": "Pressurised clinical oxygen stream delivering medical peptides, antioxidants, and hyaluronic acid for instantaneous plumpness.",
    "fullDescription": "Pure pressurized cosmetic oxygen delivers micronized active serums deep beneath the epidermis. Re-energizes tired, oxygen-depleted skin cells caused by city pollution and fatigue, producing an instantly refreshed, dewy finish.",
    "benefits": [
      "Deeply hydrates and plumps surface expression lines",
      "Antibacterial oxygen barrier defense against pollutants",
      "Revives sluggish, grey, or exhausted complexions",
      "Zero redness, irritation, or downtime"
    ],
    "idealFor": "Dehydration, urban skin, dullness, event preparation"
  },
  {
    "id": "full-hydrafacial-inc-ot-rf-led",
    "slug": "full-hydrafacial-inc-ot-rf-led",
    "title": "Full Hydrafacial Inc.(OT + RF + LED)",
    "category": "Facial Skin Treatments",
    "price": 35,
    "popular": true,
    "image": "/home-treatment-3.png",
    "tagline": "Comprehensive multi-modality hydro-dermabrasion with RF and LED",
    "shortDescription": "Our flagship facial combining vortex suction pore cleansing, Oxygen Therapy, Radio Frequency collagen stimulation, and LED phototherapy.",
    "fullDescription": "The gold-standard aesthetic treatment combining vortex hydro-cleansing, gentle acid peeling, ultrasonic serum infusion, RF skin firming, oxygen therapy, and soothing LED lights. Total skin transformation in a single session.",
    "benefits": [
      "Vortex suction extracts deep blackheads & oil plugs",
      "Radiofrequency thermal energy tightens skin laxity",
      "Oxygen therapy infuses concentrated vitamins",
      "LED phototherapy locks in clinical radiance"
    ],
    "idealFor": "Total skin renewal, enlarged pores, lines, uneven tone"
  },
  {
    "id": "micro-hydro-dermabrasion-with-ot",
    "slug": "micro-hydro-dermabrasion-with-ot",
    "title": "Micro/Hydro Dermabrasion with OT",
    "category": "Facial Skin Treatments",
    "price": 35,
    "popular": false,
    "image": "/home-treatment-2.png",
    "tagline": "Diamond-tip resurfacing paired with fluid hydro-extraction",
    "shortDescription": "Dual-action physical exfoliation and gentle fluid peeling that sweeps away dull keratin cells while infusing oxygenated serums.",
    "fullDescription": "Combines precision diamond abrasion to refine rough surface texture with hydro-suction that flushes impurities from pores. Completed with an oxygen therapy mist to promote cellular regeneration and suppleness.",
    "benefits": [
      "Refines rough texture and enlarged pore borders",
      "Fades superficial sun damage and light pigmentation",
      "Painless extraction of persistent blackheads",
      "Leaves skin sensationally smooth and glowing"
    ],
    "idealFor": "Hyperpigmentation, sun damage, stubborn blackheads, rough texture"
  },
  {
    "id": "acne-treatment-high-frequency",
    "slug": "acne-treatment-high-frequency",
    "title": "Acne Treatment (High Frequency)",
    "category": "Facial Skin Treatments",
    "price": 35,
    "popular": false,
    "image": "/Practitioner-Split-img.png",
    "tagline": "Antibacterial high-frequency electrical ozone therapy",
    "shortDescription": "A specialized argon glass electrode emitting enriched oxygen to purify breakout-prone skin, shrink pores, and stimulate healing.",
    "fullDescription": "High-frequency therapy generates a mild electrical current creating an ozone-rich antibacterial environment on the skin's surface. Rapidly dries up active cystic blemishes, reduces swelling, and prevents recurring breakout cycles.",
    "benefits": [
      "Rapidly reduces inflamed cystic blemishes and spots",
      "Sterilizes acne-causing bacteria deep inside pores",
      "Accelerates post-blemish wound healing and recovery",
      "Regulates sebum production without stripping moisture"
    ],
    "idealFor": "Active acne, cystic breakouts, hormonal flares, congested skin"
  },
  {
    "id": "rf-skin-tightening-full-facial-treatment",
    "slug": "rf-skin-tightening-full-facial-treatment",
    "title": "RF Skin Tightening Full Facial Treatment",
    "category": "Facial Skin Treatments",
    "price": 35,
    "popular": false,
    "image": "/home-treatment-3.png",
    "tagline": "Radiofrequency thermal energy stimulating deep collagen fibers",
    "shortDescription": "Non-invasive dermal heating that contracts existing collagen and triggers long-term fibroblast renewal for a lifted, firmer profile.",
    "fullDescription": "Bipolar and multipolar RF energy gently heats the deep dermis to 40-42\u00b0C, stimulating immediate collagen contraction and long-term neocollagenesis. Ideal for tightening jowls, softening smile lines, and lifting cheek contours.",
    "benefits": [
      "Visible lifting and tightening of slackened jawlines",
      "Softens nasolabial folds and marionette lines",
      "Promotes ongoing collagen synthesis over 4-6 weeks",
      "Comfortable warm treatment with zero recovery time"
    ],
    "idealFor": "Skin laxity, loss of firmness, early aging, sagging contours"
  },
  {
    "id": "microneedling",
    "slug": "microneedling",
    "title": "Microneedling",
    "category": "Facial Skin Treatments",
    "price": 35,
    "popular": false,
    "image": "/home-treatment-3.png",
    "tagline": "Natural collagen induction therapy for refined skin texture",
    "shortDescription": "Automated precision microneedling creating sterile micro-channels that trigger powerful collagen and elastin regeneration.",
    "fullDescription": "Medical-grade microneedling triggers your skin's natural healing cascade, boosting fibroblast growth factor and remodeling scarred tissue. Combined with multi-molecular hyaluronic serums to smooth acne pitting and diminish pore size.",
    "benefits": [
      "Noticeable softening of acne scarring and pitted marks",
      "Refines enlarged pores and superficial fine lines",
      "Dramatically improves elasticity and skin bounce",
      "Long-lasting cellular tissue remodeling"
    ],
    "idealFor": "Acne scarring, enlarged pores, premature aging, uneven texture"
  },
  {
    "id": "intense-therapy-for-dry-skin-hydration-infused",
    "slug": "intense-therapy-for-dry-skin-hydration-infused",
    "title": "Intense Therapy for Dry Skin (Hydration Infused)",
    "category": "Facial Skin Treatments",
    "price": 35,
    "popular": false,
    "image": "/home-treatment-1.png",
    "tagline": "Deep barrier replenishment infused with multi-molecular hyaluronic acid",
    "shortDescription": "Intensive lipid and water restorative protocol formulated to extinguish tightness, flaking, and compromised moisture barriers.",
    "fullDescription": "A specialized barrier-rebuilding treatment delivering essential ceramides, fatty acids, and layered hyaluronic acid directly into parched stratum corneum cells. Seals in deep hydration and protects against environmental moisture loss.",
    "benefits": [
      "Immediate elimination of tightness, flaking, and dry patches",
      "Restores compromised epidermal barrier integrity",
      "Drenches skin in deep, sustained cellular moisture",
      "Leaves complexion calm, supple, and comfortably plump"
    ],
    "idealFor": "Dry skin, chronic flaking, winter dehydration, compromised barrier"
  },
  {
    "id": "dermaplaning-treatment-full-facial",
    "slug": "dermaplaning-treatment-full-facial",
    "title": "Dermaplaning Treatment (Full Facial)",
    "category": "Facial Skin Treatments",
    "price": 35,
    "popular": true,
    "image": "/home-treatment-2.png",
    "tagline": "Surgical scalpel resurfacing removing peach fuzz and dead buildup",
    "shortDescription": "Precision clinical exfoliation sweeping away dead epidermal layers and vellus hair to reveal radiant, glass-smooth skin.",
    "fullDescription": "Using a sterile medical scalpel, dermaplaning gently clears away weeks of accumulated dead surface cells and fine vellus hair (peach fuzz). Finished with soothing hyaluronic hydration for a silky, light-reflective canvas.",
    "benefits": [
      "Instantly glassy, velvety-smooth skin texture",
      "Eliminates peach fuzz without coarse hair regrowth",
      "Enhances skincare absorption by up to 60%",
      "Flawless, seamless makeup application"
    ],
    "idealFor": "Makeup settling, peach fuzz, dullness, rough surface buildup"
  },
  {
    "id": "ultrasound-galvanic-cold-therapy-add-on",
    "slug": "ultrasound-galvanic-cold-therapy-add-on",
    "title": "Ultrasound, Galvanic & Cold Therapy (Add on)",
    "category": "Facial Skin Treatments",
    "price": 35,
    "popular": false,
    "image": "/aboutpage-clinicalphilosophy.png",
    "tagline": "Triple-action sonic infusion and cryogenic calming to seal actives",
    "shortDescription": "Sonic wave sonophoresis and galvanic iontophoresis pushing actives deep into the dermis, followed by cryo-tightening therapy.",
    "fullDescription": "Ultrasonic sound waves temporarily increase cell permeability, allowing galvanic microcurrents to drive ionized peptide serums deep into dermal receptors. Cryo cold therapy then seals the active ingredients inside while shrinking pore openings.",
    "benefits": [
      "Dramatically enhances serum penetration and efficacy",
      "Micro-vibrations stimulate lymphatic drainage",
      "Cryo therapy tightens pores and calms post-facial flush",
      "Leaves skin firm, toned, and deeply nourished"
    ],
    "idealFor": "Maximum product infusion, post-treatment redness, open pores"
  },
  {
    "id": "eyebrow-shaping-tinting-face-threading",
    "slug": "eyebrow-shaping-tinting-face-threading",
    "title": "Eyebrow Shaping & Tinting + Face Threading",
    "category": "Facial Skin Treatments",
    "price": 35,
    "popular": false,
    "image": "/home-treatment-1.png",
    "tagline": "Precision brow architecture, custom tinting, and facial threading",
    "shortDescription": "Bespoke facial grooming including precision brow mapping, custom tint pigmentation, and delicate organic cotton threading.",
    "fullDescription": "Elevate your natural facial symmetry with precise brow architectural mapping, custom semi-permanent tinting tailored to your hair and skin undertones, and gentle full-face organic threading to eliminate stray hairs with clean definition.",
    "benefits": [
      "Flawless brow symmetry tailored to your face shape",
      "Long-lasting rich custom brow tinting",
      "Gentle organic threading suitable for sensitive skin",
      "Polished, beautifully defined facial frame"
    ],
    "idealFor": "Brow grooming, stray facial hair, defined eye framing"
  }
];

export const SKIN_CONCERNS = [
  {
    id: "acne-breakouts",
    slug: "acne-breakouts",
    number: "01",
    title: "Acne & Breakouts",
    subtitle: "Congestion, hormonal flares & active blemishes",
    description: "Explore consultation-led options designed for congested, oily, and breakout-prone skin without harsh stripping.",
    recommendedTreatments: ["high-frequency", "led-light-treatment", "rejuvenating-facial"],
    keyAdvice: "Consistency is vital. Harsh scrubbing often exacerbates inflamed barriers; instead, focus on antibacterial wavelength phototherapy and barrier-nourishing hydration.",
  },
  {
    id: "pigmentation",
    slug: "pigmentation",
    number: "02",
    title: "Pigmentation & Sun Damage",
    subtitle: "Uneven tone, sun spots & post-acne marks",
    description: "Build a personalised clinic plan targeting uneven-looking tone, melasma traces, and visible post-inflammatory marks.",
    recommendedTreatments: ["microdermabrasion", "microneedling", "led-light-treatment"],
    keyAdvice: "Safe exfoliation paired with cellular renewal therapies promotes fresh, evenly pigmented skin while daily broad-spectrum SPF defends your results.",
  },
  {
    id: "dull-skin",
    slug: "dull-skin",
    number: "03",
    title: "Dull Skin & Fatigue",
    subtitle: "Tired appearance, environmental stress & lack of glow",
    description: "Refresh tired-looking skin with professional exfoliation, active hydration, and therapeutic glow-boosting care.",
    recommendedTreatments: ["dermaplaning", "rejuvenating-facial", "facial-massage"],
    keyAdvice: "Dead skin accumulation blocks light reflection. A single session of dermaplaning or an enzymatic facial restores instant radiance.",
  },
  {
    id: "dry-skin",
    slug: "dry-skin",
    number: "04",
    title: "Dry & Dehydrated Skin",
    subtitle: "Tightness, flaking, seasonal dehydration & dullness",
    description: "Choose gentle, comfort-focused clinical treatments that support a replenished, plump, and fortified moisture barrier.",
    recommendedTreatments: ["rejuvenating-facial", "led-light-treatment", "facial-massage"],
    keyAdvice: "Dehydrated skin lacks water, while dry skin lacks oil. Our bespoke facials replenish both with hyaluronic acid infusions and peptide lipids.",
  },
  {
    id: "fine-lines",
    slug: "fine-lines",
    number: "05",
    title: "Fine Lines & Elasticity",
    subtitle: "Premature aging, loss of firmness & expression lines",
    description: "Explore skin-renewal treatments selected around your age-well goals, suitability, and natural collagen enhancement.",
    recommendedTreatments: ["microneedling", "led-light-treatment", "microdermabrasion"],
    keyAdvice: "Stimulating your body's intrinsic collagen production with microneedling provides lasting structural refinement that compounds over time.",
  },
  {
    id: "uneven-texture",
    slug: "uneven-texture",
    number: "06",
    title: "Uneven Texture & Pores",
    subtitle: "Rough texture, enlarged pores & superficial scarring",
    description: "Professional treatments engineered for a noticeably smoother, refined, and velvety skin surface finish.",
    recommendedTreatments: ["dermaplaning", "microneedling", "microdermabrasion"],
    keyAdvice: "Combining physical resurfacing with micro-channeling resurfaces the epidermis while refining pore structure from the inside out.",
  },
];

export const REVIEWS = [
  {
    id: "rev-1",
    author: "Aisha M.",
    treatment: "Rejuvenating Facial",
    rating: 5,
    date: "Leeds · Verified Client",
    quote: "A welcoming, relaxing experience from start to finish. My skin looked fresh and felt beautifully cared for without any aggressive redness.",
    highlight: "My skin had an instant glass-like radiance for days.",
  },
  {
    id: "rev-2",
    author: "Sophie K.",
    treatment: "Dermaplaning & LED",
    rating: 5,
    date: "Leeds · Verified Client",
    quote: "Everything was explained clearly and I felt completely comfortable throughout. I loved how silky-smooth my skin felt afterwards—makeup goes on like a dream!",
    highlight: "The most thorough, gentle dermaplaning I've ever had.",
  },
  {
    id: "rev-3",
    author: "Hannah T.",
    treatment: "Facial Massage & Wellness",
    rating: 5,
    date: "Leeds · Verified Client",
    quote: "Exactly the kind of calm, personal appointment I needed. The whole experience felt warm and professional, and my jaw tension completely disappeared.",
    highlight: "Warm, unhurried, one-to-one clinic atmosphere.",
  },
  {
    id: "rev-4",
    author: "Elena R.",
    treatment: "Microneedling Course",
    rating: 5,
    date: "Leeds · Verified Client",
    quote: "I was nervous about microneedling, but the practitioner made me feel so at ease. My acne scarring has softened significantly over 3 sessions.",
    highlight: "Real, visible improvement in my skin texture.",
  },
  {
    id: "rev-5",
    author: "Chloe D.",
    treatment: "High Frequency & Extraction",
    rating: 5,
    date: "Leeds · Verified Client",
    quote: "Finally a clinic that understands hormonal breakouts without pushing hundreds of pounds of unnecessary products. Transparent, honest, and caring.",
    highlight: "Transparent pricing and honest recommendations.",
  },
  {
    id: "rev-6",
    author: "Marcus P.",
    treatment: "Hot Stone Therapy",
    rating: 5,
    date: "Leeds · Verified Client",
    quote: "Phenomenal tension relief for stiff neck and shoulders. Left feeling completely rejuvenated and grounded. Will definitely be returning monthly.",
    highlight: "Unmatched stress relief in central Leeds.",
  },
];

export const RESULTS_CASE_STUDIES = [
  {
    id: "case-1",
    title: "Congestion & Breakout Reduction",
    treatment: "High Frequency + Blue LED Protocol",
    duration: "4 Weeks (3 Sessions)",
    concern: "Hormonal breakouts & persistent pore congestion",
    outcome: "Significant reduction in active inflammatory lesions and calmed redness across the T-zone.",
  },
  {
    id: "case-2",
    title: "Radiance & Surface Texture Renewal",
    treatment: "Dermaplaning + Rejuvenating Facial",
    duration: "Immediate + 2 Weeks Follow-up",
    concern: "Dull, flaky skin and rough texture preventing makeup adhesion",
    outcome: "Elimination of surface vellus hair, luminous light reflection, and velvet-smooth tactile texture.",
  },
  {
    id: "case-3",
    title: "Acne Scar Softening & Pore Refinement",
    treatment: "Microneedling Collagen Induction",
    duration: "12 Weeks (3 Sessions)",
    concern: "Post-inflammatory hyperpigmentation and shallow icepick acne scarring",
    outcome: "Visible dermal remodeling with shallower scar margins and tighter pore architecture.",
  },
  {
    id: "case-4",
    title: "Barrier Restoration & Redness Soothing",
    treatment: "Custom Calm Facial + Red LED Phototherapy",
    duration: "6 Weeks (2 Sessions)",
    concern: "Impaired moisture barrier with sensitive flaking and reactive flushing",
    outcome: "Restored lipid integrity, reduced vascular flushing, and sustained all-day hydration comfort.",
  },
];

export const FAQS = [
  {
    id: "faq-1",
    question: "How do I know which treatment is right for my skin concern?",
    answer: "You do not need to diagnose yourself or know the clinical treatment name before visiting. During your initial one-to-one consultation at our Leeds clinic, we assess your skin barrier, daily routine, and personal goals to recommend the most suitable, effective treatment protocol.",
  },
  {
    id: "faq-2",
    question: "Is there any downtime after treatments like dermaplaning or microneedling?",
    answer: "Our signature rejuvenating facials and dermaplaning require zero downtime—you can step straight out with an instant luminous glow. For microneedling, slight erythema (rosy flushing) is normal and typically subsides within 12–24 hours as natural collagen synthesis begins.",
  },
  {
    id: "faq-3",
    question: "Are appointments strictly private and one-to-one?",
    answer: "Yes, 100%. Luminous operates exclusively by appointment in a calm, private wellness suite in central Leeds. There are no crowded waiting rooms or overlapping bookings; your time is dedicated entirely to you and your skin.",
  },
  {
    id: "faq-4",
    question: "How should I prepare my skin before my appointment?",
    answer: "We advise pausing active exfoliants (such as AHAs, BHAs, glycolic peels, and retinoids) for 3 to 5 days prior to clinical treatments. Avoid direct UV tanning, and arrive hydrated. We always perform a thorough double-cleanse at the start of every treatment.",
  },
  {
    id: "faq-5",
    question: "How many sessions are recommended for optimal, lasting results?",
    answer: "Treatments like dermaplaning, LED phototherapy, and hydrating facials offer immediate visible radiance after just one session. For concerns like acne scarring, pigmentation, or uneven texture, a tailored course of 3 to 6 sessions produces compounding, long-lasting transformation.",
  },
  {
    id: "faq-6",
    question: "What is your clinic cancellation and rescheduling policy?",
    answer: "We kindly request at least 24 hours advance notice for cancellations or appointment adjustments. This allows us to accommodate clients on our Leeds waiting list. Rescheduling can be easily completed online or by contacting us directly.",
  },
];

