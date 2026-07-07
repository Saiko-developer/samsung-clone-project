export const newAndFeaturesUrl = "/api/newAndFeatures";

export const fetchNewAndFeatures = (...args) =>
  fetch(...args).then((res) => res.json());