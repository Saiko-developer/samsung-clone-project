

export const AppliancesGuideApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/AppliancesGuide`;

export const fetchAppliancesGuide = (...args) =>
  fetch(...args).then((res) => res.json());

