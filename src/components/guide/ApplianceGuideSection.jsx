"use client";
import {
  AppliancesGuideApiUrl,
  fetchAppliancesGuide,
} from "@/data/guide/appliance";
import useSWR from "swr";

const ApplianceGuideSection = () => {
  const {
    data: appliances,
    isLoading,
    error,
  } = useSWR(AppliancesGuideApiUrl, fetchAppliancesGuide);
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
      {/* Hero Banner */}
      <section className="relative h-[80vh] bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600"
          alt="Samsung Appliances"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Samsung Home Appliances
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Intelligence That
            <br />
            Cares for Your Home.
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl">
            From AI-powered washers to bespoke refrigerators — discover
            appliances that adapt to your life.
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
            Explore Appliances
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Upgrade your home with smart, energy-efficient appliances designed
            for modern living.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {appliances.map((appliance) => (
            <div
              key={appliance.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={appliance.image}
                  alt={appliance.title}
                  className="w-full h-56 object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {appliance.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {appliance.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {appliance.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">
                    {appliance.price}
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

export default ApplianceGuideSection;
