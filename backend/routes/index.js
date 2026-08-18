const express = require("express");
const models = require("../models");

const router = express.Router();

// Map URL paths to models and data.json keys
const endpointMap = {
  services: { model: models.Service, dataKey: "services" },
  "new-and-features": { model: models.NewAndFeature, dataKey: "newAndFeatures" },
  categories: { model: models.Category, dataKey: "categories" },
  "latest-offer-categories": { model: models.LatestOfferCategory, dataKey: "latestOfferCategories" },
  "latest-offer-products": { model: models.LatestOfferProduct, dataKey: "latestOfferProducts" },
  products: { model: models.Product, dataKey: "products" },
  guide: { model: models.Guide, dataKey: "guide" },
  stores: { model: models.Store, dataKey: "stores" },
  "all-products-categories": { model: models.AllProductsCategory, dataKey: "all-products-categories" },
  "all-products": { model: models.AllProduct, dataKey: "all-products" },
  "payment-method": { model: models.PaymentMethod, dataKey: "payment-method" },
  "tv-guide": { model: models.TvGuide, dataKey: "TvGuide" },
  "smartphone-guide": { model: models.SmartphoneGuide, dataKey: "SmartphoneGuide" },
  "appliances-guide": { model: models.AppliancesGuide, dataKey: "AppliancesGuide" },
  "samsung-rewards-program": { model: models.SamsungRewardsProgram, dataKey: "samsung_rewards_program" },
  "samsung-advantage-for-students": { model: models.SamsungAdvantageForStudents, dataKey: "samsung_advantage_for_students" },
  "samsung-government": { model: models.SamsungGovernment, dataKey: "samsung_government" },
  business: { model: models.Business, dataKey: "business" },
  monitors: { model: models.Monitor, dataKey: "monitors" },
};

// Helper to get fallback data
function getFallbackData(endpointKey) {
  return global.FALLBACK_DATA?.[endpointKey] || [];
}

// Generic GET all for each endpoint
Object.entries(endpointMap).forEach(([path, { model, dataKey }]) => {
  router.get(`/${path}`, async (req, res) => {
    try {
      if (global.USE_MONGODB) {
        const items = await model.find({});
        res.json(items);
      } else {
        res.json(getFallbackData(dataKey));
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET by id
  router.get(`/${path}/:id`, async (req, res) => {
    try {
      let item;
      if (global.USE_MONGODB) {
        item = await model.findOne({ id: req.params.id });
      } else {
        item = getFallbackData(dataKey).find((d) => String(d.id) === req.params.id);
      }
      if (!item) {
        return res.status(404).json({ error: `Item with id '${req.params.id}' not found` });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST create
  router.post(`/${path}`, async (req, res) => {
    try {
      if (global.USE_MONGODB) {
        const item = await model.create(req.body);
        res.status(201).json(item);
      } else {
        const items = getFallbackData(dataKey);
        res.status(201).json({ ...req.body, _id: `fallback_${Date.now()}` });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT update by id
  router.put(`/${path}/:id`, async (req, res) => {
    try {
      if (global.USE_MONGODB) {
        const item = await model.findOneAndUpdate(
          { id: req.params.id },
          req.body,
          { new: true, runValidators: true }
        );
        if (!item) {
          return res.status(404).json({ error: `Item with id '${req.params.id}' not found` });
        }
        res.json(item);
      } else {
        const items = getFallbackData(dataKey);
        const idx = items.findIndex((d) => String(d.id) === req.params.id);
        if (idx === -1) {
          return res.status(404).json({ error: `Item with id '${req.params.id}' not found` });
        }
        const updated = { ...items[idx], ...req.body };
        items[idx] = updated;
        res.json(updated);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE by id
  router.delete(`/${path}/:id`, async (req, res) => {
    try {
      if (global.USE_MONGODB) {
        const item = await model.findOneAndDelete({ id: req.params.id });
        if (!item) {
          return res.status(404).json({ error: `Item with id '${req.params.id}' not found` });
        }
        res.json({ message: "Item deleted successfully" });
      } else {
        const items = getFallbackData(dataKey);
        const idx = items.findIndex((d) => String(d.id) === req.params.id);
        if (idx === -1) {
          return res.status(404).json({ error: `Item with id '${req.params.id}' not found` });
        }
        items.splice(idx, 1);
        res.json({ message: "Item deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// Generic endpoint that matches data.json keys directly (e.g., /api/data/services)
router.get("/data/:endpoint", async (req, res) => {
  const { endpoint } = req.params;
  const mapping = endpointMap[endpoint];

  if (!mapping) {
    return res.status(404).json({ error: `Endpoint '${endpoint}' not found` });
  }

  try {
    if (global.USE_MONGODB) {
      const items = await mapping.model.find({});
      res.json(items);
    } else {
      res.json(getFallbackData(mapping.dataKey));
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;