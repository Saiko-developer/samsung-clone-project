"use client";
import { fetchGovernment, GovernmentApiUrl } from "@/data/store/government";
import React from "react";
import useSWR from "swr";

const GovernmentSection = () => {
  const { data, isLoading, error } = useSWR(GovernmentApiUrl, fetchGovernment);
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
    <main className="flex flex-col gap-6 md:gap-10">
      <section className="relative h-[40vh] md:h-[50vh] lg:h-[50vh] xl:h-[80vh] overflow-hidden">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/sg/business/industries/government/government_kv_pc_1440x640.jpg?imwidth=1366"
          alt="Samsung Government Solutions"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center sm:justify-center md:justify-center lg:justify-end h-full px-6 sm:px-8 md:px-16 pb-8 sm:pb-12 md:pb-16">
          <div className="flex flex-col items-center sm:items-center md:items-center lg:items-start max-w-2xl text-white gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-center sm:text-center md:text-center lg:text-left">
              Protect mission-critical operations
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-center sm:text-center md:text-center lg:text-left">
              Ensure your staff is equipped to perform at their best, whether
              working from home or on-site
            </p>
            <button className="self-center sm:self-center md:self-center lg:self-start bg-white text-black px-7 py-3 rounded-full font-medium hover:bg-gray-200 transition mt-4">
              Contact Us
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center mb-10 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-5 gap-4 md:gap-6 w-full max-w-7xl">
          {data?.map((data) => (
            <div
              key={data.id}
              className="flex flex-col items-center text-center p-4 md:p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <img
                src={data.icon_url}
                alt={data.section_title}
                className="h-16 md:h-20 mb-4 object-contain"
              />

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-bold mb-3 min-h-14 flex items-center justify-center">
                {data.section_title}
              </h2>

              {/* Steps (Written inline) */}
              <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
                {data.steps.map((step, idx) => (
                  <p key={idx}>{step}</p>
                ))}
              </div>

              {/* Additional Notes (Written inline with shortcut evaluation) */}
              {data.additional_notes?.map((note, idx) => (
                <p
                  key={idx}
                  className="mt-2 text-xs text-gray-500 text-left w-full"
                >
                  * {note}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-5 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-4 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Watch with a close eye</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Keep critical command units connected with solutions that keep the
            public safe.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10 w-full max-w-7xl items-center">
          <img
            src="../Government1.jpg"
            alt="Samsung Government Display"
            className="object-cover w-full h-[40vh] sm:h-[50vh] md:h-[60vh] rounded-2xl"
          />

          <div className="flex flex-col gap-4">
            <p className="text-sm sm:text-base text-gray-600 font-medium">Samsung display solutions</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
              Deep black reveals more details
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              The Wall ensures you can monitor public spaces with greater detail
              for better protection.
            </p>
            <button className="self-start bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">
              Learn more
            </button>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 sm:px-6 md:px-8 mb-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10 w-full max-w-7xl items-center">
          <img
            src="../Government.jpg"
            alt="Samsung Control Room"
            className="object-cover w-full h-[40vh] sm:h-[50vh] md:h-[60vh] rounded-2xl"
          />

          <div className="flex flex-col gap-4">
            <p className="text-sm sm:text-base text-gray-600 font-medium">Samsung display solutions</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
              Control room enhances security
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Multiple display types improve communication in a
              mission-critical defense setting.
            </p>
            <button className="self-start bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">
              Learn more
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GovernmentSection;
