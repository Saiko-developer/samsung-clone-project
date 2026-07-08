"use client"
import { useState, useCallback } from 'react';
import { AllProductsApiUrl, fetchAllProducts } from '@/data/all-products/products';
import useSWR from 'swr';
import useVoucherStore from '@/data/cart';
import Image from 'next/image';

// Helper function to get the price for a given storage option
const getSelectedPrice = (product, storage) => {
  if (!product.price) return null;
  if (!Array.isArray(product.price)) return product.price;
  if (!storage || !Array.isArray(product.storage)) return product.price[0];
  const idx = product.storage.indexOf(storage);
  if (idx >= 0 && idx < product.price.length) return product.price[idx];
  return product.price[product.price.length - 1];
};

const SuggestionItem = () => {
  const { data: products, isLoading, error } = useSWR(AllProductsApiUrl, fetchAllProducts);
  const { addItem } = useVoucherStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('right');
  // Per-product storage/color selection
  const [cardStorage, setCardStorage] = useState({});
  const [cardColor, setCardColor] = useState({});

  const handleDotClick = useCallback((index) => {
    setSlideDir(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
  }, [activeIndex]);

  if (isLoading) return <p className="text-center text-gray-500 py-10 text-lg animate-pulse">Loading....</p>;
  if (error) return <p className="text-center text-red-500 py-10 text-lg">Failed to load products.</p>;

  const totalItems = products?.length || 0;

  return (
    <div className="w-full mb-2">
      {/* Carousel items */}
      <div className="overflow-hidden m-7">
        {products?.map((product, index) => {
          const currentStorage = cardStorage[product.id] || (Array.isArray(product.storage) ? product.storage[0] : null);
          const currentColor = cardColor[product.id] || (Array.isArray(product.colors) ? product.colors[0] : null);
          const displayPrice = getSelectedPrice(product, currentStorage);
          const isActive = index === activeIndex;

          return (
            <div
              key={product.id}
              className={`transition-all duration-500 ${
                isActive
                  ? 'block opacity-100 translate-x-0'
                  : 'hidden opacity-0'
              } ${
                isActive && slideDir === 'right'
                  ? 'animate-in slide-in-from-right-10 fade-in'
                  : ''
              } ${
                isActive && slideDir === 'left'
                  ? 'animate-in slide-in-from-left-10 fade-in'
                  : ''
              }`}
            >
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-7 w-[300px] h-[520px] mx-auto transition-all duration-300 ease-out hover:shadow-xl hover:shadow-black/10 hover:scale-[1.02] hover:bg-gray-50">
                {/* Image — fixed container so all images are the same size */}
                <div className="w-35 h-45 shrink-0 transition-transform duration-500">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={140}
                    height={180}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Info — pushed to bottom with padding */}
                <div className="flex flex-col gap-2 w-full mt-auto pb-4">
                  <h3 className="text-xl font-bold transition-colors duration-300 hover:text-blue-600">{product.title}</h3>
                  {product.subname && (
                    <p className="text-sm text-gray-500 animate-in fade-in duration-500">{product.subname}</p>
                  )}

                  {/* Storage Selection */}
                  {product.storage && product.storage.length > 0 && (
                    <div className="flex gap-2 mt-1 flex-wrap animate-in fade-in duration-500">
                      {product.storage.map((s) => (
                        <button
                          key={s}
                          onClick={() => setCardStorage((prev) => ({ ...prev, [product.id]: s }))}
                          className={`border rounded-md px-2 py-0.5 text-xs transition-all duration-200 ${
                            currentStorage === s
                              ? "border-blue-500 bg-blue-50 text-blue-600 font-semibold shadow-md"
                              : "border-gray-300 text-gray-600 hover:border-gray-500 hover:bg-gray-50 hover:shadow-sm"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Color Selection */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex gap-1.5 mt-1 flex-wrap animate-in fade-in duration-500">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setCardColor((prev) => ({ ...prev, [product.id]: c }))}
                          className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                            currentColor === c
                              ? "border-blue-500 scale-110 shadow-md"
                              : "border-gray-300 hover:border-gray-500 hover:scale-110"
                          }`}
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                  )}

                  {/* Price display — shows selected storage price */}
                  {displayPrice != null && (
                    <p className="text-yellow-500 font-semibold text-lg animate-in slide-in-from-bottom-3 fade-in duration-500">
                      ${Number(displayPrice).toFixed(2)}
                    </p>
                  )}
                  <button
                    onClick={() =>
                      addItem({
                        id: Date.now(),
                        item: {
                          id: product.id,
                          title: product.title,
                          subname: product.subname,
                          price: product.price,
                          storage: product.storage,
                          colors: product.colors,
                          rate: product.rate,
                          image: product.image,
                        },
                        selectedStorage: currentStorage,
                        selectedColor: currentColor,
                      })
                    }
                    className="mt-2 bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-white hover:text-black border border-black transition-all duration-300 self-start hover:shadow-lg hover:shadow-black/20 active:scale-95 animate-in slide-in-from-bottom-3 fade-in duration-500"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      {totalItems > 1 && (
        <div className='flex justify-center animate-in fade-in duration-700'>
          <div className="flex items-center border-2 space-x-3 p-2 rounded-2xl">
          {products?.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-black scale-125 shadow-md'
                  : 'bg-gray-400 hover:bg-gray-500 hover:scale-110'
              }`}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default SuggestionItem;