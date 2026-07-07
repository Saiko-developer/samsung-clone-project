"use client";

import {
  fetchCategory,
  latestOfferCategoriesApiUrl,
} from "@/data/latestOffer/latestOfferCategories";
import { useProductStore } from "@/data/latestOffer/latestOfferProducts";
import React from "react";
import useSWR from "swr";

const LatestOfferCategoriesSection = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useSWR(latestOfferCategoriesApiUrl, fetchCategory);

  const setCategory = useProductStore((state) => state.setCategory);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 py-10 text-lg">Loading....</p>
    );
  }
  if (error) {
    return (
      <p className="text-center text-red-500 py-10 text-lg">
        Failed to load categories. Make sure the API server is running.
      </p>
    );
  }

  return (
    <main>
      <div className="p-3 md:p-5">
        <h1 className="text-2xl md:text-4xl font-mono font-bold">
          Latest Offers
        </h1>
      </div>
      <section className="flex justify-center items-center gap-4">
        {categories?.map((category) => (
          <button
            onClick={() => setCategory(category.name)}
            key={category.id}
            className="font-bold font-mono active:border-b-2 active:border-black text-xs md:2xl lg:2xl"
          >
            {category.name}
          </button>
        ))}
      </section>
    </main>
  );
};

export default LatestOfferCategoriesSection;
