require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const models = require("../models");

// Load data.json from the project root
const dataPath = path.join(__dirname, "..", "..", "data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Map data.json keys to model names
const collectionMap = {
  services: "Service",
  newAndFeatures: "NewAndFeature",
  categories: "Category",
  latestOfferCategories: "LatestOfferCategory",
  latestOfferProducts: "LatestOfferProduct",
  products: "Product",
  guide: "Guide",
  stores: "Store",
  "all-products-categories": "AllProductsCategory",
  "all-products": "AllProduct",
  "payment-method": "PaymentMethod",
  TvGuide: "TvGuide",
  SmartphoneGuide: "SmartphoneGuide",
  AppliancesGuide: "AppliancesGuide",
  samsung_rewards_program: "SamsungRewardsProgram",
  samsung_advantage_for_students: "SamsungAdvantageForStudents",
  samsung_government: "SamsungGovernment",
  business: "Business",
  monitors: "Monitor",
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    for (const [key, modelName] of Object.entries(collectionMap)) {
      const Model = models[modelName];
      const items = data[key];

      if (!items || !Array.isArray(items)) {
        console.log(`⚠️  Skipping '${key}' - not an array or missing`);
        continue;
      }

      // Clear existing data
      await Model.deleteMany({});
      console.log(`🗑️  Cleared collection: ${key}`);

      // Insert new data
      if (items.length > 0) {
        await Model.insertMany(items);
        console.log(`✅ Seeded ${items.length} documents into '${key}'`);
      } else {
        console.log(`ℹ️  '${key}' is empty, nothing to seed`);
      }
    }

    console.log("\n🎉 Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Disconnected from MongoDB");
  }
}

seed();