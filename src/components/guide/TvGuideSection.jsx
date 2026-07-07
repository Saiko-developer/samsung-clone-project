"use client";

import { fetchTvGuide, TvApiUrl } from "@/data/guide/tv";
import useSWR from "swr";
import { useState } from "react";

const TvGuideSection = () => {
  const { data, isLoading, error } = useSWR(TvApiUrl, fetchTvGuide);
  const [zoomedItem, setZoomedItem] = useState(null);
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
      <section className="py-12 md:py-20">
        <video
          className="w-full h-full object-cover mb-10 px-4 md:px-8 rounded-lg"
          src="/TvGuide.mp4"
          autoPlay
          controls
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 px-4 md:px-8">
          {data?.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => setZoomedItem(item)}
            >
              <div className="relative w-20  md:w-70 md:h-122 overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <iframe
                  className="w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-300"
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setZoomedItem(item)}
                />
              </div>
            </div>
          ))}
        </div>

        {zoomedItem && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setZoomedItem(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 z-50"
              onClick={() => setZoomedItem(null)}
            >
              ×
            </button>
            <div className="md:w-full h-full flex items-center justify-center">
              <div className="w-full max-w-6xl h-[95vh]">
                <iframe
                  className="w-full h-full rounded-lg shadow-2xl"
                  src={zoomedItem.src}
                  autoPlay
                  controls
                  muted
                  loop
                  playsInline
                  allowFullScreen
                  style={{ minHeight: "700px" }}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default TvGuideSection;