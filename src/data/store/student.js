export const StudentApiUrl = "/api/data/samsung_advantage_for_students";

export const fetchStudent = (...args) =>
  fetch(...args).then((res) => res.json());