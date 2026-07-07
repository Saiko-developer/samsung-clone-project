"use client";

import { Truck, MapPin, Clock, Package, ShieldCheck, RefreshCw } from "lucide-react";

const deliveryInfo = [
  {
    icon: Truck,
    title: "Standard Delivery",
    description: "Free standard delivery on all orders above S$100. Estimated delivery within 3–5 working days.",
    highlight: "Free for orders > S$100",
  },
  {
    icon: Clock,
    title: "Express Delivery",
    description: "Need it faster? Express delivery within 1–2 working days for a flat fee of S$15.",
    highlight: "1–2 working days",
  },
  {
    icon: MapPin,
    title: "Delivery Coverage",
    description: "We deliver to all addresses across Singapore, including mainland and selected offshore islands.",
    highlight: "Nationwide coverage",
  },
  {
    icon: Package,
    title: "Installation Services",
    description: "Professional installation available for TVs, washers, refrigerators, and other large appliances.",
    highlight: "Professional setup",
  },
  {
    icon: ShieldCheck,
    title: "Delivery Protection",
    description: "All shipments are fully insured against damage during transit. We'll replace any damaged items at no cost.",
    highlight: "Fully insured",
  },
  {
    icon: RefreshCw,
    title: "Flexible Rescheduling",
    description: "Change your delivery date or time slot up to 24 hours before the scheduled window at no charge.",
    highlight: "Free rescheduling",
  },
];

const feeTable = [
  { orderValue: "Below S$50", deliveryFee: "S$10", installationFee: "S$20" },
  { orderValue: "S$50 – S$99.99", deliveryFee: "S$5", installationFee: "S$15" },
  { orderValue: "S$100 & above", deliveryFee: "Free", installationFee: "S$10" },
  { orderValue: "Large Appliances*", deliveryFee: "Free", installationFee: "Free" },
];

const DeliverySection = () => {
  return (
    <main className="font-sans">
      {/* Hero Banner */}
      <section className="relative h-[50vh] md:h-[60vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.samsung.com/is/image/samsung/assets/sg/shop-faq/delivery-and-installations/1440x640_delivery.jpg?$1440_N_JPG$')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 max-w-4xl">
          <span className="text-blue-300 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Delivery & Installation
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Fast, Reliable Delivery
            <br />
            <span className="text-blue-300">Right to Your Doorstep.</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-6 max-w-2xl">
            Enjoy free delivery on qualifying orders, professional installation for large appliances,
            and full protection from checkout to setup.
          </p>
        </div>
      </section>

      {/* Delivery Services Grid */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Delivery Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We make sure your order arrives safely and on time. Choose the option that works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveryInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                  {item.description}
                </p>
                <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {item.highlight}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fee Table */}
      <section className="bg-gray-50 py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Delivery & Installation Fees
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Transparent pricing with no hidden charges. Installation fees apply for large appliances only.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-6 py-4 text-sm font-semibold">Order Value</th>
                  <th className="px-6 py-4 text-sm font-semibold">Delivery Fee</th>
                  <th className="px-6 py-4 text-sm font-semibold">Installation Fee</th>
                </tr>
              </thead>
              <tbody>
                {feeTable.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${
                      index === feeTable.length - 1 ? "border-b-0" : ""
                    } hover:bg-blue-50/50 transition-colors`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {row.orderValue}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {row.deliveryFee === "Free" ? (
                        <span className="text-green-600 font-semibold">Free</span>
                      ) : (
                        row.deliveryFee
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {row.installationFee === "Free" ? (
                        <span className="text-green-600 font-semibold">Free</span>
                      ) : (
                        row.installationFee
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-400 mt-4 text-center">
            * Large Appliances include refrigerators, washing machines, dryers, and air conditioners above 12,000 BTU.
          </p>
        </div>
      </section>

      {/* Coverage & Notes */}
      <section className="py-16 px-6 md:px-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Delivery Coverage
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                Mainland Singapore — all residential and commercial addresses
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                Sentosa, Jurong Island, and selected offshore islands
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                No delivery to P.O. Boxes or restricted military zones
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                Same-day delivery available for selected items in central areas
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Important Notes
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                Delivery time slots: 9am–12pm, 12pm–3pm, 3pm–6pm, 6pm–9pm
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                A valid phone number is required for delivery coordination
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                Signature required upon delivery for orders above S$500
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                Old appliance removal available at S$30 per item
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DeliverySection;