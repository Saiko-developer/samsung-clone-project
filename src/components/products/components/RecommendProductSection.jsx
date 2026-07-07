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
import { fetchProduct, productApiUrl, useProducts } from "@/data/latest/products";
import Image from "next/image";
import { useRouter } from "next/navigation";


const RecommendedProductSection = () => {
  const {
    data:products,isLoading,error
  } = useSWR(productApiUrl, fetchProduct);
    const router = useRouter();
    const setSelectedProduct = useProducts((state) => state.setSelectedProduct);
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
    <main className="flex flex-col">
      <div className="p-3 md:p-5">
          <h1 className="text-2xl md:text-4xl font-mono font-bold">
            Recommended For You
          </h1>
        </div>
      <section className="w-full bg-stone-100 dark:bg-gray-900 p-3 md:p-5">
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
          {products?.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 pl-1 md:basis-1/3 lg:basis-1/4 p-2"
            >
              <Card className="h-105 w-full">
                <CardContent onClick={() => { setSelectedProduct(product); router.push(`/products/${product.id}`); }}  className="flex flex-col p-4 h-full">
                  {/* Title */}
                  <h3 className="text-base font-semibold text-gray-800 line-clamp-2 leading-tight min-h-[2.5rem]">
                    {product.title}
                  </h3>

                  {/* Image */}
                  <div className="flex-1 flex items-center justify-center py-3">
                    <Image
                      src={product.image || "/placeholder.png"}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="object-contain w-auto h-full max-h-50 hover:scale-105 transform transition duration-500"
                    />
                  </div>

                  {/* Price */}
                  <p className="text-lg font-bold text-blue-600 mt-auto pt-2 border-t border-gray-100">
                    ${Number(product.price)?.toFixed(2) || "0.00"}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {products?.length > 4 && (
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
    </main>
    
  );
};

export default RecommendedProductSection;