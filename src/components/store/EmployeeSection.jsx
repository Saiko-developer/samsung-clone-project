"use client";
import React from "react";

const EmployeeSection = () => {
  return (
    <main>
      <section className="relative h-[50vh]  overflow-hidden mb-5">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/sg/offer/corporate-epp/b2b_global0003_corporate-epp_hd01_pc_1440x640.png?imwidth=1366"
          alt="Samsung Monitor"
          className="absolute inset-0 lg:w-full lg:h-full object-cover mb-10 "
        />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl">
          <h1 className="text-4xl md:text-4xl font-bold text-black mb-4 leading-tight">
            Save more with Samsung Enhanced Partnership Programme
          </h1>
          <p>
            Enjoy exclusive offers and special deals when you register for
            Samsung Enhanced Partnership Programme
          </p>
          <button className="self-start bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
            Sign Up
          </button>
        </div>
      </section>

      <section className="relative h-[50vh]  overflow-hidden mb-5">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/sg/students-offers/banner/b2b_global0001_government-epp_ft03_pc_1440x344_8.jpg?$1440_N_JPG$"
          alt="Samsung Monitor"
          className="absolute inset-0 lg:w-full lg:h-full object-cover "
        />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl">
          <h1 className="text-4xl md:text-4xl font-bold text-black mb-4 leading-tight">
            Enjoy $20 off your first purchase.
          </h1>
          <p>Exclusive offer only for new corporate customers. T&Cs apply.</p>
          <button className="self-start bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
            Sign Up
          </button>
        </div>
      </section>
      <section className="relative h-[50vh] overflow-hidden mb-5">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/sg/offer/corporate-epp/b2b_global0003_corporate-epp_ft16-card1_pc_1440x440.png?$1440_N_PNG$"
          alt="Samsung Monitor"
          className="absolute inset-0 lg:w-full lg:h-full object-cover"
        />

        <div className="absolute inset-0 z-10 flex items-center justify-end px-8 md:px-16">
          <div className="flex flex-col max-w-md md:max-w-xl">
            <h1 className="text-4xl md:text-4xl font-bold text-black mb-4 leading-tight">
              Membership made easy
            </h1>
            <p>
              All you need to do is sign up to save — no discount code require
            </p>

            <button className="self-start bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmployeeSection;
