export const BusinessApiUrl = "/api/business";

export const fetchBusiness = (...args) =>
  fetch(...args).then((res) => res.json());