export const SmartphoneApiUrl = "/api/data/SmartphoneGuide";

export const fetchSmartphone = (...args) =>
  fetch(...args).then((res) => res.json());