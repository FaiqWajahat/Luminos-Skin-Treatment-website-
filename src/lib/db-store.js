import fs from "fs";
import path from "path";
import { connectToDatabase } from "./mongodb";
import { User, Enquiry, Treatment, Result } from "@/models";
import { TREATMENTS, RESULTS_CASE_STUDIES } from "@/constants/clinic-data";

const STORE_PATH = path.join(process.cwd(), "src", "data", "db-store.json");

// Initialize local JSON store if not exists
function getLocalStore() {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (fs.existsSync(STORE_PATH)) {
      const data = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading local db store:", err);
  }

  // Initial seed
  const initial = {
    users: [
      {
        _id: "user-root-admin",
        name: "Admin",
        email: "admin@luminous.com",
        password: "luminous123",
        role: "admin",
        createdAt: new Date().toISOString(),
      },
    ],
    treatments: TREATMENTS.map((t, idx) => ({
      _id: "treat-" + (t.slug || idx),
      title: t.title,
      slug: t.slug,
      category: t.category,
      price: t.price,
      duration: t.duration,
      tagline: t.tagline || "",
      shortDescription: t.shortDescription || "",
      fullDescription: t.fullDescription || "",
      benefits: t.benefits || [],
      idealFor: t.idealFor || "",
      image: t.image || "",
      popular: Boolean(t.popular),
      active: true,
      createdAt: new Date().toISOString(),
    })),
    results: RESULTS_CASE_STUDIES.map((r, idx) => ({
      _id: "result-" + (r.id || idx),
      title: r.title,
      treatment: r.treatment,
      duration: r.duration,
      concern: r.concern,
      outcome: r.outcome,
      imageBefore: "",
      imageAfter: "",
      featured: true,
      createdAt: new Date().toISOString(),
    })),
    enquiries: [],
  };

  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing initial db store:", err);
  }
  return initial;
}

function saveLocalStore(store) {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving local db store:", err);
  }
}

// ─────────────────────────────────────────────
// TREATMENTS
// ─────────────────────────────────────────────
export async function getTreatments() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const count = await Treatment.countDocuments();
      if (count === 0) {
        // Auto-seed MongoDB
        const seedData = TREATMENTS.map((t) => ({
          title: t.title,
          slug: t.slug,
          category: t.category,
          price: t.price,
          duration: t.duration,
          tagline: t.tagline || "",
          shortDescription: t.shortDescription || "",
          fullDescription: t.fullDescription || "",
          benefits: t.benefits || [],
          idealFor: t.idealFor || "",
          image: t.image || "",
          popular: Boolean(t.popular),
          active: true,
        }));
        await Treatment.insertMany(seedData);
      }
      const list = await Treatment.find().sort({ createdAt: -1 }).lean();
      return list.map((item) => ({ ...item, _id: item._id.toString() }));
    }
  } catch (err) {
    console.warn("MongoDB query fallback to local store (getTreatments):", err.message);
  }

  const store = getLocalStore();
  return store.treatments || [];
}

export async function createTreatment(data) {
  let createdDoc = null;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const created = await Treatment.create(data);
      createdDoc = { ...created.toObject(), _id: created._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB fallback (createTreatment):", err.message);
  }

  const store = getLocalStore();
  const newTreatment = createdDoc || {
    ...data,
    _id: "treat-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
  };
  store.treatments = store.treatments.filter((t) => t._id !== newTreatment._id);
  store.treatments.unshift(newTreatment);
  saveLocalStore(store);
  return newTreatment;
}

export async function updateTreatment(id, data) {
  let updatedDoc = null;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const updated = await Treatment.findByIdAndUpdate(id, data, { new: true }).lean();
      if (updated) updatedDoc = { ...updated, _id: updated._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB fallback (updateTreatment):", err.message);
  }

  const store = getLocalStore();
  const idx = store.treatments.findIndex((t) => t._id === id);
  if (idx === -1) {
    if (updatedDoc) {
      store.treatments.unshift(updatedDoc);
      saveLocalStore(store);
      return updatedDoc;
    }
    return null;
  }
  store.treatments[idx] = { ...store.treatments[idx], ...data, ...(updatedDoc || {}), updatedAt: new Date().toISOString() };
  saveLocalStore(store);
  return store.treatments[idx];
}

export async function deleteTreatment(id) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await Treatment.findByIdAndDelete(id);
    }
  } catch (err) {
    console.warn("MongoDB fallback (deleteTreatment):", err.message);
  }

  const store = getLocalStore();
  store.treatments = store.treatments.filter((t) => t._id !== id);
  saveLocalStore(store);
  return true;
}

