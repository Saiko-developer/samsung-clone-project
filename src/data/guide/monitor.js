export const MonitorApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/monitors`;

export const fetchMonitor = (...args) =>
  fetch(...args).then((res) => res.json());
