import Footer from "@/components/layout/pages/Footer";
import Navbar from "@/components/layout/pages/Navbar";
import StudentSection from "@/components/store/StudentSection";
import React from "react";

export default function Page() {
  return (
    <div>
      <Navbar />
      <StudentSection />
      <Footer />
    </div>
  );
}
