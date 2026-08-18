const mongoose = require("mongoose");

// Generic flexible schema - allows any fields from data.json
const flexibleSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

// Define all models based on data.json collections
const models = {
  Service: mongoose.model("Service", flexibleSchema, "services"),
  NewAndFeature: mongoose.model("NewAndFeature", flexibleSchema, "newAndFeatures"),
  Category: mongoose.model("Category", flexibleSchema, "categories"),
  LatestOfferCategory: mongoose.model("LatestOfferCategory", flexibleSchema, "latestOfferCategories"),
  LatestOfferProduct: mongoose.model("LatestOfferProduct", flexibleSchema, "latestOfferProducts"),
  Product: mongoose.model("Product", flexibleSchema, "products"),
  Guide: mongoose.model("Guide", flexibleSchema, "guide"),
  Store: mongoose.model("Store", flexibleSchema, "stores"),
  AllProductsCategory: mongoose.model("AllProductsCategory", flexibleSchema, "all-products-categories"),
  AllProduct: mongoose.model("AllProduct", flexibleSchema, "all-products"),
  PaymentMethod: mongoose.model("PaymentMethod", flexibleSchema, "payment-method"),
  TvGuide: mongoose.model("TvGuide", flexibleSchema, "TvGuide"),
  SmartphoneGuide: mongoose.model("SmartphoneGuide", flexibleSchema, "SmartphoneGuide"),
  AppliancesGuide: mongoose.model("AppliancesGuide", flexibleSchema, "AppliancesGuide"),
  SamsungRewardsProgram: mongoose.model("SamsungRewardsProgram", flexibleSchema, "samsung_rewards_program"),
  SamsungAdvantageForStudents: mongoose.model("SamsungAdvantageForStudents", flexibleSchema, "samsung_advantage_for_students"),
  SamsungGovernment: mongoose.model("SamsungGovernment", flexibleSchema, "samsung_government"),
  Business: mongoose.model("Business", flexibleSchema, "business"),
  Monitor: mongoose.model("Monitor", flexibleSchema, "monitors"),
};

module.exports = models;