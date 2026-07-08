import React, { useCallback, useState } from "react";
import useSWR from "swr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchStores, StoresApiUrl } from "@/data/stores";
import Image from "next/image";
import * as LucideIcons from "lucide-react"
const StoresSection = () => {
  const { data: stores, isLoading, error } = useSWR(StoresApiUrl, fetchStores);
  const [api, setApi] = useState(null);
  const [progress, setProgress] = useState(0);

const onSelect = useCallback((apiInstance) => {
  if (!apiInstance) return;

  const selected = apiInstance.selectedScrollSnap();
  const totalSnaps = apiInstance.scrollSnapList().length;
  
  if (totalSnaps <= 1) {
    setProgress(100);
    return;
  }
  
  const progressValue = (selected / (totalSnaps - 1)) * 100;
  setProgress(progressValue);
}, []);

  React.useEffect(() => {
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
    <section className="flex flex-col p-1 md:p-2 lg:p-2 ">
      <div className="">
          <h1 className="text-4xl font-mono font-bold">Special Stores</h1>
        </div>
      <div>
        <Carousel
        className="w-full mb-5"
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
        }}
      >
        <CarouselContent className="flex items-center">
          {stores?.map((store) => (
            <CarouselItem
              key={store.id}
              className="p-2 sm:p-3 md:p-4 basis-full sm:basis-1/2 md:basis-1/3"
            >
              <div className="group">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={store.image.src}
                    alt={store.image.alt}
                    width={500}
                    height={300}
                    className="
                      w-full
                      h-48 sm:h-56 md:h-64
                      object-cover
                      transition-all
                      duration-500
                      group-hover:scale-105
                      group-hover:-translate-y-2"
                  />
                </div>
                <div className="p-3 sm:p-4 md:p-6">
                  <a href="#">
                    <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">
                      {store.title}
                    </h5>
                  </a>
                  <a
                    href={store.buttonUrl}
                    className="  text-black bg-brand border-b border-black py-1  "
                  >
                    learn more
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
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
      </Carousel>
      </div>

      
    </section>
  );
};

export default StoresSection;
