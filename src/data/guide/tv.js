export const TvApiUrl = "/api/TvGuide";

export const fetchTvGuide = (...args) =>
  fetch(...args).then((res) => res.json());