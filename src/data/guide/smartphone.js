
export const SmartphoneApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/SmartphoneGuide`;

export const fetchSmartphone = (...args) =>
  fetch(...args).then((res) => res.json());

