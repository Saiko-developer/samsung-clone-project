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
    <main>
      <section className="relative h-[80vh] overflow-hidden mb-5">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/sg/business/industries/government/government_kv_pc_1440x640.jpg?imwidth=1366"
          alt="Samsung Monitor"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 z-10 flex items-center justify-end px-8 md:px-16">
          <div className="flex flex-col max-w-md md:max-w-xl text-white">
            <h1 className="text-4xl md:text-4xl font-bold  mb-4 leading-tight">
              Protect mission-critical operations
            </h1>
            <p>
              Ensure your staff is equipped to perform at their best, whether
              working from home or on-site
            </p>

            <button className="self-start bg-white text-black px-7 py-3 rounded-full font-medium hover:bg-gray-200 transition mt-5">
              Contact Us
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center mb-10 ">
        <div className="grid grid-cols-3 mb-5">
          {data?.map((data) => (
            <div
              key={data.id}
              className="flex flex-col items-center text-center p-4 border border-gray-100 rounded-lg"
            >
              {/* Icon */}
              <img
                src={data.icon_url}
                alt={data.section_title}
                className=" h-15 md:h-20 lg:h-30 mb-6 object-contain"
              />

              {/* Title */}
              <h2 className="text-xl font-bold mb-4 min-h-14 flex justify-center text-start">
                {data.section_title}
              </h2>

              {/* Steps (Written inline) */}
              <div className="space-y-3 text-sm text-gray-600 mb-4 grow">
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
      <section className="flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col gap-5 text-center">
          <h1 className=" text-4xl font-bold">Watch with a close eye</h1>
          <p>
            Keep critical command units connected with solutions that keep the
            public safe.
          </p>
        </div>
      </section>
      <section className="flex items-center lg:items-start justify-center gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10  gap-2 p-5">
          <img
            src="../Government1.jpg"
            alt="Samsung Monitor"
            className="  object-cover w-200 rounded-2xl"
          />

          <div className="flex lg:items-start">
            <div className="flex flex-col l gap-2">
              <p>Samsung display solutions</p>
              <h1 className="text-4xl md:text-4xl font-bold text-black  leading-tight">
                Deep black reveals more details
              </h1>
              <p>
                The Wall ensures you can monitor public spaces with greater detail
              for better protection.
              </p>
              <button className="self-start bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center gap-5">
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:gap-10  gap-2 p-5">
          <img
            src="../Government.jpg"
            alt="Samsung Monitor"
            className="object-cover w-200  rounded-2xl"
          />

          <div className="flex items-start">
            <div className="flex flex-col l gap-2">
              <p>Samsung display solutions</p>
              <h1 className="text-4xl md:text-4xl font-bold text-black  leading-tight">
                Control room enhances security
              </h1>
              <p>
                Multiple display types improve communication in a
                mission-critical defense setting.
              </p>
              <button className="self-start bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GovernmentSection;
