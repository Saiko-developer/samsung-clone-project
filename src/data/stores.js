export const StoresApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/stores`;

export const fetchStores = (...args) =>
  fetch(...args).then((res) => res.json());