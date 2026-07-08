import { create } from "zustand";

export const CategoryApiUrl = "/api/data/categories";

export const fetchCategory = (...args) =>
  fetch(...args).then((res) => res.json());
export const useCategory = create((set) => ({
  category: "Smartphones",
  setCategory: (category) => set({category}),
}));