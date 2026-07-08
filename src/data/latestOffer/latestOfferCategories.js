export const latestOfferCategoriesApiUrl = "/api/data/latestOfferCategories";

export const fetchCategory = (...args) =>
  fetch(...args).then((res) => res.json());