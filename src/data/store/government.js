export const GovernmentApiUrl = "/api/data/samsung_government";

export const fetchGovernment = (...args) =>
  fetch(...args).then((res) => res.json());