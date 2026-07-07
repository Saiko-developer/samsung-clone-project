import { create } from "zustand";

export const productApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const fetchProduct = (...args) =>
  fetch(...args).then((res) => res.json());
export const useProducts = create((set) => ({
  category: "New & Features",
  setCategory: (category) => set({category}),
  subname:"New & Features",
  setSubname:(subname) => set({subname}),
  selectedProduct:null,
  setSelectedProduct:(selectedProduct) => set({selectedProduct})
}));

