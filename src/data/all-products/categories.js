import { create } from "zustand";


export const AllProductsCategoriesApiUrl = "/api/all-products-categories";

export const fetchAllProductsCategories = (...args) =>
  fetch(...args).then((res) => res.json());

export const AllProductsApiUrl = "/api/all-products";

export const fetchAllProducts = (...args) =>
  fetch(...args).then((res) => res.json());

export const useProducts = create((set) => ({

  category: "Galaxy Smartphone",
  setCategory: (category) => set({ category }),
  subname: "Galaxy S",
  setSubname: (subname) => set({ subname }),
}));