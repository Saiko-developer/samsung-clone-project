import React from "react";
import SuggestionItem from "./SuggestionItem";
import Link from "next/link";
const SuggestionSection = () => {
return (
    <section className="flex flex-col items-center justify-center gap-5">
      <SuggestionItem/>
      <Link href={"/"}>
      <button className=" p-3  m-auto  border rounded-2xl">
        Continue Shopping
      </button></Link>
    </section>
  );
};

export default SuggestionSection;
