"use client";
import React from "react";

const EmployeeSection = () => {
  return (
    <main className="w-full bg-white">
      {/* SECTION 1: Enhanced Partnership (Left-Aligned Text, Right-Aligned Office Image) */}
      <section className="relative w-full overflow-hidden mb-6 bg-[#f4f4f4]  md:h-[30vh] xl:h-[50vh] min-h-30 md:min-h-0 flex items-center">
        {/* Background Graphic Asset */}
        <img
          src="https://images.samsung.com/is/image/samsung/assets/sg/offer/corporate-epp/b2b_global0003_corporate-epp_hd01_pc_1440x640.png?imwidth=1366"
          alt="Samsung Enhanced Partnership Banner"
          className="absolute inset-0 w-full h-full object-cover object-right md:object-center"
        />
        {/* Mobile Safe Overlay Layer */}
        <div className="absolute inset-0 bg-white/40 md:bg-transparent" />
        
        <div className="relative z-10 w-full px-6 py-12 md:py-0 md:px-16 max-w-xl md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
            Save more with Samsung Enhanced Partnership Programme
          </h1>
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium max-w-lg mb-6">
            Enjoy exclusive offers and special deals when you register for Samsung Enhanced Partnership Programme.
          </p>
          <button className="bg-black text-white hover:bg-gray-900 text-xs sm:text-sm font-semibold px-6 py-3 md:px-8 md:py-3.5 rounded-full shadow-sm transition-all active:scale-98">
            Sign Up
          </button>
        </div>
      </section>

      {/* SECTION 2: $20 Off Promo (Left-Aligned Text, Right-Aligned Device Vector Background) */}
      <section className="relative w-full overflow-hidden mb-6 bg-[#e1f3ff] md:h-[30vh] xl:h-[50vh] min-h-30 md:min-h-0 flex items-center">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/sg/students-offers/banner/b2b_global0001_government-epp_ft03_pc_1440x344_8.jpg?$1440_N_JPG$"
          alt="Samsung Special Promo Banner"
          className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
        />
        <div className="absolute inset-0 bg-white/20 md:bg-transparent" />
        
        <div className="relative z-10 w-full px-6 py-12 md:py-0 md:px-16 max-w-xl md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
            Enjoy $20 off your first purchase.
          </h1>
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium mb-6">
            Exclusive offer only for new corporate customers. <span className="whitespace-nowrap">T&Cs apply.</span>
          </p>
          <button className="bg-black text-white hover:bg-gray-900 text-xs sm:text-sm font-semibold px-6 py-3 md:px-8 md:py-3.5 rounded-full shadow-sm transition-all active:scale-98">
            Sign Up
          </button>
        </div>
      </section>

      {/* SECTION 3: Membership Made Easy (Right-Aligned Text Layout on Desktop, Fluid Stack on Mobile) */}
      <section className="relative w-full overflow-hidden mb-6 bg-[#f7f7f7]  md:h-[30vh] xl:h-[50vh] min-h-30 md:min-h-0 flex items-center justify-end">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/sg/offer/corporate-epp/b2b_global0003_corporate-epp_ft16-card1_pc_1440x440.png?$1440_N_PNG$"
          alt="Membership Made Easy Banner"
          className="absolute inset-0 w-full h-full object-cover object-left md:object-center"
        />
        <div className="absolute inset-0 bg-white/50 md:bg-transparent" />
        
        <div className="relative z-10 w-full px-6 py-12  md:py-0 md:px-50 max-w-xl md:max-w-xl lg:max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
            Membership made easy
          </h1>
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium mb-6">
            All you need to do is sign up to save — no discount code required.
          </p>
          <button className="bg-black text-white hover:bg-gray-900 text-xs sm:text-sm font-semibold px-6 py-3 md:px-8 md:py-3.5 rounded-full shadow-sm transition-all active:scale-98">
            Shop Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default EmployeeSection;
