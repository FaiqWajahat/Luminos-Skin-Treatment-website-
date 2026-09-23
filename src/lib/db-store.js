import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { connectToDatabase } from "./mongodb";
import { User, Enquiry, Treatment, Result, Content, BlockedSlot } from "@/models";
import {
  TREATMENTS,
  RESULTS_CASE_STUDIES,
  FAQS,
} from "@/constants/clinic-data";

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
    content: [
      {
        _id: "content-homepage",
        type: "homepage",
        data: {
          faqs: FAQS,
          heroImage: "/about-01.jpeg",
          heroHighlight: "Leeds LS11 · Private Clinical Sanctuary",
          heroTitle: "Clinical Precision.",
          heroTitleHighlight: "Effortlessly Luminous.",
          heroSubtitle:
            "Bespoke one-to-one skin therapies designed to reveal your healthiest complexion. From restorative facials and collagen induction to targeted phototherapy—tailored purely to your skin.",
          faqs: FAQS,
          consultantLoungeImage: "/home-01.jpeg",
        },
      },
      {
        _id: "content-aboutpage",
        type: "aboutpage",
        data: {
          heroImage: "/about-hero-img.png",
          heroHighlight: "Where Beauty Meets Serenity · Leeds",
          heroTitle: "Welcome to Luminous Skin Clinic,",
          heroTitleHighlight: "Where Beauty Meets Serenity.",
          heroSubtitle:
            "More than just a salon, it’s your personal escape to self-care and skin wellness. Step into calm sophistication and let your confidence shine — because at Luminous Skin Clinic, your skin deserves nothing less than perfection.",
          founderName: "Olenka",
          founderTitle: "Clinic Founder & Senior Skin Specialist",
          founderImage: "/Olenka-1.jpeg",
          founderBio:
            "With over a decade of clinical experience in advanced skin therapies, Olenka founded Luminous with a singular vision: to bridge the gap between pampering spa facials and high-tech medical aesthetics.\n\nShe believes that achieving phenomenal clinical results doesn't require compromising on luxury or comfort. Her protocols are heavily researched and strictly customized for each individual's unique skin barrier.\n\n\"The skin is complex, but the philosophy is simple: respect the barrier, stimulate regeneration, and protect the results.\" - Olenka",
        },
      },
    ],
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
export async function getTreatments({ page, limit, category } = {}) {
  const isPaginated = Boolean(page || limit);
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

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

      const query = {};
      if (category && category.toLowerCase() !== "all") {
        query.category = { $regex: new RegExp(`^${category.trim()}$`, "i") };
      }

      if (isPaginated) {
        const total = await Treatment.countDocuments(query);
        const list = await Treatment.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .lean();
        const treatments = list.map((item) => ({
          ...item,
          _id: item._id.toString(),
        }));
        const totalPages = Math.ceil(total / limitNum) || 1;
        return {
          treatments,
          pagination: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages,
            hasPrevPage: pageNum > 1,
            hasNextPage: pageNum < totalPages,
          },
        };
      }

      const list = await Treatment.find(query).sort({ createdAt: -1 }).lean();
      return list.map((item) => ({ ...item, _id: item._id.toString() }));
    }
  } catch (err) {
    console.warn(
      "MongoDB query fallback to local store (getTreatments):",
      err.message,
    );
  }

  const store = getLocalStore();
  let list = store.treatments || [];
  if (category && category.toLowerCase() !== "all") {
    list = list.filter(
      (t) =>
        (t.category || "").trim().toLowerCase() ===
        category.trim().toLowerCase(),
    );
  }

  if (isPaginated) {
    const total = list.length;
    const paginatedList = list.slice(skip, skip + limitNum);
    const totalPages = Math.ceil(total / limitNum) || 1;
    return {
      treatments: paginatedList,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasPrevPage: pageNum > 1,
        hasNextPage: pageNum < totalPages,
      },
    };
  }

  return list;
}

export async function createTreatment(data) {
  const { _id, id: _tempId, ...createPayload } = data;
  let createdDoc = null;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      try {
        const created = await Treatment.create(createPayload);
        createdDoc = { ...created.toObject(), _id: created._id.toString() };
      } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
          createPayload.slug = `${createPayload.slug}-${Math.random().toString(36).substring(2, 8)}`;
          const created = await Treatment.create(createPayload);
          createdDoc = { ...created.toObject(), _id: created._id.toString() };
        } else {
          throw err;
        }
      }
    }
  } catch (err) {
    console.error("MongoDB error (createTreatment):", err.message);
    throw err;
  }

  const store = getLocalStore();
  const newTreatment = createdDoc || {
    ...data,
    _id:
      "treat-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
  };
  store.treatments = store.treatments.filter((t) => t._id !== newTreatment._id);
  store.treatments.unshift(newTreatment);
  saveLocalStore(store);
  return newTreatment;
}

