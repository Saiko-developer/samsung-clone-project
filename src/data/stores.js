export const StoresApiUrl = "/api/data/stores";

export const fetchStores = (...args) =>
  fetch(...args).then((res) => res.json());