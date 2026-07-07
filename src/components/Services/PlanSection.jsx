"use client";

import { ChevronRight } from "lucide-react";

const plans = [
  {
    bank: "CIMB Bank",
    logo: "https://au2-images.shop.samsung.com/medias/cimb-icon.png?context=bWFzdGVyfHJvb3R8MTU5ODF8aW1hZ2UvcG5nfGFETTNMMmhsWlM4Mk5EQTVPVEE1TVRBNE56TTVNQzlqYVcxaVgybGpiMjR1Y0c1bnwzNjEwMmNhYjkzMDJkZmNjNjBkZTVhNDNmNDE4YTFhMTNhYzBhZWI4MmUzMTg5MmJiOTIwNDUwM2U2NmZhYjQ5",
    image: "https://images.samsung.com/is/image/samsung/assets/sg/offer/20260226/visa-card-1.png?$ORIGIN_PNG$",
    label: "CIMB",
    plans: ["3 months – 0% Interest", "6 months – 0% Interest", "12 months – 0% Interest"],
  },
  {
    bank: "Maybank",
    logo: "https://au2-images.shop.samsung.com/medias/maybank-icon.png?context=bWFzdGVyfHJvb3R8MTU5ODF8aW1hZ2UvcG5nfGFETTNMMmhsWlM4Mk5EQTVPVEE1TVRBNE56TTVNQzlqYVcxaVgybGpiMjR1Y0c1bnwzNjEwMmNhYjkzMDJkZmNjNjBkZTVhNDNmNDE4YTFhMTNhYzBhZWI4MmUzMTg5MmJiOTIwNDUwM2U2NmZhYjQ5",
    image: "https://images.samsung.com/is/image/samsung/assets/sg/offer/20260226/visa-card-2.png?$ORIGIN_PNG$",
    label: "Maybank",
    plans: ["3 months – 0% Interest", "6 months – 0% Interest", "12 months – 0% Interest"],
  },
  {
    bank: "UOB Bank",
    logo: "https://au2-images.shop.samsung.com/medias/uob-icon.png?context=bWFzdGVyfHJvb3R8MTU5ODF8aW1hZ2UvcG5nfGFETTNMMmhsWlM4Mk5EQTVPVEE1TVRBNE56TTVNQzlqYVcxaVgybGpiMjR1Y0c1bnwzNjEwMmNhYjkzMDJkZmNjNjBkZTVhNDNmNDE4YTFhMTNhYzBhZWI4MmUzMTg5MmJiOTIwNDUwM2U2NmZhYjQ5",
    image: "https://images.samsung.com/is/image/samsung/assets/sg/offer/20260226/visa-card-3.png?$ORIGIN_PNG$",
    label: "UOB",
    plans: ["3 months – 0% Interest", "6 months – 0% Interest", "12 months – 0% Interest"],
  },
  {
    bank: "OCBC Bank",
    logo: "https://au2-images.shop.samsung.com/medias/ocbc-icon.png?context=bWFzdGVyfHJvb3R8MTU5ODF8aW1hZ2UvcG5nfGFETTNMMmhsWlM4Mk5EQTVPVEE1TVRBNE56TTVNQzlqYVcxaVgybGpiMjR1Y0c1bnwzNjEwMmNhYjkzMDJkZmNjNjBkZTVhNDNmNDE4YTFhMTNhYzBhZWI4MmUzMTg5MmJiOTIwNDUwM2U2NmZhYjQ5",
    image: "https://images.samsung.com/is/image/samsung/assets/sg/offer/20260226/visa-card-4.png?$ORIGIN_PNG$",
    label: "OCBC",
    plans: ["3 months – 0% Interest", "6 months – 0% Interest", "12 months – 0% Interest"],
  },
];

const PlanSection = () => {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            0% Instalment Plans
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Enjoy interest-free monthly instalments with your preferred bank.
          </p>
        </div>
        <button className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">
          See details
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Bank Logo */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img
                  src={plan.logo}
                  alt={plan.bank}
                  className="w-8 h-8 object-contain"
                />
                <span className="font-semibold text-gray-900 text-sm">
                  {plan.bank}
                </span>
              </div>
            </div>

            {/* Card Image */}
            <div className="p-4 flex justify-center bg-gray-50">
              <img
                src={plan.image}
                alt={`${plan.label} card`}
                className="w-full max-w-[200px] h-auto object-contain"
              />
            </div>

            {/* Plan Details */}
            <div className="p-4 space-y-2">
              {plan.plans.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlanSection;