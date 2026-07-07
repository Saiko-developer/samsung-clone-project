"use client";
import { BusinessApiUrl, fetchBusiness } from "@/data/store/business";
import useSWR from "swr";

const BusinessSection = () => {
  const { data, isLoading, error } = useSWR(BusinessApiUrl, fetchBusiness);
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
    <main className="flex flex-col gap-6 md:gap-10 ">
      <div className="w-full text-center flex flex-col gap-3 md:gap-5">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl font-mono px-2">
          Enjoy more business savings with
          <br /> Samsung exclusive deals & offers
        </h1>
        <p className="text-sm sm:text-base md:text-lg px-2">
          Set up your business to enjoy Samsung Business offers solutions and
          services to streamline technology purchasing
        </p>
      </div>
      <section className="relative h-[25vh] sm:h-[60vh] md:h-[75vh] lg:h-[90vh] overflow-hidden  ">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/sg/s2602/business/offers/home_pc_galaxy_s26_ultra_header-kv_1440x640-offers.jpg?$ORIGIN_JPG$"
          alt="Samsung Monitor"
          className="absolute inset-0 lg:w-full lg:h-full object-cover"
        />
        <div className="relative z-10 top-15 md:top-2/3 lg:top-1/2 left-0 md:-right-1 flex flex-col md:flex-row h-full px-4 sm:px-6 md:px-16 max-w-3xl gap-2 md:gap-1">
          <button className="self-start text-white px-3 py-3 font-medium underline text-sm md:text-base">
            Learn more
          </button>
          <button className="self-start bg-white text-black px-5 py-2 rounded-3xl text-sm md:text-base hover:bg-gray-200 transition">
            Buy
          </button>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-5 p-5">
        <div className="text-2xl sm:text-3xl font-bold font-mono">
          <h1>How to sign up</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-5 gap-4 w-full">
          {data?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center p-4 border border-gray-100 rounded-lg"
            >
              <div className="flex flex-col gap-3 h-auto md:h-50">
                <p>{item.step}</p>
                <h2 className="text-xl sm:text-2xl font-bold">{item.title}</h2>
                <p>{item.description}</p>
                <button>{item.actionLabel}</button>
              </div>
              <img
                src={item.icon_url}
                alt={item.title}
                className="h-15 mb-6 object-contain"
              />
            </div>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
        <div className="relative h-[40vh] sm:h-[45vh] md:h-[55vh] overflow-hidden mb-0 md:mb-5 rounded-xl">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/074/287/014/small/a-modern-office-with-a-desk-computer-and-plants-free-photo.jpeg"
            alt="Samsung Monitor"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
          <div className="relative z-10 flex flex-col justify-end md:justify-start h-full px-4 sm:px-6 md:px-16 p-5">
            <div className="mb-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-stone">
                Employee purchase program
              </h1>
              <p className="text-white text-sm sm:text-base">
                Special price for Samsung partner employees
              </p>
            </div>
            <button className="self-start text-black font-medium border-b border-black text-sm md:text-base">
              Learn more
            </button>
          </div>
        </div>
        <div className="relative h-[40vh] sm:h-[45vh] md:h-[55vh] overflow-hidden mb-0 md:mb-5 rounded-xl">
          <img
            src="https://img.us.news.samsung.com/us/wp-content/uploads/2025/01/20181111/Samsung-TVs-and-Displays-Samsung-AI-Assistant-AI-Powered-Interactive-Display-at-Bett-2025_main1-664x384.jpg"
            alt="Samsung Monitor"
            className="absolute inset-0 w-full h-full object-cover "
          />
          <div className="relative z-10 flex flex-col justify-end md:justify-start h-full px-4 sm:px-6 md:px-16 p-5">
            <div className="mb-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-stone">
                Samsung for education program
              </h1>
              <p className="text-white text-sm sm:text-base">
                Special price for Samsung product to support digitalisation education
              </p>
            </div>
            <button className="self-start text-black font-medium border-b border-black text-sm md:text-base">
              Learn more
            </button>
          </div>
        </div>
      </section>
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[55vh] overflow-hidden mb-0 md:mb-5 rounded-xl ">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/uk/business/why-samsung-for-business/KV_WhyBuy_DT_1440x640_01.jpg?imwidth=1366"
          alt="Samsung Monitor"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 top-1/4 sm:top-1/3 md:top-1/3 left-0 md:-right-1 flex flex-col w-full sm:w-3/4 md:w-1/2 h-full px-4 sm:px-6 md:px-16 max-w-3xl gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono">
            Get the Samsung Business advantage
          </h1>
          <p className="text-sm sm:text-base">
            Get access to exclusive deals, volume pricing, free shipping on a wide range of business devices when you register for a Samsung Business Account.
          </p>
          <button className="self-start text-white font-medium bg-black px-4 py-2 rounded-2xl text-sm md:text-base">
            Register Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default BusinessSection;