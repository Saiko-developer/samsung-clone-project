const express = require("express");
const models = require("../models");

const router = express.Router();

// Map URL paths to models
const endpointMap = {
  services: models.Service,
  "new-and-features": models.NewAndFeature,
  categories: models.Category,
  "latest-offer-categories": models.LatestOfferCategory,
  "latest-offer-products": models.LatestOfferProduct,
  products: models.Product,
  guide: models.Guide,
  stores: models.Store,
  "all-products-categories": models.AllProductsCategory,
  "all-products": models.AllProduct,
  "payment-method": models.PaymentMethod,
  "tv-guide": models.TvGuide,
  "smartphone-guide": models.SmartphoneGuide,
  "appliances-guide": models.AppliancesGuide,
  "samsung-rewards-program": models.SamsungRewardsProgram,
  "samsung-advantage-for-students": models.SamsungAdvantageForStudents,
  "samsung-government": models.SamsungGovernment,
  business: models.Business,
  monitors: models.Monitor,
};

// Generic GET all for each endpoint
Object.entries(endpointMap).forEach(([path, Model]) => {
  router.get(`/${path}`, async (req, res) => {
    try {
      const items = await Model.find({});
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET by id
  router.get(`/${path}/:id`, async (req, res) => {
    try {
      const item = await Model.findOne({ id: req.params.id });
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
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT update by id
  router.put(`/${path}/:id`, async (req, res) => {
    try {
      const item = await Model.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!item) {
        return res.status(404).json({ error: `Item with id '${req.params.id}' not found` });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE by id
  router.delete(`/${path}/:id`, async (req, res) => {
    try {
      const item = await Model.findOneAndDelete({ id: req.params.id });
      if (!item) {
        return res.status(404).json({ error: `Item with id '${req.params.id}' not found` });
      }
      res.json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// Generic endpoint that matches data.json keys directly (e.g., /api/data/services)
router.get("/data/:endpoint", async (req, res) => {
  const { endpoint } = req.params;
  const Model = endpointMap[endpoint];

  if (!Model) {
    return res.status(404).json({ error: `Endpoint '${endpoint}' not found` });
  }

  try {
    const items = await Model.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;