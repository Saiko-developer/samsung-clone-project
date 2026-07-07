export const AppliancesGuideApiUrl = "/api/AppliancesGuide";

export const fetchAppliancesGuide = (...args) =>
  fetch(...args).then((res) => res.json());