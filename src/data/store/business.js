export const BusinessApiUrl = "/api/data/business";

export const fetchBusiness = (...args) =>
  fetch(...args).then((res) => res.json());