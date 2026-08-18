require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const dns = require("node:dns/promises");
const routes = require("./routes");

// Use Google/Cloudflare DNS servers to resolve MongoDB Atlas SRV records
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Global flag to control data source
global.USE_MONGODB = false;

// Load data.json as fallback data source
const dataPath = path.join(__dirname, "..", "data.json");
global.FALLBACK_DATA = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Samsung Clone Backend API",
    dataSource: global.USE_MONGODB ? "MongoDB" : "data.json (fallback)",
  });
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    global.USE_MONGODB = true;
    console.log("✅ Connected to MongoDB Atlas");
    console.log(`📦 Data source: MongoDB`);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.warn("⚠️  MongoDB connection failed:", error.message);
    console.warn("📦 Falling back to data.json (in-memory mode)");
    global.USE_MONGODB = false;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (fallback mode)`);
    });
  }
}

startServer();