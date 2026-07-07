"use client";
import { fetchProduct, latestOfferProductsApiUrl } from "@/data/latestOffer/latestOfferProducts";
import { fetchProduct as fetchRegularProduct, productApiUrl } from "@/data/latest/products";
import { fetchNewAndFeatures, newAndFeaturesUrl } from "@/data/newIn&Features/data";
import React from "react";
import useSWR from "swr";
import Image from "next/image";
import { AllProductsApiUrl, fetchAllProducts } from "@/data/all-products/products";

const ProductDetailSection = ({ productId }) => {
  // Fetch from all three APIs to cover all product types
  const { data: offerProducts, isLoading: offerLoading, error: offerError } = useSWR(latestOfferProductsApiUrl, fetchProduct);
  const { data: regularProducts, isLoading: regularLoading, error: regularError } = useSWR(productApiUrl, fetchRegularProduct);
  const { data: newAndFeaturesProducts, isLoading: newAndFeaturesLoading, error: newAndFeaturesError } = useSWR(newAndFeaturesUrl, fetchNewAndFeatures);
  const {data:allProducts, isLoading:allProducLoading,error:allProductError} = useSWR(AllProductsApiUrl,fetchAllProducts)
  const isLoading = offerLoading || regularLoading || newAndFeaturesLoading ||allProducLoading;
  const error = offerError || regularError || newAndFeaturesError || allProductError;

  // Try to find product in any data source
  const product = offerProducts?.find((p) => String(p.id) === String(productId)) ||
                  regularProducts?.find((p) => String(p.id) === String(productId)) ||
                  newAndFeaturesProducts?.find((p) => String(p.id) === String(productId)) ||
                  allProducts?.find((p) =>String(p.id) === String(productId));

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
  if (!product) {
    return (
      <p className="text-center text-gray-500 py-10 text-lg">
        Product not found.
      </p>
    );
  }
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain w-full max-w-[180px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[300px] h-auto rounded-lg"
          />
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center px-2">
          {product.title}
        </h1>
        <div className="flex flex-col gap-0 divide-y divide-gray-200">
          {product.specs &&
            Object.entries(product.specs).map(([category, specs]) => (
              <div
                key={category}
                className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 lg:gap-5 py-3 sm:py-4 lg:py-5 px-1 sm:px-0"
              >
                <h2 className="text-base sm:text-lg font-semibold sm:w-32 md:w-36 lg:w-40 shrink-0 text-gray-900">
                  {category}
                </h2>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                  {specs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex flex-col bg-gray-50 rounded-lg p-2 sm:p-3"
                    >
                      <span className="text-[11px] sm:text-xs lg:text-sm text-gray-500 uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <span className="text-sm sm:text-base font-medium text-gray-900 mt-0.5 sm:mt-1">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailSection;