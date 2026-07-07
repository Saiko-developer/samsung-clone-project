export const GovernmentApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/samsung_government`;

export const fetchGovernment = (...args) =>
  fetch(...args).then((res) => res.json());
