export const GovernmentApiUrl = "/api/samsung_government";

export const fetchGovernment = (...args) =>
  fetch(...args).then((res) => res.json());