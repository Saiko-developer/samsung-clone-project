export const serviceApi = `${process.env.NEXT_PUBLIC_API_URL}/services`;

export const fetchServices= (...args) =>
  fetch(...args).then((res) => res.json());