export async function updateTreatment(id, data) {
  const { _id, id: _tempId, ...updatePayload } = data;
  let updatedDoc = null;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      try {
        const updated = await Treatment.findByIdAndUpdate(id, updatePayload, {
          returnDocument: "after",
        }).lean();
        if (updated) updatedDoc = { ...updated, _id: updated._id.toString() };
      } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
          updatePayload.slug = `${updatePayload.slug}-${Math.random().toString(36).substring(2, 8)}`;
          const updated = await Treatment.findByIdAndUpdate(id, updatePayload, {
            returnDocument: "after",
          }).lean();
          if (updated) updatedDoc = { ...updated, _id: updated._id.toString() };
        } else {
          throw err;
        }
      }
    }
  } catch (err) {
    console.error("MongoDB error (updateTreatment):", err.message);
    throw err;
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
  store.treatments[idx] = {
    ...store.treatments[idx],
    ...data,
    ...(updatedDoc || {}),
    updatedAt: new Date().toISOString(),
  };
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
export async function getResults({ page, limit } = {}) {
  const isPaginated = Boolean(page || limit);
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

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

      if (isPaginated) {
        const total = await Result.countDocuments();
        const list = await Result.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .lean();
        const results = list.map((item) => ({
          ...item,
          _id: item._id.toString(),
        }));
        const totalPages = Math.ceil(total / limitNum) || 1;
        return {
          results,
          pagination: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages,
            hasPrevPage: pageNum > 1,
            hasNextPage: pageNum < totalPages,
          },
        };
      }

      const list = await Result.find().sort({ createdAt: -1 }).lean();
      return list.map((item) => ({ ...item, _id: item._id.toString() }));
    }
  } catch (err) {
    console.warn("MongoDB query fallback (getResults):", err.message);
  }

  const store = getLocalStore();
  const list = store.results || [];
  if (isPaginated) {
    const total = list.length;
    const paginatedList = list.slice(skip, skip + limitNum);
    const totalPages = Math.ceil(total / limitNum) || 1;
    return {
      results: paginatedList,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasPrevPage: pageNum > 1,
        hasNextPage: pageNum < totalPages,
      },
    };
  }

  return list;
}

