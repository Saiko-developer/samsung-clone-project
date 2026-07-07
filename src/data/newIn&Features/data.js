 export const newAndFeaturesUrl = `${process.env.NEXT_PUBLIC_API_URL}/newAndFeatures`;
 export const fetchNewAndFeatures = (...args) =>
  fetch(...args).then((res) => res.json());
