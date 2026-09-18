import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const storePath = path.join(process.cwd(), "src", "data", "db-store.json");
const store = JSON.parse(fs.readFileSync(storePath, "utf-8"));

const baseUri = "mongodb+srv://faiqwajahat:faiq1234@cluster0.zrsvv8t.mongodb.net/?appName=Cluster0";

const targetDbs = ["test", "luminous"];

async function seedDatabase(dbName) {
  const uri = `mongodb+srv://faiqwajahat:faiq1234@cluster0.zrsvv8t.mongodb.net/${dbName}?appName=Cluster0`;
  console.log(`\n========================================`);
  console.log(`SEEDING DATABASE: [${dbName}]`);
  console.log(`========================================`);

  const conn = await mongoose.createConnection(uri).asPromise();
  console.log(`✓ Connected to ${dbName}`);

  // 1. Users Collection
  const usersCol = conn.collection("users");
  console.log(`Processing 'users' in ${dbName}...`);
  for (const user of store.users) {
    const filter = { email: user.email.toLowerCase().trim() };
    const doc = {
      name: user.name,
      email: user.email.toLowerCase().trim(),
      password: user.password,
      role: user.role || "admin",
      updatedAt: new Date(),
    };
    await usersCol.updateOne(filter, { $set: doc, $setOnInsert: { createdAt: new Date() } }, { upsert: true });
  }
  const userCount = await usersCol.countDocuments();
  console.log(`✓ 'users' in ${dbName} now has ${userCount} documents.`);

  // 2. Treatments Collection
  const treatmentsCol = conn.collection("treatments");
  console.log(`Processing 'treatments' in ${dbName}...`);
  for (const t of store.treatments) {
    const filter = { slug: t.slug };
    const doc = {
      title: t.title,
      slug: t.slug,
      category: t.category,
      price: Number(t.price) || 0,
      duration: Number(t.duration) || 0,
      tagline: t.tagline || "",
      shortDescription: t.shortDescription || "",
      fullDescription: t.fullDescription || "",
      benefits: Array.isArray(t.benefits) ? t.benefits : [],
      idealFor: t.idealFor || "",
      image: t.image || "",
      popular: Boolean(t.popular),
      active: t.active !== false,
      updatedAt: new Date(),
    };
    await treatmentsCol.updateOne(filter, { $set: doc, $setOnInsert: { createdAt: new Date() } }, { upsert: true });
  }
  const treatmentCount = await treatmentsCol.countDocuments();
  console.log(`✓ 'treatments' in ${dbName} now has ${treatmentCount} documents.`);

  // 3. Results Collection
  const resultsCol = conn.collection("results");
  console.log(`Processing 'results' in ${dbName}...`);
  for (const r of store.results) {
    const filter = { title: r.title, treatment: r.treatment };
    const doc = {
      title: r.title,
      treatment: r.treatment,
      duration: r.duration || "",
      concern: r.concern || "",
      outcome: r.outcome || "",
      imageBefore: r.imageBefore || "",
      imageAfter: r.imageAfter || "",
      featured: r.featured !== false,
      updatedAt: new Date(),
    };
    await resultsCol.updateOne(filter, { $set: doc, $setOnInsert: { createdAt: new Date() } }, { upsert: true });
  }
  const resultCount = await resultsCol.countDocuments();
  console.log(`✓ 'results' in ${dbName} now has ${resultCount} documents.`);

  // 4. Enquiries Collection
  const enquiriesCol = conn.collection("enquiries");
  console.log(`Processing 'enquiries' in ${dbName}...`);
  for (const e of store.enquiries || []) {
    const filter = { referenceId: e.referenceId };
    const doc = {
      referenceId: e.referenceId,
      name: e.name,
      email: e.email,
      phone: e.phone,
      treatmentTitle: e.treatmentTitle || "General Consultation",
      timeframe: e.timeframe || "two-weeks",
      preferredDate: e.preferredDate || "",
      timeSlot: e.timeSlot || "morning",
      message: e.message || "",
      skinPhoto: e.skinPhoto || "",
      status: e.status || "New",
      notes: e.notes || "",
      updatedAt: new Date(),
    };
    await enquiriesCol.updateOne(filter, { $set: doc, $setOnInsert: { createdAt: new Date() } }, { upsert: true });
  }
  const enquiryCount = await enquiriesCol.countDocuments();
  console.log(`✓ 'enquiries' in ${dbName} now has ${enquiryCount} documents.`);

  await conn.close();
  console.log(`✓ Closed connection to ${dbName}.`);
}

async function main() {
  try {
    for (const dbName of targetDbs) {
      await seedDatabase(dbName);
    }
    console.log(`\n🎉 ALL DATABASES (test & luminous) SUCCESSFULLY SEEDED IN MONGODB CLUSTER!`);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

main();
