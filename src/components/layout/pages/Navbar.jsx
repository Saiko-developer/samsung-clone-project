"use client";

import { useState } from "react";
import { CategoryApiUrl, fetchCategory } from "@/data/latest/categories";
import useSWR from "swr";
import NavbarSection from "../components/NavbarSection";
import { ShoppingCart, UserKey, Menu, X, Search } from "lucide-react";
import Link from "next/link";
import useVoucherStore from "@/data/cart";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/SearchContext";

const Navbar = () => {
  const { items } = useVoucherStore();
  const {
    data: categories,
    isLoading,
    error,
  } = useSWR(CategoryApiUrl, fetchCategory);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { open: openSearch } = useSearch();
  const handleShopClick = (e) => {
    e.stopPropagation();
    router.push("/");
  };

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
    <>
      <nav className="fixed top-0 left-0 w-full grid grid-cols-2 lg:grid-cols-6 px-3 lg:px-5 py-5 lg:py-10 gap-2 lg:gap-0 z-50 bg-white dark:bg-gray-900">
        <div className="col-span-1 flex items-center">
          <h1 className="text-lg lg:text-2xl font-mono font-bold">SAMSAUNG</h1>
        </div>

        {/* Mobile Menu Button - hidden on lg+ */}
        <div className="col-span-1 flex items-center justify-end lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation - shown from lg up (1024px+), also shown on md with specific layout */}
        <div className="hidden lg:flex col-span-1 lg:col-span-4 items-center justify-center gap-1 lg:gap-2 flex-wrap">
          <button
            onClick={handleShopClick}
            className="p-1 lg:p-2 font-mono font-bold cursor-pointer inline-flex items-center gap-1 lg:hover:text-blue-600 text-xs lg:text-base"
          >
            Shop
          </button>
          {categories?.map((category) => (
            <NavbarSection key={category.id} category={category} />
          ))}
        </div>

        {/* Icons - Hidden on mobile, shown in dropdown */}
        <div className="hidden lg:flex col-span-2 lg:col-span-1 col-start-1 lg:col-start-auto row-start-1 lg:row-start-auto">
          <div className="flex items-center justify-end gap-2 lg:gap-5">
            {/* Desktop Search Trigger */}
            <button
              onClick={openSearch}
              className="cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <Link href={"/cart"}>
              <div className="relative">
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                {items.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
            </Link>
            <Link href={"/login"}>
              <UserKey className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg lg:hidden z-50">
            <div className="flex flex-col p-4 gap-2">
              <button
                onClick={() => {
                  handleShopClick({ stopPropagation: () => {} });
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 font-mono font-bold cursor-pointer inline-flex items-center gap-1 md:hover:text-blue-600 text-sm text-left"
              >
                Shop
              </button>
              {categories?.map((category) => (
                <NavbarSection
                  key={category.id}
                  category={category}
                  onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
                />
              ))}

              {/* Mobile Icons */}
              <div className="flex items-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-700 mt-2">
                {/* Mobile Search Trigger */}
                <button
                  onClick={() => {
                    openSearch();
                    setIsMobileMenuOpen(false);
                  }}
                  className="cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                <Link href={"/cart"}>
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {items.reduce((sum, item) => sum + item.quantity, 0) >
                      0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                        {items.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    )}
                  </div>
                </Link>
                <Link href={"/login"}>
                  <UserKey className="w-5 h-5 md:w-5 md:h-5 cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20 lg:h-28"></div>
    </>
  );
};

export default Navbar;