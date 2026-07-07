export const SmartphoneApiUrl = "/api/SmartphoneGuide";

export const fetchSmartphone = (...args) =>
  fetch(...args).then((res) => res.json());