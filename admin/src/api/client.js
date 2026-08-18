const API_BASE = "/api";

export const collections = [
  { name: "services", label: "Services", icon: "🛎️" },
  { name: "new-and-features", label: "New & Features", icon: "✨" },
  { name: "categories", label: "Categories", icon: "📁" },
  { name: "latest-offer-categories", label: "Latest Offer Categories", icon: "🏷️" },
  { name: "latest-offer-products", label: "Latest Offer Products", icon: "🔥" },
  { name: "products", label: "Products", icon: "📱" },
  { name: "guide", label: "Guide", icon: "📖" },
  { name: "stores", label: "Stores", icon: "🏬" },
  { name: "all-products-categories", label: "All Products Categories", icon: "🗂️" },
  { name: "all-products", label: "All Products", icon: "🛍️" },
  { name: "payment-method", label: "Payment Methods", icon: "💳" },
  { name: "tv-guide", label: "TV Guide", icon: "📺" },
  { name: "smartphone-guide", label: "Smartphone Guide", icon: "📱" },
  { name: "appliances-guide", label: "Appliances Guide", icon: "🧊" },
  { name: "samsung-rewards-program", label: "Samsung Rewards", icon: "🎁" },
  { name: "samsung-advantage-for-students", label: "Student Advantage", icon: "🎓" },
  { name: "samsung-government", label: "Government", icon: "🏛️" },
  { name: "business", label: "Business", icon: "💼" },
  { name: "monitors", label: "Monitors", icon: "🖥️" },
];

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
  getAll: (collection) => request(`/${collection}`),
  getById: (collection, id) => request(`/${collection}/${id}`),
  create: (collection, data) =>
    request(`/${collection}`, { method: "POST", body: JSON.stringify(data) }),
  update: (collection, id, data) =>
    request(`/${collection}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (collection, id) =>
    request(`/${collection}/${id}`, { method: "DELETE" }),
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