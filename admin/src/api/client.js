const API_BASE = "/api";

// Import data.json as a local fallback so the admin dashboard always has data
// even if the backend server isn't running.
import fallbackData from "../../../data.json";

export const collections = [
  { name: "services", label: "Services", icon: "🛎️", dataKey: "services" },
  { name: "new-and-features", label: "New & Features", icon: "✨", dataKey: "newAndFeatures" },
  { name: "categories", label: "Categories", icon: "📁", dataKey: "categories" },
  { name: "latest-offer-categories", label: "Latest Offer Categories", icon: "🏷️", dataKey: "latestOfferCategories" },
  { name: "latest-offer-products", label: "Latest Offer Products", icon: "🔥", dataKey: "latestOfferProducts" },
  { name: "products", label: "Products", icon: "📱", dataKey: "products" },
  { name: "guide", label: "Guide", icon: "📖", dataKey: "guide" },
  { name: "stores", label: "Stores", icon: "🏬", dataKey: "stores" },
  { name: "all-products-categories", label: "All Products Categories", icon: "🗂️", dataKey: "all-products-categories" },
  { name: "all-products", label: "All Products", icon: "🛍️", dataKey: "all-products" },
  { name: "payment-method", label: "Payment Methods", icon: "💳", dataKey: "payment-method" },
  { name: "tv-guide", label: "TV Guide", icon: "📺", dataKey: "TvGuide" },
  { name: "smartphone-guide", label: "Smartphone Guide", icon: "📱", dataKey: "SmartphoneGuide" },
  { name: "appliances-guide", label: "Appliances Guide", icon: "🧊", dataKey: "AppliancesGuide" },
  { name: "samsung-rewards-program", label: "Samsung Rewards", icon: "🎁", dataKey: "samsung_rewards_program" },
  { name: "samsung-advantage-for-students", label: "Student Advantage", icon: "🎓", dataKey: "samsung_advantage_for_students" },
  { name: "samsung-government", label: "Government", icon: "🏛️", dataKey: "samsung_government" },
  { name: "business", label: "Business", icon: "💼", dataKey: "business" },
  { name: "monitors", label: "Monitors", icon: "🖥️", dataKey: "monitors" },
];

// Helper: get fallback data from data.json
export function getLocalData(collectionName) {
  const meta = collections.find((c) => c.name === collectionName);
  if (!meta) return [];
  return fallbackData[meta.dataKey] || [];
}

// Try fetching from backend API first, fall back to local data.json
function getLocalCollectionItems(collectionName) {
  return getLocalData(collectionName);
}

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export const api = {
  async getAll(collection) {
    try {
      return await request(`/${collection}`);
    } catch (err) {
      // Fall back to local data.json
      console.warn(`Backend unavailable for '${collection}', using local data.json:`, err.message);
      return getLocalCollectionItems(collection);
    }
  },

  async getById(collection, id) {
    try {
      return await request(`/${collection}/${id}`);
    } catch (err) {
      const items = getLocalCollectionItems(collection);
      return items.find((d) => String(d.id) === String(id)) || null;
    }
  },

  async create(collection, data) {
    try {
      return await request(`/${collection}`, { method: "POST", body: JSON.stringify(data) });
    } catch (err) {
      throw new Error(`Cannot create in '${collection}' — backend is offline. Start the backend server.`);
    }
  },

  async update(collection, id, data) {
    try {
      return await request(`/${collection}/${id}`, { method: "PUT", body: JSON.stringify(data) });
    } catch (err) {
      throw new Error(`Cannot update in '${collection}' — backend is offline. Start the backend server.`);
    }
  },

  async remove(collection, id) {
    try {
      return await request(`/${collection}/${id}`, { method: "DELETE" });
    } catch (err) {
      throw new Error(`Cannot delete in '${collection}' — backend is offline. Start the backend server.`);
    }
  },
};

export function formatValue(value) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "✓" : "✗";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function getSummaryFields(item) {
  const keys = Object.keys(item || {});
  const priority = ["title", "name", "id", "category", "description", "price"];
  const sortedKeys = [...priority.filter((k) => keys.includes(k)), ...keys.filter((k) => !priority.includes(k))];
  return sortedKeys.slice(0, 4);
}