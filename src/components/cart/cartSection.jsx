"use client";
import useVoucherStore from "@/data/cart";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import SuggestionSection from "./SuggestionSection";
import VoucherItems from "./VoucherItems";
import VoucherSummarySection from "./VoucherSummarySection";
import PaymentSection from "./PaymentSection";
import Link from "next/link";

const CartSection = () => {
  const { items } = useVoucherStore();

  return (
    <div className="flex flex-col  ">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center mb-20 text-center">
            <ShoppingCart size={40} className="mb-4" />
            <h1 className="text-3xl font-bold font-mono mb-4">
              Your Cart is Empty
            </h1>
            <p className="mb-4">
              Sign in to your Samsung account to view your saved items or
              continue shopping
            </p>
            <div className="flex gap-2 ">
              <Link href={"/"}>
              <Button variant="outline" className="border border-black text-black">
                Continue Shopping
              </Button></Link>
              <Button className="bg-blue-400">Sign In</Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="px-3 md:px-10">
            <h1 className="px-0 md:px-10 text-sm md:text-base">
              You have {items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
              item
              {items.reduce((sum, item) => sum + item.quantity, 0) !== 1
                ? "s"
                : ""}{" "}
              in your cart
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-8 p-3 md:p-10 gap-4 md:gap-2 mx-0 md:mx-10">
            <div className="col-span-1 lg:col-span-5">
              {items.map((item, index) => (
                <VoucherItems key={index} item={item} />
              ))}
            </div>
            <div className="col-span-1 lg:col-span-3">
              <VoucherSummarySection />
            </div>
          </div>
        </>
      )}
      <div>
        <h1 className="text-3xl text-center font-bold font-mono mb-4">
          You may also like this
        </h1>
      </div>
      <SuggestionSection />
      <PaymentSection/>
    </div>
  );
};

export default CartSection;
