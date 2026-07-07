import {
  fetchProduct,
  latestOfferProductsApiUrl,
  useProductStore,
} from "@/data/latestOffer/latestOfferProducts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const LatestOfferProductSection = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR(latestOfferProductsApiUrl, fetchProduct);
  const router = useRouter();
  const category = useProductStore((state) => state.category);
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);
  const normalize = (str) => str.toLowerCase().replace(/[-\s&]/g, "");

  const filteredProducts =
    category === ""
      ? "No more products"
      : products?.filter(
          (product) => normalize(product.category) === normalize(category),
        );

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
    <section className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 p-2 sm:p-4 md:p-6">
        {filteredProducts?.map((product) => (
          <div key={product.id} className="flex flex-col">
            <div onClick={() => { setSelectedProduct(product); router.push(`/products/${product.id}`); }} className="flex flex-col items-center justify-center overflow-hidden">
              <div className="bg-stone-100 w-full flex justify-center items-center aspect-square sm:aspect-[4/3] md:aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={150}
                  className="
                 hover:scale-105 transform transition duration-500 object-contain w-full h-full p-2 sm:p-4"
                />
              </div>
              
              <div className="w-full mt-2 sm:mt-3 md:mt-4 px-1 sm:px-2">
                <h5 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-heading line-clamp-2">
                  {product.title}
                </h5>
                <h3 className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">${product.description}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestOfferProductSection;