export async function createResult(data) {
  const { _id, id: _tempId, ...createPayload } = data;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const created = await Result.create(createPayload);
      return { ...created.toObject(), _id: created._id.toString() };
    }
  } catch (err) {
    console.error("MongoDB error (createResult):", err.message);
    throw err;
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

export async function updateResult(id, data) {
  const { _id, id: _tempId, ...updatePayload } = data;
  let updatedDoc = null;
  try {
    const conn = await connectToDatabase();
    if (conn && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Result.findByIdAndUpdate(id, updatePayload, {
        returnDocument: "after",
      }).lean();
      if (updated) updatedDoc = { ...updated, _id: updated._id.toString() };
    }
  } catch (err) {
    console.error("MongoDB error (updateResult):", err.message);
    throw err;
  }

  const store = getLocalStore();
  if (!store.results) store.results = [];
  const idx = store.results.findIndex((r) => r._id === id || r.id === id);
  if (idx === -1) {
    if (updatedDoc) {
      store.results.unshift(updatedDoc);
      saveLocalStore(store);
      return updatedDoc;
    }
    return null;
  }
  store.results[idx] = {
    ...store.results[idx],
    ...data,
    ...(updatedDoc || {}),
    updatedAt: new Date().toISOString(),
  };
  saveLocalStore(store);
  return store.results[idx];
}

export async function deleteResult(id) {
  try {
    const conn = await connectToDatabase();
    if (conn && mongoose.Types.ObjectId.isValid(id)) {
      await Result.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error("MongoDB error (deleteResult):", err.message);
    throw err;
  }

  const store = getLocalStore();
  store.results = store.results.filter((r) => r._id !== id && r.id !== id);
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
  let createdDoc = null;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const created = await Enquiry.create(data);
      createdDoc = { ...created.toObject(), _id: created._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB fallback (createEnquiry):", err.message);
  }

  const store = getLocalStore();
  const newEnquiry = createdDoc || {
    ...data,
    _id: "enq-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
  };

  if (!store.enquiries) store.enquiries = [];
  store.enquiries = store.enquiries.filter(
    (e) => e._id !== newEnquiry._id && e.referenceId !== newEnquiry.referenceId
  );
  store.enquiries.unshift(newEnquiry);
  saveLocalStore(store);
  return newEnquiry;
}

export async function updateEnquiry(id, data) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const updated = await Enquiry.findByIdAndUpdate(id, data, {
        new: true,
      }).lean();
      if (updated) return { ...updated, _id: updated._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB fallback (updateEnquiry):", err.message);
  }

  const store = getLocalStore();
  const idx = store.enquiries.findIndex((e) => e._id === id);
  if (idx === -1) return null;
  store.enquiries[idx] = {
    ...store.enquiries[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
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
      const list = await User.find({}, "-password")
        .sort({ createdAt: -1 })
        .lean();
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
  return (
    (store.users || []).find((u) => u.email.toLowerCase() === norm) || null
  );
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
    _id:
      "user-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
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

// ─────────────────────────────────────────────
// CONTENT (CMS)
// ─────────────────────────────────────────────
export async function getContent(type) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      // Auto-seed if empty
      const count = await Content.countDocuments();
      if (count === 0) {
        const seed = [
          {
            type: "homepage",
            data: {
              heroImage: "/about-01.jpeg",
              heroHighlight: "Leeds LS11 · Private Clinical Sanctuary",
              heroTitle: "Clinical Precision.",
              heroTitleHighlight: "Effortlessly Luminous.",
              heroSubtitle:
                "Bespoke one-to-one skin therapies designed to reveal your healthiest complexion. From restorative facials and collagen induction to targeted phototherapy—tailored purely to your skin.",
              faqs: FAQS,
              consultantLoungeImage: "/home-01.jpeg",
            },
          },
          {
            type: "aboutpage",
            data: {
              heroImage: "/about-hero-img.png",
              heroHighlight: "Where Beauty Meets Serenity · Leeds",
              heroTitle: "Welcome to Luminous Skin Clinic,",
              heroTitleHighlight: "Where Beauty Meets Serenity.",
              heroSubtitle:
                "More than just a salon, it’s your personal escape to self-care and skin wellness. Step into calm sophistication and let your confidence shine — because at Luminous Skin Clinic, your skin deserves nothing less than perfection.",
              founderName: "Olenka",
              founderTitle: "Clinic Founder & Senior Skin Specialist",
              founderImage: "/Olenka-1.jpeg",
              founderBio:
                "With over a decade of clinical experience in advanced skin therapies, Olenka founded Luminous with a singular vision: to bridge the gap between pampering spa facials and high-tech medical aesthetics.",
            },
          },
        ];
        await Content.insertMany(seed);
      }

      const doc = await Content.findOne({ type }).lean();
      if (doc) return { ...doc, _id: doc._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB query fallback (getContent):", err.message);
  }

  const store = getLocalStore();
  return (store.content || []).find((c) => c.type === type) || null;
}

export async function updateContent(type, data) {
  let updatedDoc = null;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const updated = await Content.findOneAndUpdate(
        { type },
        { data },
        { new: true, upsert: true, returnDocument: "after" },
      ).lean();
      if (updated) updatedDoc = { ...updated, _id: updated._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB fallback (updateContent):", err.message);
  }

  const store = getLocalStore();
  if (!store.content) store.content = [];
  const idx = store.content.findIndex((c) => c.type === type);

  const payload = updatedDoc || {
    type,
    data,
    updatedAt: new Date().toISOString(),
  };

  if (idx === -1) {
    if (!payload._id) payload._id = "content-" + type;
    if (!payload.createdAt) payload.createdAt = new Date().toISOString();
    store.content.push(payload);
  } else {
    store.content[idx] = { ...store.content[idx], ...payload };
  }

  saveLocalStore(store);
  return store.content.find((c) => c.type === type) || payload;
}

// ─────────────────────────────────────────────
// BLOCKED SLOTS / CLINIC CLOSURES
// ─────────────────────────────────────────────
export async function getBlockedSlots() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const list = await BlockedSlot.find().sort({ createdAt: -1 }).lean();
      return list.map((item) => ({ ...item, _id: item._id.toString() }));
    }
  } catch (err) {
    console.warn("MongoDB query fallback (getBlockedSlots):", err.message);
  }

  const store = getLocalStore();
  return store.blockedSlots || [];
}

export async function createBlockedSlot(data) {
  let createdDoc = null;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const created = await BlockedSlot.create(data);
      createdDoc = { ...created.toObject(), _id: created._id.toString() };
    }
  } catch (err) {
    console.warn("MongoDB error (createBlockedSlot):", err.message);
  }

  const store = getLocalStore();
  if (!store.blockedSlots) store.blockedSlots = [];
  const newItem = createdDoc || {
    _id: "blk-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    ...data,
    createdAt: new Date().toISOString(),
  };

  store.blockedSlots.unshift(newItem);
  saveLocalStore(store);
  return newItem;
}

export async function deleteBlockedSlot(id) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        await BlockedSlot.findByIdAndDelete(id);
      } else {
        await BlockedSlot.deleteOne({ _id: id });
      }
    }
  } catch (err) {
    console.warn("MongoDB error (deleteBlockedSlot):", err.message);
  }

  const store = getLocalStore();
  if (store.blockedSlots) {
    store.blockedSlots = store.blockedSlots.filter((b) => b._id !== id);
    saveLocalStore(store);
  }
  return { success: true };
}
