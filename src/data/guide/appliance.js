export const AppliancesGuideApiUrl = "/api/data/AppliancesGuide";

export const fetchAppliancesGuide = (...args) =>
  fetch(...args).then((res) => res.json());