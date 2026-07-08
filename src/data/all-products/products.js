import { create } from "zustand";


export const AllProductsApiUrl = "/api/data/all-products";

export const fetchAllProducts = (...args) =>
  fetch(...args).then((res) => res.json());

export const useProductStore = create((set) => ({
  
  storage: "",

  setStorage: (storage) =>
    set({ storage }),

  camera: "",

  setCamera: (camera) =>
    set({ camera }),
  price: "",

  setPrice: (price) =>
    set({ price }),
  range: "",

  setRange: (range) =>
    set({ range }),
  
  selectedProduct:null,
  setSelectedProduct:(selectedProduct) => set({selectedProduct})
}));