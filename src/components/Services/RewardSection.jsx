"use client";
import { fetchReward, RewardApiUrl } from "@/data/services/reward";
import { main } from "flowbite-react/cli/main";
import useSWR from "swr";

const RewardSection = () => {
  const { data: rewards, isLoading, error } = useSWR(RewardApiUrl, fetchReward);
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
      <section className="flex flex-col items-center justify-center mb-10 ">
        <div className="mb-5 pb-2 text-center">
          <h1 className="font-bold text-4xl font-mono pb-2">
            Getting started is easy
          </h1>
          <p>Get rewarded in a few simple steps.</p>
        </div>
        <div className="grid grid-cols-4 mb-5">
          {rewards?.map((reward) => (
            <div
              key={reward.id}
              className="flex flex-col items-center text-center p-4 border border-gray-100 rounded-lg"
            >
              {/* Icon */}
              <img
                src={reward.icon_url}
                sizes="30"
                alt={reward.section_title}
                className=" h-30 mb-6 object-contain"
              />

              {/* Title */}
              <h2 className="text-xl font-bold mb-4 min-h-[56px] flex justify-center text-start">
                {reward.section_title}
              </h2>

              {/* Steps (Written inline) */}
              <div className="space-y-3 text-sm text-gray-600 mb-4 flex-grow">
                {reward.steps.map((step, idx) => (
                  <p key={idx}>{step}</p>
                ))}
              </div>

              {/* Additional Notes (Written inline with shortcut evaluation) */}
              {reward.additional_notes?.map((note, idx) => (
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
        <div className="text-center text-xs">
          <p>
            (Customers who set up Samsung Account after 5 July 2023, would have
            been automatically enrolled onto Samsung Rewards.)
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center bg-gray-300/30  pb-5">
        <div className=" font-bold font-mono text-4xl my-5">
          <h1>Reward Tiers and Points at a Glance</h1>
        </div>
        <div className="flex items-center justify-center gap-3 bg-white rounded-xl">
          <div className="border border-blue-500 rounded-xl px-5 py-3 w-80">
            <div className="py-2 text-2xl text-blue-900 font-bold">
              <h1>Blue</h1>
            </div>
            <div className="flex justify-between items-end font-bold">
              <p>
                Total purchase <br /> Starting Tier
              </p>
              <p className="text-3xl text-blue-800">1%</p>
            </div>
          </div>
          <div className="border border-yellow-500 rounded-xl px-5 py-3 w-80">
            <div className="py-2 text-2xl text-yellow-900 font-bold">
              <h1>Gold</h1>
            </div>
            <div className="flex justify-between items-end font-bold">
              <p>
                Total purchase <br /> $2,800.00
              </p>
              <p className="text-3xl text-yellow-800">3%</p>
            </div>
          </div>
          <div className="border border-stone-500 rounded-xl px-5 py-3 w-80">
            <div className="py-2 text-2xl text-stone-900 font-bold">
              <h1>Platium</h1>
            </div>
            <div className="flex justify-between items-end font-bold">
              <p>
                Total purchase <br /> $3,800.00
              </p>
              <p className="text-3xl text-stone-800">5%</p>
            </div>
          </div>
        </div>
      </section>
      <section className=" p-5">
        <div className=" w-300  py-20 mx-auto bg-gray-300/30 flex justify-center items-center flex-col rounded-xl ">
          <h1 className=" font-bold font-mono text-center text-4xl pb-5">
            Exclusive Offers for Rewards
            <br /> Members Only
          </h1>
          <div className=" mx-auto p-2 border rounded-2xl bg-black text-white">
            <button>Join Now</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RewardSection;
