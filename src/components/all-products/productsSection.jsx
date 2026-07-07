"use client";
import {
  AllProductsApiUrl,
  fetchAllProducts,
  useProducts,
} from "@/data/all-products/categories";
import useSWR from "swr";
import { useEffect } from "react";
import ProductCards from "./productCards";

const ProductsSection = ({ initialCategory, initialSubname }) => {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR(AllProductsApiUrl, fetchAllProducts);

  const category = useProducts((state) => state.category);
  const setCategory = useProducts((state) => state.setCategory);
  const subname = useProducts((state) => state.subname);
  const setSubname = useProducts((state) => state.setSubname);

  // Apply initial params from URL query on mount
  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
    if (initialSubname) {
      setSubname(initialSubname);
    }
  }, []); // only on mount

  const normalize = (str) => (str ?? "").toLowerCase().replace(/[-\s&]/g, "");

  const filterProducts = (products ?? []).filter(
    (product) => normalize(product.category) === normalize(category),
  );
  const uniqueSubname = [
    ...new Map(
      filterProducts.filter((p) => p.subname).map((p) => [p.subname, p]),
    ).values(),
  ].map((p) => p.subname);

  useEffect(() => {
    if (uniqueSubname.length > 0) {
      const currentSubnameIsValid = uniqueSubname.some(
        (name) => normalize(name) === normalize(subname),
      );
      if (!currentSubnameIsValid) {
        setSubname(uniqueSubname[0]);
      }
    }
  }, [category, products]);

  const finalFilterProducts = filterProducts.filter(
    (product) => normalize(product.subname) === normalize(subname),
  );

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 py-10 text-lg">Loading....</p>
    );
  }
  if (error) {
    return (
      <p className="text-center text-red-500 py-10 text-lg">
        Failed to load products. Make sure the API server is running.
      </p>
    );
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <div>
          <div className="flex justify-center items-center gap-3">
            {/* Render unique subname filter buttons */}
            {uniqueSubname.map((name, index) => (
              <button
                key={index}
                className={`   text-sm  ${
                  normalize(subname) === normalize(name)
                    ? "border-b-2 border-black"
                    : ""
                }`}
                onClick={() => setSubname(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <ProductCards products={finalFilterProducts} />
      </div>
    </section>
  );
};

export default ProductsSection;
