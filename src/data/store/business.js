export const BusinessApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/business`;

export const fetchBusiness = (...args) =>
  fetch(...args).then((res) => res.json());