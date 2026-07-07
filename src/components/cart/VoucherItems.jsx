import useVoucherStore from "@/data/cart";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const getSelectedPrice = (data, selectedStorage) => {
  if (!data.price) return null;
  if (!Array.isArray(data.price)) return data.price;
  if (!selectedStorage || !Array.isArray(data.storage)) return data.price[0];

  const storageIndex = data.storage.indexOf(selectedStorage);
  if (storageIndex >= 0 && storageIndex < data.price.length) {
    return data.price[storageIndex];
  }
  // Fallback to last price if index out of bounds
  return data.price[data.price.length - 1];
};

const VoucherItems = ({ item }) => {
  if (!item) return null;

  // Support both data structures:
  // ProductCards: item.product.title
  // SuggestionItem: item.item.title
  const data = item.product || item.item || item;
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const { removeItem, updateQuantity } = useVoucherStore();

  const selectedPrice = getSelectedPrice(data, item.selectedStorage);

  const handleDelete = () => {
    removeItem(item.id);
    setDeleteConfirmOpen(false);
    toast.success("Order cancelled successfully");
  };

  return (
    <div className="flex flex-col gap-5 mb-4">
      
      <div className="grid grid-cols-4 md:grid-cols-3 gap-3">
        {/* Product Image */}
      <div className="col-span-1">
        <div className="w-full aspect-square shrink-0 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
        {data.image ? (
          <Image
            src={data.image}
            alt={data.title || data.name || "Product"}
            width={96}
            height={96}
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-[10px]">
            No Image
          </div>
        )}
      </div>
      </div>
      <div className="col-span-3 md:col-span-2">
        <div className="flex flex-row justify-between gap-2">
        {/* Product Details */}
      <div className="flex flex-col min-w-0">
        <h3 className="font-semibold text-sm md:text-lg truncate mb-1 md:mb-2">
          {data.title || data.name || "Product"}
        </h3>
        {data.subname && (
          <p className="text-xs md:text-sm text-gray-500">{data.subname}</p>
        )}

        {/* Selected Storage (read-only) */}
        {item.selectedStorage && (
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            Storage: <span className="font-medium">{item.selectedStorage}</span>
          </p>
        )}

        {/* Selected Color (read-only) */}
        {item.selectedColor && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs md:text-sm text-gray-600">Color:</span>
            <div
              className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: item.selectedColor }}
              title={item.selectedColor}
            />
          </div>
        )}
      </div>

      {/* Quantity & Price */}
      <div className="flex flex-col items-center md:items-end justify-between md:justify-start mt-2 md:mt-0">
        
        <div className="text-end md:mb-10">
          {selectedPrice != null && (
          <p className="text-yellow-500 font-semibold text-sm md:text-lg whitespace-nowrap">
            ${Number(selectedPrice).toFixed(2)}
          </p>
        )}
        <button
          onClick={() => setDeleteConfirmOpen(true)}
          className="ml-2 md:ml-0 mt-0 md:mt-2 text-red-500 hover:text-red-700"
        >
          <Trash2 size={16} />
        </button>
        </div>
        {/* Quantity Controls */}
        <div className="flex items-center gap-1 md:gap-2 border border-gray-300 rounded-md px-1.5 md:px-2 py-1">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-gray-600 hover:text-black font-bold text-base md:text-lg leading-none"
          >
            −
          </button>
          <span className="w-5 md:w-6 text-center text-xs md:text-sm font-medium">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-gray-600 hover:text-black font-bold text-base md:text-lg leading-none"
          >
            +
          </button>
        </div>
      </div>
      </div>
      </div>

      


      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Order</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteConfirmOpen(false)}>
            Keep Order
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Yes, Cancel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialog>
    </div>
  );
};

export default VoucherItems;