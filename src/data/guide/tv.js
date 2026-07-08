export const TvApiUrl = "/api/data/TvGuide";

export const fetchTvGuide = (...args) =>
  fetch(...args).then((res) => res.json());