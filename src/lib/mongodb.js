import mongoose from "mongoose";

let rawUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/luminous";
if (rawUri.includes(".mongodb.net/?")) {
  rawUri = rawUri.replace(".mongodb.net/?", ".mongodb.net/luminous?");
} else if (rawUri.endsWith(".mongodb.net") || rawUri.endsWith(".mongodb.net/")) {
  rawUri = rawUri.replace(/\/?$/, "/luminous");
}
const MONGODB_URI = rawUri;

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2500,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => m)
      .catch((err) => {
        console.warn("MongoDB connection notice:", err.message);
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    cached.conn = null;
  }

  return cached.conn;
}
