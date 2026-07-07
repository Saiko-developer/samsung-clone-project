"use client"

import { CategoryApiUrl, fetchCategory } from "@/data/latest/categories"
import { useProducts } from "@/data/latest/products"
import * as LucideIcons from "lucide-react"
import useSWR from "swr"

const LatestCategoriesSection =  () => {
    const {data:categories,isLoading,error} = useSWR(CategoryApiUrl,fetchCategory)
    const setCategory = useProducts((state) => state.setCategory)
    
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
      <div className="p-3 md:p-5">
          <h1 className="text-2xl md:text-4xl font-mono font-bold">
            Discover Our Latest Products
          </h1>
        </div>
      <section className="w-full flex flex-col mb-5">
        <div>
            <nav className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap px-2 sm:px-4 md:px-6">
                {/* New & Features button - shown first */}
                <button
                  onClick={() => setCategory("New & Features")}
                  className="border flex flex-col items-center rounded-xl gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 min-w-[70px] sm:min-w-[90px] md:min-w-[110px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center">
                    <LucideIcons.Sparkles size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm text-center leading-tight mt-1">New & Features</span>
                </button>
                {categories.map((category) => (
                    <button 
                        onClick={() => {
                          setCategory(category.name)
                        }}  
                        key={category.id}  
                        className="border flex flex-col items-center rounded-xl gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 min-w-[70px] sm:min-w-[90px] md:min-w-[110px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center">
                        {(() => {
                          const IconComponent = LucideIcons[category.icon];
                          return IconComponent ? <IconComponent size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" /> : null;
                        })()}
                      </div>
                      <span className="text-[10px] sm:text-xs md:text-sm text-center leading-tight mt-1">
                        {category.name}
                      </span>
                    </button>
                ))}
            </nav>
        </div>
    </section>
    </main>
  )
}

export default LatestCategoriesSection
