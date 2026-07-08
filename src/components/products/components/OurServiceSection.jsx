
"use client"
import * as LucideIcons from "lucide-react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { fetchServices, serviceApi } from "@/data/services";
import Link from "next/link";
const OurServiceSection = () => {
  const {
    data: services,
    isLoading,
    error,
  } = useSWR(serviceApi, fetchServices);
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
    <main>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 md:p-5 gap-2 md:gap-0">
          <div className="flex justify-between gap-10">
            <h1 className="text-2xl md:text-4xl font-mono font-bold">
              Buy direct. Get more.
            </h1>
          </div>
        </div>
      <section>
      <Carousel
        className="w-full mb-5"
      >
        <CarouselContent className="flex md:flex lg:flex p-6">
          {services?.map((service,index) => (
            <CarouselItem
              key={service.id || index}
              className="basis-1/2 pl-1 md:basis-1/3 lg:basis-1/4 p-2"
            >
              <Card className=" w-full">
                <CardContent>
                  <div className=" flex flex-col h-65 bg-neutral-primary-soft  max-w-sm ">
                    <div>
                      <span className="bg-gray-100 p-2 sm:p-3 inline-flex rounded-sm my-2">
                        {(() => {
                        const IconComponent = LucideIcons[service.icon];
                        return IconComponent ? (
                          <IconComponent size={32} strokeWidth={1} className="text-blue-500 sm:w-10 sm:h-10" />
                        ) : null;
                      })()}
                      </span>
                    </div>
                    <div className="h-35">
                      <h5 className="my-2 text-xl sm:text-2xl font-semibold tracking-tight text-heading">
                      {service.title}
                    </h5>
                    <p className="mb-3 sm:mb-5 text-xs sm:text-sm md:text-base text-body line-clamp-2 sm:line-clamp-none">{service.description}</p>
                    </div>
                    <div className="flex gap-2 ">
                      <Link href={service.link || "#"} passHref className="font-bold flex items-center gap-1 text-sm sm:text-base">
                      Learn more
                      <LucideIcons.MoveUpRight size={14} className="sm:w-4 sm:h-4" />
                      </Link>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
    </main>
    
  );
};

export default OurServiceSection;
