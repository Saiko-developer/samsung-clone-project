import Footer from "@/components/layout/pages/Footer";
import Navbar from "@/components/layout/pages/Navbar";
import CareSection from "@/components/Services/CareSection";

import React from "react";

export default function Page() {
  return (
    <div>
      <Navbar />
      <CareSection />
      <Footer/>
    </div>
  );
}
