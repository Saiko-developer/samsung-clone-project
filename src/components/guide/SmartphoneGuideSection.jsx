"use client";

import { useState } from "react";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchSmartphone, SmartphoneApiUrl } from "@/data/guide/smartphone";

const SmartphoneGuideSection = () => {
  const { data: slides, isLoading, error } = useSWR(
    SmartphoneApiUrl,
    fetchSmartphone
  );

  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 py-10 text-lg">
        Loading....
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-10 text-lg">
        Failed to load products. Make sure the API server is running.
      </p>
    );
  }

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === (slides?.length - 1 || 0);

  const phones = [
    {
      id: 1,
      title: "Galaxy S26 Ultra",
      subtitle: "The ultimate AI powerhouse",
      price: "$1,499.00",
      image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=600",
      badge: "New",
    },
    {
      id: 2,
      title: "Galaxy S26+",
      subtitle: "Pro-grade camera, iconic design",
      price: "$1,199.00",
      image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=600",
      badge: "Best Seller",
    },
    {
      id: 3,
      title: "Galaxy Z Fold7",
      subtitle: "Foldable innovation, reimagined",
      price: "$1,899.00",
      image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=600",
      badge: "Foldable",
    },
    {
      id: 4,
      title: "Galaxy Z Flip7",
      subtitle: "Compact, stylish, fully loaded",
      price: "$1,099.00",
      image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=600",
      badge: "Trending",
    },
  ];

  return (
    <main>
      {/* HERO SWIPER */}
      <section className="relative">
        <Swiper
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative w-full h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="relative z-10 flex items-center justify-center h-full px-6">
                  <div className="text-center max-w-3xl">
                    <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-xl mx-auto">
                      {slide.description}
                    </p>
                    <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition text-sm">
                      {slide.buttonText || "Learn more"}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* NAV BUTTONS */}
        {!isFirst && (
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className="absolute left-6 top-1/2 z-10 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/40 transition-all duration-300"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
        )}
        {!isLast && (
          <button
            onClick={() => swiperInstance?.slideNext()}
            className="absolute right-6 top-1/2 z-10 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/40 transition-all duration-300"
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        )}
      </section>

      {/* PRODUCT CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Find Your Galaxy
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore our latest smartphones designed to elevate every moment
            with cutting-edge AI and camera innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {phones.map((phone) => (
            <div
              key={phone.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={phone.image}
                  alt={phone.title}
                  className="w-full h-56 object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {phone.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {phone.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{phone.subtitle}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">
                    {phone.price}
                  </span>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SmartphoneGuideSection;