export const latestOfferCategoriesApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/latestOfferCategories`;

export const fetchCategory = (...args) =>
  fetch(...args).then((res) => res.json());



