export const GuideApiUrl = "/api/data/guide";

export const fetchGuide = (...args) =>
  fetch(...args).then((res) => res.json());