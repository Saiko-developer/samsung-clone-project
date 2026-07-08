import {  fetchGuide, GuideApiUrl } from "@/data/guide";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const GuideSection = () => {
  const { data: guide, isLoading, error } = useSWR(GuideApiUrl, fetchGuide);
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
    <section className="flex flex-col p-1 ">
      <div className="mb-3">
        <h1 className="text-4xl font-mono font-bold">Buying guide</h1>
      </div>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="flex items-center">
          {guide?.map((guide) => (
            <CarouselItem
              key={guide.id}
              className="p-2 sm:p-3 md:p-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="bg-stone-200 rounded-3xl overflow-hidden">
                <div>
                  <div className=" md:p-6 text-center">
                    <h5 className="md:h-15 mb-5 text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-heading">
                      {guide.title}
                    </h5>

                    {/* 1. Wrapper with 'peer' class for hover targeting */}
                    <div className="peer inline-block">
                      <a
                        href={guide.buttonUrl}
                        className="inline-flex items-center text-black rounded-3xl bg-white box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none"
                      >
                        {guide.buttonText}
                      </a>
                    </div>

                    {/* 2. Image container with 'peer-hover:scale-105' on the sibling wrapper */}
                    <div className="mt-3 sm:mt-4 overflow-hidden rounded-b-3xl peer-hover:scale-105 transition duration-500">
                      <Image
                        src={guide.image.src}
                        alt={guide.image.alt}
                        width={200}
                        height={200}
                        className="object-contain w-full h-full max-h-40 sm:max-h-48"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
      </Carousel>
    </section>
  );
};

export default GuideSection;
