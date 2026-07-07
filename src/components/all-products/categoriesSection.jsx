"use client";
import {
  AllProductsCategoriesApiUrl,
  fetchAllProductsCategories,
  useProducts,
} from "@/data/all-products/categories";
import Image from "next/image";
import useSWR from "swr";

const CategoriesSection = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useSWR(AllProductsCategoriesApiUrl, fetchAllProductsCategories);
  const setCategory = useProducts((state) => state.setCategory);
  const currentCategory = useProducts((state) => state.category);
  const filterCategories = [
    ...new Map(categories?.map((p) => [p.category, p])).values(),
  ];

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
    <section className="flex flex-col  p-5">
      <div className="text-xl md:text-4xl font-mono font-semibold mb-2">
        <h1 >{currentCategory}</h1>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {filterCategories?.map((cat, index) => (
        <button
          key={cat.id}
          className={`border rounded-xl ${
            index === 0
              ? "flex bg-stone-50 px-3 py-2 sm:px-4 sm:py-2 w-full sm:w-auto"
              : "w-full sm:w-40 md:w-45 h-auto sm:h-35 " + (currentCategory === cat.category ? "bg-stone-200" : "bg-stone-50")
          }`}
          onClick={() => {
            setCategory(cat.category);
          }}
        >
          {index === 0 ? (
              <div className="flex flex-row items-center gap-2">
                <div className="shrink-0">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={50}
                    height={50}
                    className="w-6 h-6 md:w-15 md:h-15 object-contain hover:scale-105 transform transition duration-500"
                  />
                </div>
                <div className="flex flex-col font-mono">
                  <span className="text-xs font-bold">{cat.category}</span>
                  <span className="text-[10px] text-gray-600">A true AI companion Galaxy AI</span>
                </div>
              </div>
          ) : (
            <div className="flex flex-row items-center justify-center gap-2 p-2">
              <div className="shrink-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={30}
                  height={30}
                  className="object-contain w-6 h-6 md:w-15 md:h-15 hover:scale-105 transform transition duration-500"
                />
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-center">
                <span>{cat.category}</span>
              </div>
            </div>
          )}
        </button>
      ))}
      </div>
    </section>
  );
};
export default CategoriesSection;
