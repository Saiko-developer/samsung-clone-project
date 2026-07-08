export const serviceApi = "/api/data/services";

export const fetchServices = (...args) =>
  fetch(...args).then((res) => res.json());