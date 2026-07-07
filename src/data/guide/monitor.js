export const MonitorApiUrl = "/api/monitors";

export const fetchMonitor = (...args) =>
  fetch(...args).then((res) => res.json());