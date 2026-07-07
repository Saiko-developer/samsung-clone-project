export const latestOfferCategoriesApiUrl = "/api/latestOfferCategories";

export const fetchCategory = (...args) =>
  fetch(...args).then((res) => res.json());