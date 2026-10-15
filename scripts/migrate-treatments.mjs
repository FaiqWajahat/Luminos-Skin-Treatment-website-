/**
 * Replace the treatments collection with the new 5-category treatment menu
 * from src/constants/treatment-catalog.js.
 *
 *   npm run migrate:treatments              -> dry run (shows what would change)
 *   npm run migrate:treatments -- --confirm -> backs up current treatments, then replaces them
 *
 * A JSON backup of the existing treatments is written to scripts/backups/ first.
 */
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { CATALOG_TREATMENTS } from "../src/constants/treatment-catalog.js";

const confirm = process.argv.includes("--confirm");

function readMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  const envFile = path.join(process.cwd(), ".env.local");
  const match = fs.existsSync(envFile) && fs.readFileSync(envFile, "utf8").match(/^MONGODB_URI=(.*)$/m);
  if (!match) throw new Error("MONGODB_URI not found in environment or .env.local");
  return match[1].trim().replace(/^["']|["']$/g, "");
}

const now = new Date();
const docs = CATALOG_TREATMENTS.map((t, idx) => ({
  title: t.title,
  slug: t.slug,
  category: t.category,
  price: t.price,
  priceOptions: t.priceOptions || [],
  duration: t.duration || "",
  tagline: "",
  shortDescription: t.shortDescription,
  fullDescription: "",
  journey: t.journey || [],
  benefits: t.benefits || [],
  idealFor: t.idealFor || "",
  aftercare: t.aftercare || [],
  frequency: t.frequency || "",
  image: t.image || "",
  popular: Boolean(t.popular),
  active: true,
  order: idx + 1,
  createdAt: now,
  updatedAt: now,
}));

await mongoose.connect(readMongoUri());
const collection = mongoose.connection.db.collection("treatments");
const existing = await collection.find({}).toArray();

console.log(`Database: ${mongoose.connection.db.databaseName}`);
console.log(`Current treatments: ${existing.length}`);
console.log(`New treatment menu: ${docs.length} treatments in 5 categories`);

if (!confirm) {
  console.log("\nDry run only. Re-run with --confirm to back up and replace the treatments.");
} else {
  const backupDir = path.join(process.cwd(), "scripts", "backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const backupFile = path.join(backupDir, `treatments-${now.toISOString().replace(/[:.]/g, "-")}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(existing, null, 2));
  console.log(`\nBacked up ${existing.length} treatments to ${path.relative(process.cwd(), backupFile)}`);

  await collection.deleteMany({});
  await collection.insertMany(docs);
  console.log(`Inserted ${docs.length} treatments.`);
}

await mongoose.disconnect();
