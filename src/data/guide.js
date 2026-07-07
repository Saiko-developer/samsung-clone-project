export const GuideApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/guide`;

export const fetchGuide = (...args) =>
  fetch(...args).then((res) => res.json());
