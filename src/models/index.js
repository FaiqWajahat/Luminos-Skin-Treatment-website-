import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
}, { timestamps: true });

const EnquirySchema = new mongoose.Schema({
  referenceId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  treatmentTitle: { type: String, default: "General Consultation" },
  timeframe: { type: String, default: "two-weeks" },
  preferredDate: { type: String, default: "" },
  timeSlot: { type: String, default: "morning" },
  message: { type: String, default: "" },
  skinPhoto: { type: String, default: "" },
  status: { type: String, enum: ["New", "In Progress", "Confirmed", "Completed", "Cancelled"], default: "New" },
  notes: { type: String, default: "" },
}, { timestamps: true });

const TreatmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  tagline: { type: String, default: "" },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, default: "" },
  benefits: [{ type: String }],
  idealFor: { type: String, default: "" },
  image: { type: String, default: "" },
  popular: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const ResultSchema = new mongoose.Schema({
  title: { type: String, required: true },
  treatment: { type: String, required: true },
  duration: { type: String, default: "" },
  concern: { type: String, required: true },
  outcome: { type: String, required: true },
  imageBefore: { type: String, default: "" },
  imageAfter: { type: String, default: "" },
  featured: { type: Boolean, default: true },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
export const Treatment = mongoose.models.Treatment || mongoose.model("Treatment", TreatmentSchema);
export const Result = mongoose.models.Result || mongoose.model("Result", ResultSchema);
