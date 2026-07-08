export const newAndFeaturesUrl = "/api/data/newAndFeatures";

export const fetchNewAndFeatures = (...args) =>
  fetch(...args).then((res) => res.json());