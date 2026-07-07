import { create } from "zustand";

export const latestOfferProductsApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/latestOfferProducts`;

export const fetchProduct = (...args) =>
  fetch(...args).then((res) => res.json());
export const useProductStore = create((set) => ({
    category:"Appliances",
    setCategory :(category) => set({category}),
    selectedProduct:null,
    setSelectedProduct:(selectedProduct) => set({selectedProduct})
}

))
// export const useProductStore = create((set) => ({
//   category: "Appliances",

//   setCategory: (category) =>
//     set({
//       category,
//     }),
// }));
