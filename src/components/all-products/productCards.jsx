"use client";
import Image from "next/image";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useVoucherStore from "@/data/cart";
import { useProductStore } from "@/data/all-products/products";
import { useRouter } from "next/navigation";

// Helper function to get the price for a given storage option
const getSelectedPrice = (product, storage) => {
  if (!product.price) return null;
  if (!Array.isArray(product.price)) return product.price;
  if (!storage || !Array.isArray(product.storage)) return product.price[0];
  const idx = product.storage.indexOf(storage);
  if (idx >= 0 && idx < product.price.length) return product.price[idx];
  return product.price[product.price.length - 1];
};

const ProductCards = ({ products }) => {
  const{addItem} =useVoucherStore();
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [priceRange, setPriceRange] = useState("");
  // Per-card storage/color selection
  const [cardStorage, setCardStorage] = useState({});
  const [cardColor, setCardColor] = useState({});
  //product details
  const router = useRouter(); 
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);
  

  // Reset all filters immediately when products change (subname/category switch)
  useEffect(() => {
    setSelectedStorage("");
    setSelectedColor("");
    setPriceRange("");
  }, [products]);

  useEffect(() => {
    setSelectedColor("");
    setSelectedColor("");
    setPriceRange("");
  }, [products]);
  // Compute a unique key that changes whenever the product list changes.
  // Used as React key on Select components to force a full remount.
  const productKey = useMemo(() => {
    if (!products || products.length === 0) return "empty";
    return products.map((p) => p.id).join("-");
  }, [products]);

  // Collect all unique filter options from the products
  const storageOptions = useMemo(() => {
    const options = products
      .filter((p) => p.storage && p.storage.length > 0)
      .flatMap((p) => p.storage);
    return [...new Set(options)];
  }, [products]);

  const colorOptions = useMemo(() => {
    const options = products
      .filter((p) => p.colors && p.colors.length > 0)
      .flatMap((p) => p.colors);
    return [...new Set(options)];
  }, [products]);

  // Determine the min and max price across products for the price range filter
  const priceBounds = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    products.forEach((p) => {
      if (p.price != null) {
        const prices = Array.isArray(p.price) ? p.price : [p.price];
        prices.forEach((val) => {
          if (val < min) min = val;
          if (val > max) max = val;
        });
      }
    });
    return {
      min: min === Infinity ? 0 : min,
      max: max === -Infinity ? 0 : max,
    };
  }, [products]);

  // Generate preset price ranges
  const priceRanges = useMemo(() => {
    const { min, max } = priceBounds;
    const step = (max - min) / 3;
    if (step === 0) return [];
    return [
      {
        label: `$${min.toFixed(0)} - $${(min + step).toFixed(0)}`,
        min,
        max: min + step,
      },
      {
        label: `$${(min + step).toFixed(0)} - $${(min + step * 2).toFixed(0)}`,
        min: min + step,
        max: min + step * 2,
      },
      {
        label: `$${(min + step * 2).toFixed(0)} - $${max.toFixed(0)}`,
        min: min + step * 2,
        max,
      },
    ];
  }, [priceBounds]);

  // Filter products based on all selected criteria
  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by storage
      if (selectedStorage) {
        if (!product.storage || !product.storage.includes(selectedStorage))
          return false;
      }
      // Filter by color
      if (selectedColor) {
        if (!product.colors || !product.colors.includes(selectedColor))
          return false;
      }
      // Filter by price range
      if (priceRange) {
        const productPrices =
          product.price != null
            ? Array.isArray(product.price)
              ? product.price
              : [product.price]
            : [];
        if (productPrices.length === 0) return false;
        const [rangeMin, rangeMax] = priceRange.split("-").map(Number);
        const hasPriceInRange = productPrices.some(
          (p) => p >= rangeMin && p <= rangeMax,
        );
        if (!hasPriceInRange) return false;
      }
      return true;
    });
  }, [products, selectedStorage, selectedColor, priceRange]);

  const clearAllFilters = () => {
    setSelectedStorage("");
    setSelectedColor("");
    setPriceRange("");
  };

  const hasActiveFilters = selectedStorage || selectedColor || priceRange;
  const [api, setApi] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleClick = (product) => {
    const selectedStorage = cardStorage[product.id] || (Array.isArray(product.storage) ? product.storage[0] : null);
    const selectedColor = cardColor[product.id] || (Array.isArray(product.colors) ? product.colors[0] : null);
    addItem({
      id: Date.now(),
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        storage: product.storage,
        colors: product.colors,
      },
      selectedStorage,
      selectedColor,
    });
  };

  const onSelect = useCallback((apiInstance) => {
    if (!apiInstance) return;
    const selectedIndex = apiInstance.selectedScrollSnap();
    const totalSlides = apiInstance.scrollSnapList().length;
    if (totalSlides > 0) {
      const progressValue = ((selectedIndex + 1) / totalSlides) * 100;
      setProgress(Math.round(progressValue));
    }
  }, []);

  // Early return for empty products AFTER all hooks are called
  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center py-16 px-4 bg-gray-50 rounded-2xl border border-gray-100 my-6">
          <div className="text-3xl mb-4 opacity-80">✨</div>
          <h3 className="text-gray-900 font-semibold text-lg tracking-tight">
            Temporarily Sold Out
          </h3>
          <p className="text-gray-500 text-sm mt-1.5 max-w-sm mx-auto leading-relaxed">
            These items flew off our shelves. Let us notify you the exact moment
            they return.
          </p>
        </div>
    )
  }

  return (
    <>
      <div className="flex border-b border-gray-200 p-3 items-center">
        <h3 className="border-r border-black text-xl px-2 py-0">Filter</h3>
        <h3 className=" text-l text-gray-500 px-2 py-0">{visibleProducts.length} Result{visibleProducts.length!==1?"s":""}</h3>
      </div>
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 p-5">
        {/* Storage filter */}
        {storageOptions.length > 0 && (
          <Select
            key={`storage-${productKey}`}
            value={selectedStorage || undefined}
            onValueChange={setSelectedStorage}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Storage" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {storageOptions.map((storage) => (
                  <SelectItem key={storage} value={storage}>
                    {storage}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {/* Color filter */}
        {colorOptions.length > 0 && (
          <Select
            key={`color-${productKey}`}
            value={selectedColor || undefined}
            onValueChange={setSelectedColor}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {colorOptions.map((color) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                      <span>{color}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {/* Price range filter */}
        {priceRanges.length > 0 && (
          <Select
            key={`price-${productKey}`}
            value={priceRange || undefined}
            onValueChange={setPriceRange}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {priceRanges.map((range, idx) => (
                  <SelectItem key={idx} value={`${range.min}-${range.max}`}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {/* Clear all filters button */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Product Carousel */}
      {visibleProducts.length > 0 ? (
        <Carousel
          className="w-full mb-5"
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
          }}
        >
          <CarouselContent className="flex w-full sm:p-5 mb:p-5 lg:p-5">
            {visibleProducts.map((product) => {
              const currentStorage = cardStorage[product.id] || (Array.isArray(product.storage) ? product.storage[0] : null);
              const currentColor = cardColor[product.id] || (Array.isArray(product.colors) ? product.colors[0] : null);
              const displayPrice = getSelectedPrice(product, currentStorage);

              return (
                <CarouselItem
                  key={product.id}
                  className=" pl-2 md:basis-1/3 lg:basis-1/4 p-2"
                >
                  <div
                   
                    className="border rounded-xl p-4 bg-gray-50 shadow-sm h-full"
                  >
                    <div className="flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="w-35 h-35 hover:scale-105 transform transition duration-500"
                      />
                    </div>
                    <div className="mt-3 ">
                      <h3 className="font-semibold text-lg ">{product.title}</h3>
                      {product.subname && (
                        <p className="text-sm text-gray-500">{product.subname}</p>
                      )}
                      {product.rate && (
                        <p className="text-yellow-500 text-sm mt-1">
                          ★ {product.rate}
                        </p>
                      )}
                    </div>

                    {/* Storage Selection */}
                    {product.storage && product.storage.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {product.storage.map((s) => (
                          <button
                            key={s}
                            onClick={() => setCardStorage((prev) => ({ ...prev, [product.id]: s }))}
                            className={`border rounded-md px-2 py-0.5 text-xs transition ${
                              currentStorage === s
                                ? "border-blue-500 bg-blue-50 text-blue-600 font-semibold"
                                : "border-gray-300 text-gray-600 hover:border-gray-500"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Color Selection */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {product.colors.map((c) => (
                          <button
                            key={c}
                            onClick={() => setCardColor((prev) => ({ ...prev, [product.id]: c }))}
                            className={`w-5 h-5 rounded-full border-2 transition ${
                              currentColor === c
                                ? "border-blue-500 scale-110"
                                : "border-gray-300 hover:border-gray-500"
                            }`}
                            style={{ backgroundColor: c }}
                            title={c}
                          />
                        ))}
                      </div>
                    )}

                    {/* Price display — shows selected storage price */}
                    <div>
                      {displayPrice != null && (
                        <p className="text-yellow-500 text-sm mt-1">
                          ${Number(displayPrice).toFixed(2)}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col w-full">
                      <button onClick={() => handleClick(product)} className="border bg-black text-white p-1 mb-2 rounded-xl hover:bg-white hover:text-black transition duration-500">
                        Buy
                      </button>
                      <button
                       onClick={() => { setSelectedProduct(product); router.push(`/products/${product.id}`); }}
                       className="border rounded-xl p-1 hover:bg-black hover:text-white transition duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {visibleProducts.length > 4 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-150 h-0.5 bg-stone-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <CarouselPrevious className="static translate-x-0 translate-y-0 bg-white shadow-md hover:bg-gray-100 rounded-full" />
              <CarouselNext className="static translate-x-0 translate-y-0 bg-white shadow-md hover:bg-gray-100 rounded-full" />
            </div>
          )}
        </Carousel>
      ) : (
        <div className="w-full text-center py-16 px-4 bg-gray-50 rounded-2xl border border-gray-100 my-6">
          <div className="text-3xl mb-4 opacity-80">✨</div>
          <h3 className="text-gray-900 font-semibold text-lg tracking-tight">
            Temporarily Sold Out
          </h3>
          <p className="text-gray-500 text-sm mt-1.5 max-w-sm mx-auto leading-relaxed">
            These items flew off our shelves. Let us notify you the exact moment
            they return.
          </p>
        </div>
      )}
    </>
  );
};

export default ProductCards;