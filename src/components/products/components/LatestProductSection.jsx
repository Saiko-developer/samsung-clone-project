import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useSWR from "swr";
import {
  fetchProduct,
  productApiUrl,
  useProducts as useLatestProducts,
} from "@/data/latest/products";
import { useProducts as useAllProducts } from "@/data/all-products/categories";
import Image from "next/image";
import {
  fetchNewAndFeatures,
  newAndFeaturesUrl,
} from "@/data/newIn&Features/data";
import { useRouter } from "next/navigation";
const LatestProductSection = () => {
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useSWR(productApiUrl, fetchProduct);
  const router = useRouter();
  const setSelectedProduct = useLatestProducts(
    (state) => state.setSelectedProduct,
  );

  // Fetch newAndFeatures from the same API

  const { data: newAndFeatures, isLoading: newAndFeaturesLoading } = useSWR(
    newAndFeaturesUrl,
    fetchNewAndFeatures,
  );

  const category = useLatestProducts((state) => state.category);
  const subname = useLatestProducts((state) => state.subname);
  const setSubname = useLatestProducts((state) => state.setSubname);
  const setCategory = useAllProducts((state) => state.setCategory);

  const handleViewAll = () => {
    setCategory(category);
    setSubname(subname);

    router.push("/products");
  };

  const normalize = (str) => (str ?? "").toLowerCase().replace(/[-\s&]/g, "");

  // Determine the source data:
  //    - For "New & Features" category, use the newAndFeatures endpoint
  //    - For other categories, use the regular products endpoint
  const isNewAndFeatures = normalize(category) === normalize("New & Features");

  // Determine loading/error state based on which data source is active
  const isLoading = isNewAndFeatures ? newAndFeaturesLoading : productsLoading;
  const error = isNewAndFeatures ? false : productsError;

  const sourceProducts = isNewAndFeatures
    ? (newAndFeatures ?? [])
    : (products ?? []);

  // 1. Filter products by the active main category
  const filterProducts = sourceProducts.filter(
    (product) => normalize(product.category) === normalize(category),
  );

  // 2. Extract unique subcategories from the filtered category list
  const uniqueSubnames = [
    ...new Map(
      filterProducts.filter((p) => p.subname).map((p) => [p.subname, p]),
    ).values(),
  ].map((p) => p.subname);
  // 3. Automatically pick the first subcategory as a default when data loads or category changes
  useEffect(() => {
    if (uniqueSubnames.length > 0) {
      // Check if current subname matches any subname in this new category
      const currentSubnameIsValid = uniqueSubnames.some(
        (name) => normalize(name) === normalize(subname),
      );

      // If it doesn't match (or is empty), auto-select the first available subcategory
      if (!currentSubnameIsValid) {
        setSubname(uniqueSubnames[0]);
      }
    }
  }, [category, products, newAndFeatures, subname, setSubname]); // Runs when category changes or items load

  // 4. Filter products matching the current active subcategory
  const finalFilterProducts = filterProducts.filter(
    (product) => normalize(product.subname) === normalize(subname),
  );

  const [api, setApi] = useState(null);
  const [progress, setProgress] = useState(0);

  const onSelect = useCallback((apiInstance) => {
    if (!apiInstance) return;
    const selectedIndex = apiInstance.selectedScrollSnap();
    const totalSlides = apiInstance.scrollSnapList().length;
    if (totalSlides > 0) {
      const progressValue = ((selectedIndex + 1) / totalSlides) * 100;
      setProgress(Math.round(progressValue));
    }
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

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
    <section className="w-full bg-stone-100 p-1 md:p-5 lg:p-5">
      <div className="flex flex-col mb-2 items-center">
        <div className="flex justify-center items-center gap-3">
          {/* Render unique subname filter buttons */}
          {uniqueSubnames.map((name, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded border text-sm transition ${
                normalize(subname) === normalize(name)
                  ? "hover:border-b-black-50"
                  : ""
              }`}
              onClick={() => setSubname(name)}
            >
              {name}
            </button>
          ))}
        </div>
        
      </div>
      <div className=" flex justify-end mt-3">
          {!isNewAndFeatures && finalFilterProducts.length > 0 && (
            <button className="border rounded-xl px-3 py-2  " onClick={handleViewAll}>View All</button>
          )}
        </div>

      {finalFilterProducts.length === 0 && (
        <div className="w-full text-center py-16 px-4 bg-gray-50 rounded-2xl border border-gray-100 my-6">
          <div className="text-3xl mb-4 opacity-80">✨</div>
          <h3 className="text-gray-900 font-semibold text-lg tracking-tight">
            Temporarily Sold Out
          </h3>
          <p className="text-gray-500 text-sm mt-1.5 max-w-sm mx-auto leading-relaxed">
            These items flew off our shelves. Let us notify you the exact moment
            they return.
          </p>
        </div>
      )}

      <Carousel
        className="w-full mb-5"
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
        }}
      >
        <CarouselContent className="flex w-full">
          {finalFilterProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 pl-1 md:basis-1/3 lg:basis-1/4 p-2"
            >
              <Card className="h-105 w-full">
                <CardContent
                  onClick={() => {
                    setSelectedProduct(product);
                    router.push(`/products/${product.id}`);
                  }}
                  className="flex flex-col p-4 h-full"
                >
                  <h3 className="text-base font-semibold text-gray-800 line-clamp-2 leading-tight min-h-[2.5rem]">
                    {product.title}
                  </h3>

                  <div className="flex-1 flex items-center justify-center py-3">
                    <Image
                      src={product.image || "/placeholder.png"}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="object-contain w-auto h-full max-h-50 hover:scale-105 transform transition duration-500"
                    />
                  </div>

                  <p className="text-lg font-bold text-blue-600 mt-auto pt-2 border-t border-gray-100">
                    $
                    {Number(
                      String(product.price).replace(/[^0-9.-]/g, ""),
                    )?.toFixed(2) || "0.00"}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {finalFilterProducts.length > 4 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-150 h-0.5 bg-stone-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <CarouselPrevious className="static translate-x-0 translate-y-0 bg-white shadow-md hover:bg-gray-100 rounded-full" />
            <CarouselNext className="static translate-x-0 translate-y-0 bg-white shadow-md hover:bg-gray-100 rounded-full" />
          </div>
        )}
      </Carousel>
    </section>
  );
};

export default LatestProductSection;
