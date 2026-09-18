import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Read .env.local
const envPath = path.join(process.cwd(), ".env.local");
let mongoUri = "mongodb://127.0.0.1:27017/luminous";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("MONGODB_URI=")) {
      mongoUri = trimmed.replace("MONGODB_URI=", "").trim();
      if ((mongoUri.startsWith('"') && mongoUri.endsWith('"')) || (mongoUri.startsWith("'") && mongoUri.endsWith("'"))) {
        mongoUri = mongoUri.slice(1, -1);
      }
    }
  }
}

// If URI does not specify a database name before '?', append /luminous
if (mongoUri.includes(".mongodb.net/?")) {
  mongoUri = mongoUri.replace(".mongodb.net/?", ".mongodb.net/luminous?");
} else if (mongoUri.endsWith(".mongodb.net") || mongoUri.endsWith(".mongodb.net/")) {
  mongoUri = mongoUri.replace(/\/?$/, "/luminous");
}

console.log("Using MongoDB URI:", mongoUri.replace(/:([^:@]+)@/, ":****@"));

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function run() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✓ Connected successfully to database:", mongoose.connection.name);

    // Check existing users
    const existingUsers = await User.find({}).lean();
    console.log("Current users in MongoDB:", existingUsers.map(u => ({ email: u.email, role: u.role, name: u.name })));

    // Seed admin user
    const adminEmail = "admin@luminous.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`Admin user ${adminEmail} already exists. Updating password & role...`);
      existingAdmin.password = "luminous123";
      existingAdmin.role = "admin";
      existingAdmin.name = "Admin";
      await existingAdmin.save();
      console.log(`✓ Admin user ${adminEmail} updated successfully.`);
    } else {
      console.log(`Creating admin user ${adminEmail}...`);
      await User.create({
        name: "Admin",
        email: adminEmail,
        password: "luminous123",
        role: "admin",
      });
      console.log(`✓ Admin user ${adminEmail} created successfully.`);
    }

    // Also seed Dr. Sarah Jenkins if not present
    const managerEmail = "sarah.jenkins@luminous.com";
    const existingManager = await User.findOne({ email: managerEmail });
    if (!existingManager) {
      console.log(`Creating manager user ${managerEmail}...`);
      await User.create({
        name: "Dr. Sarah Jenkins",
        email: managerEmail,
        password: "jenkinsPassword2026",
        role: "manager",
      });
      console.log(`✓ Manager user ${managerEmail} created successfully.`);
    }

    // Verify all users in MongoDB
    const allUsers = await User.find({}, "-password").lean();
    console.log("\n=========================================");
    console.log("USERS CURRENTLY IN MONGODB:");
    console.log(JSON.stringify(allUsers, null, 2));
    console.log("=========================================\n");

    await mongoose.disconnect();
    console.log("✓ Disconnected cleanly from MongoDB.");
  } catch (err) {
    console.error("MongoDB seed error:", err);
    process.exit(1);
  }
}

run();
