import { fetchPayment, PaymentApiUrl } from "@/data/payment";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

const PaymentSection = () => {
  const { data, isLoading, error } = useSWR(PaymentApiUrl, fetchPayment);
  if (isLoading) {
    return (
      <p className="text-center text-gray-500 py-10 text-lg">Loading....</p>
    );
  }
  if (error) {
    return (
      <p className="text-center text-red-500 py-10 text-lg">
        Failed to load categories. Make sure the API server is running.
      </p>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center px-3 md:px-0">
      <div className="font-bold text-xl md:text-2xl mt-5 text-center">
        <h1>Supported payment types</h1>
      </div>
      <div className="flex items-center justify-center gap-3 md:gap-5 m-3 md:m-5 flex-wrap">
        {data?.map((data) => (
          <Image
            key={data.id}
            src={data.image}
            alt={data.title}
            width={55}
            height={55}
            className="w-10 md:w-[55px] h-10 md:h-[55px] object-contain"
          />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center font-mono text-[10px] md:text-xs gap-3 md:gap-5 px-4 md:px-0 max-w-2xl">
        <p className="text-center">
          Payment types will differ based on financing options selected. Atome,
          GrabPay, PayNow and Samsung Pay payment types are not available for
          trade-in transactions. Check out our FAQ for more information.
        </p>
        <p className="text-center">
          For sales or online store enquiries, call 1800-7267864. Operating
          hours from 9AM to 6PM (Mon - Fri). Or chat with us here.
        </p>
      </div>
    </section>
  );
};

export default PaymentSection;