// ─────────────────────────────────────────────
// RESULTS / CASE STUDIES
// ─────────────────────────────────────────────
export async function getResults() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const count = await Result.countDocuments();
      if (count === 0) {
        const seed = RESULTS_CASE_STUDIES.map((r) => ({
          title: r.title,
          treatment: r.treatment,
          duration: r.duration,
          concern: r.concern,
          outcome: r.outcome,
          imageBefore: "",
          imageAfter: "",
          featured: true,
        }));
        await Result.insertMany(seed);
      }
      const list = await Result.find().sort({ createdAt: -1 }).lean();
      return list.map((item) => ({ ...item, _id: item._id.toString() }));
    }
  } catch (err) {
    console.warn("MongoDB query fallback (getResults):", err.message);
  }

  const store = getLocalStore();
  return store.results || [];
}

export async function createResult(data) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const created = await Result.create(data);
      return { ...created.toObject(), _id: created._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB fallback (createResult):", err.message);
  }

  const store = getLocalStore();
  const newResult = {
    ...data,
    _id: "res-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
  };
  store.results.unshift(newResult);
  saveLocalStore(store);
  return newResult;
}

export async function deleteResult(id) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await Result.findByIdAndDelete(id);
      return true;
    }
  } catch (err) {
    console.warn("MongoDB fallback (deleteResult):", err.message);
  }

  const store = getLocalStore();
  store.results = store.results.filter((r) => r._id !== id);
  saveLocalStore(store);
  return true;
}

// ─────────────────────────────────────────────
// ENQUIRIES / BOOKINGS
// ─────────────────────────────────────────────
export async function getEnquiries() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const list = await Enquiry.find().sort({ createdAt: -1 }).lean();
      return list.map((item) => ({ ...item, _id: item._id.toString() }));
    }
  } catch (err) {
    console.warn("MongoDB query fallback (getEnquiries):", err.message);
  }

  const store = getLocalStore();
  return store.enquiries || [];
}

export async function createEnquiry(data) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const created = await Enquiry.create(data);
      return { ...created.toObject(), _id: created._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB fallback (createEnquiry):", err.message);
  }

  const store = getLocalStore();
  const newEnquiry = {
    ...data,
    _id: "enq-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
  };
  store.enquiries.unshift(newEnquiry);
  saveLocalStore(store);
  return newEnquiry;
}

export async function updateEnquiry(id, data) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const updated = await Enquiry.findByIdAndUpdate(id, data, { new: true }).lean();
      if (updated) return { ...updated, _id: updated._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB fallback (updateEnquiry):", err.message);
  }

  const store = getLocalStore();
  const idx = store.enquiries.findIndex((e) => e._id === id);
  if (idx === -1) return null;
  store.enquiries[idx] = { ...store.enquiries[idx], ...data, updatedAt: new Date().toISOString() };
  saveLocalStore(store);
  return store.enquiries[idx];
}

export async function deleteEnquiry(id) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await Enquiry.findByIdAndDelete(id);
      return true;
    }
  } catch (err) {
    console.warn("MongoDB fallback (deleteEnquiry):", err.message);
  }

  const store = getLocalStore();
  store.enquiries = store.enquiries.filter((e) => e._id !== id);
  saveLocalStore(store);
  return true;
}

// ─────────────────────────────────────────────
// USERS / ADMIN AUTH
// ─────────────────────────────────────────────
export async function getUsers() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const list = await User.find({}, "-password").sort({ createdAt: -1 }).lean();
      return list.map((item) => ({ ...item, _id: item._id.toString() }));
    }
  } catch (err) {
    console.warn("MongoDB query fallback (getUsers):", err.message);
  }

  const store = getLocalStore();
  return (store.users || []).map(({ password, ...rest }) => rest);
}

export async function findUserByEmail(email) {
  const norm = email.toLowerCase().trim();
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const u = await User.findOne({ email: norm }).lean();
      if (u) return { ...u, _id: u._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB query fallback (findUserByEmail):", err.message);
  }

  const store = getLocalStore();
  return (store.users || []).find((u) => u.email.toLowerCase() === norm) || null;
}

export async function createUser(data) {
  const norm = data.email.toLowerCase().trim();
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const created = await User.create({ ...data, email: norm });
      const obj = created.toObject();
      delete obj.password;
      return { ...obj, _id: obj._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB fallback (createUser):", err.message);
  }

  const store = getLocalStore();
  const existing = store.users.find((u) => u.email.toLowerCase() === norm);
  if (existing) {
    throw new Error("User with this email already exists");
  }

  const newUser = {
    ...data,
    email: norm,
    _id: "user-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
  };
  store.users.unshift(newUser);
  saveLocalStore(store);

  const { password, ...safe } = newUser;
  return safe;
}

export async function deleteUser(id) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await User.findByIdAndDelete(id);
      return true;
    }
  } catch (err) {
    console.warn("MongoDB fallback (deleteUser):", err.message);
  }

  const store = getLocalStore();
  store.users = store.users.filter((u) => u._id !== id);
  saveLocalStore(store);
  return true;
}
