export const TvApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/TvGuide`;

export const fetchTvGuide = (...args) =>
  fetch(...args).then((res) => res.json());
