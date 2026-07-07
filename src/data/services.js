export const serviceApi = "/api/services";

export const fetchServices = (...args) =>
  fetch(...args).then((res) => res.json());