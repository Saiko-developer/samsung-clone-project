import { create } from "zustand";
import localData from "../../../data.json";

export const AllProductsApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/all-products`;

export const fetchAllProducts = (...args) =>
  fetch(...args).then((res) => res.json());
// export const AllProductsApiUrl = "local-dummy-url-products";
// export const fetchAllProducts = () => Promise.resolve(localData.products || []);
// export const useProducts = () => localData.products || [];
export const useProductStore = create((set) => ({
//    AllProductsApiUrl: localData["all-products"] || [], 

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