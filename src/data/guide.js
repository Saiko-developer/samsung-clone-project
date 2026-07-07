export const GuideApiUrl = "/api/guide";

export const fetchGuide = (...args) =>
  fetch(...args).then((res) => res.json());