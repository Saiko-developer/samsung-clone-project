export const StudentApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/samsung_advantage_for_students`;

export const fetchStudent = (...args) =>
  fetch(...args).then((res) => res.json());
