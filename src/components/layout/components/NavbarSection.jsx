"use client";

import { useProducts } from "@/data/all-products/categories";
import {
  AllProductsCategoriesApiUrl,
  fetchAllProductsCategories,
} from "@/data/all-products/categories";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useState } from "react";

const NavbarSection = ({ category, onCloseMobileMenu }) => {
  const setCategory = useProducts((state) => state.setCategory);
  const setSubname = useProducts((state) => state.setSubname);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { data: allCategories } = useSWR(
    AllProductsCategoriesApiUrl,
    fetchAllProductsCategories,
  );
  
  const relatedCategories =
    allCategories?.filter((cat) => cat.category === category.name) || [];

  const subcategories = [
    ...new Set(relatedCategories.map((c) => c.subcategory)),
  ];

  const handleClick = (e) => {
    e.preventDefault();
    setCategory(category.name);
    setSubname(subcategories[0] || "");
    if (onCloseMobileMenu) onCloseMobileMenu();
    router.push("/products");
  };

  const handleSubcategoryClick = (e, subname) => {
    e.stopPropagation();
    setCategory(category.name);
    setSubname(subname);
    if (onCloseMobileMenu) onCloseMobileMenu();
    router.push("/products");
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="inline-flex items-center gap-1">
        <a
          href="/products"
          onClick={handleClick}
          className="p-2 font-mono font-bold cursor-pointer inline-flex items-center gap-1 md:hover:text-blue-600 transition-colors"
        >
          {category.name}
        </a>
      </span>

      {/* Dropdown — shows related categories, subcategories, and product previews */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-xl z-50 min-w-75 p-4 grid grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto">
          {/* Left column: Subcategories */}
          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-1">
              {category.name}
            </h4>
            <div className="flex flex-col gap-1">
              {subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={(e) => handleSubcategoryClick(e, sub)}
                  className="text-left px-3 py-2 text-sm font-medium rounded-lg md:hover:bg-gray-100 md:dark:hover:bg-gray-800 transition-colors"
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarSection;
