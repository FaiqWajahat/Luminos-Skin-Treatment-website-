import mongoose from "mongoose";

const uriTest = "mongodb+srv://faiqwajahat:faiq1234@cluster0.zrsvv8t.mongodb.net/test?appName=Cluster0";
const uriLuminous = "mongodb+srv://faiqwajahat:faiq1234@cluster0.zrsvv8t.mongodb.net/luminous?appName=Cluster0";

async function sync() {
  const connT = await mongoose.createConnection(uriTest).asPromise();
  const connL = await mongoose.createConnection(uriLuminous).asPromise();

  // Sync results from test to luminous
  const resultsT = await connT.collection("results").find({}).toArray();
  console.log(`Found ${resultsT.length} results in 'test'. Syncing to 'luminous'...`);
  for (const r of resultsT) {
    const { _id, ...doc } = r;
    await connL.collection("results").updateOne({ _id }, { $set: doc }, { upsert: true });
  }

  // Remove dummy results from luminous if needed
  const dummyTitles = [
    "Severe Redness & Barrier Calm Journey",
    "Congestion & Breakout Reduction",
    "Radiance & Surface Texture Renewal",
    "Acne Scar Softening & Pore Refinement",
    "Barrier Restoration & Redness Soothing"
  ];
  await connL.collection("results").deleteMany({ title: { $in: dummyTitles } });

  // Sync enquiries
  const enquiriesT = await connT.collection("enquiries").find({}).toArray();
  console.log(`Found ${enquiriesT.length} enquiries in 'test'. Syncing to 'luminous'...`);
  for (const e of enquiriesT) {
    const { _id, ...doc } = e;
    await connL.collection("enquiries").updateOne({ _id }, { $set: doc }, { upsert: true });
  }

  console.log("Sync complete!");
  await connT.close();
  await connL.close();
}

sync().catch(console.error);
