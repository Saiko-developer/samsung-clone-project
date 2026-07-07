"use client"
import { fetchMonitor, MonitorApiUrl } from "@/data/guide/monitor";
import React from "react";
import useSWR from "swr";
const MonitorGuideSection = () => {
  const {data:monitors,isLoading,error} = useSWR(MonitorApiUrl,fetchMonitor)
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
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative h-[80vh] bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600"
          alt="Samsung Monitor"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Samsung Monitors
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Beyond the Screen.
            <br />
            Beyond Imagination.
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl">
            From ultra-wide gaming to 5K professional displays — find the
            monitor that powers your world.
          </p>
          <button className="self-start bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
            Learn more
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Explore Monitors
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Discover the perfect display for work, play, and everything in
            between.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {monitors?.map((monitor) => (
            <div
              key={monitor.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={monitor.image}
                  alt={monitor.title}
                  className="w-full h-56 object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {monitor.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {monitor.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{monitor.subtitle}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">
                    {monitor.price}
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

export default MonitorGuideSection;