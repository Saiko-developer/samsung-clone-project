export const StoresApiUrl = "/api/stores";

export const fetchStores = (...args) =>
  fetch(...args).then((res) => res.json());