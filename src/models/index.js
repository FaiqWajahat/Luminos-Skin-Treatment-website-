import mongoose from "mongoose";

// In development, hot reload keeps the old compiled model in mongoose.models, so schema
// changes (new fields) would be silently dropped until a restart. Recompile there.
function defineModel(name, schema) {
  if (process.env.NODE_ENV !== "production" && mongoose.models[name]) {
    mongoose.deleteModel(name);
  }
  return mongoose.models[name] || mongoose.model(name, schema);
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true },
);

const EnquirySchema = new mongoose.Schema(
  {
    referenceId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    category: { type: String, default: "" },
    treatmentSlug: { type: String, default: "" },
    treatmentTitle: { type: String, default: "General Consultation" },
    timeframe: { type: String, default: "two-weeks" },
    preferredDate: { type: String, default: "" },
    timeSlot: { type: String, default: "morning" },
    message: { type: String, default: "" },
    skinPhoto: { type: String, default: "" },
    status: {
      type: String,
      enum: ["New", "In Progress", "Confirmed", "Completed", "Cancelled"],
      default: "New",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

const TreatmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    priceOptions: [{ type: String }],
    duration: { type: String, default: "" },
    tagline: { type: String, default: "" },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, default: "" },
    journey: [{ type: String }],
    benefits: [{ type: String }],
    idealFor: { type: String, default: "" },
    aftercare: [{ type: String }],
    frequency: { type: String, default: "" },
    order: { type: Number, default: 0 },
    image: { type: String, default: "" },
    popular: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const ResultSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    treatment: { type: String, required: true },
    duration: { type: String, default: "" },
    concern: { type: String, required: true },
    outcome: { type: String, required: true },
    imageBefore: { type: String, default: "" },
    imageAfter: { type: String, default: "" },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const InstagramPostSchema = new mongoose.Schema(
  {
    postId: { type: String, required: true, unique: true },
    permalink: { type: String, required: true },
    mediaUrl: { type: String, required: true },
    caption: { type: String, default: "" },
    dateStr: { type: String, default: "" },
    mediaType: {
      type: String,
      enum: ["IMAGE", "VIDEO", "CAROUSEL_ALBUM"],
      default: "IMAGE",
    },
    timestamp: { type: Date, default: Date.now },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const User = defineModel("User", UserSchema);
export const Enquiry =
  defineModel("Enquiry", EnquirySchema);
export const Treatment =
  defineModel("Treatment", TreatmentSchema);
export const Result =
  defineModel("Result", ResultSchema);
export const InstagramPost =
  defineModel("InstagramPost", InstagramPostSchema);

const ContentSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, unique: true }, // e.g., 'homepage', 'aboutpage'
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

export const Content =
  defineModel("Content", ContentSchema);

const BlockedSlotSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    slot: { type: String, required: true }, // "FULL_DAY", "09:30 AM", or custom "05:15 PM"
    reason: { type: String, default: "Admin Blocked" },
    type: { type: String, enum: ["FULL_DAY", "SLOT"], default: "SLOT" },
  },
  { timestamps: true },
);

export const BlockedSlot =
  defineModel("BlockedSlot", BlockedSlotSchema);
