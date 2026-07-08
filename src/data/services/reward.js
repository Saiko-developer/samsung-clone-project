export const RewardApiUrl = "/api/data/samsung_rewards_program";

export const fetchReward = (...args) =>
  fetch(...args).then((res) => res.json());