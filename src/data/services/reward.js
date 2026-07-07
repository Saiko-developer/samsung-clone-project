export const RewardApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/samsung_rewards_program`;

export const fetchReward = (...args) =>
  fetch(...args).then((res) => res.json());
