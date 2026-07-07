"use client";

import LatestCategoriesSection from "../components/LatestCategoriesSection";
import LatestProductSection from "../components/LatestProductSection";
import OurServiceSection from "../components/OurServiceSection";
import LatestOfferProductSection from "../components/LatestOfferProductSection";
import LatestOfferCategoriesSection from "../components/LatestOfferCategoriesSection";
import RecommendProductSection from "../components/RecommendProductSection";
import GuideSection from "../components/GuideSection";
import StoresSection from "../components/StoresSection";
import HeroTerms from "@/components/Terms/HeroTerms";

const Hero = () => {
  return (
    <>
      <LatestCategoriesSection />
      <LatestProductSection />
      <OurServiceSection />
      <LatestOfferCategoriesSection />
      <LatestOfferProductSection />
      <RecommendProductSection />
      <GuideSection />
      <StoresSection />
      <HeroTerms/>
    </>
  );
};

export default Hero;
