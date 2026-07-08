export const MonitorApiUrl = "/api/data/monitors";

export const fetchMonitor = (...args) =>
  fetch(...args).then((res) => res.json());