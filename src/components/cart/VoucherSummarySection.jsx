"use client";
import useVoucherStore from "@/data/cart";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { fetchPayment, PaymentApiUrl } from "@/data/payment";
import useSWR from "swr";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const getSelectedPrice = (data, selectedStorage) => {
  if (!data.price) return null;
  if (!Array.isArray(data.price)) return data.price;
  if (!selectedStorage || !Array.isArray(data.storage)) return data.price[0];

  const storageIndex = data.storage.indexOf(selectedStorage);
  if (storageIndex >= 0 && storageIndex < data.price.length) {
    return data.price[storageIndex];
  }
  return data.price[data.price.length - 1];
};

const VoucherSummarySection = () => {
  const { items, clearCart } = useVoucherStore();
  const [voucherCode, setVoucherCode] = React.useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const router = useRouter();

  const { data: paymentMethods, isLoading: paymentLoading, error: paymentError } = useSWR(PaymentApiUrl, fetchPayment);

  if (items.length === 0) return null;

  // Calculate subtotal (price × quantity) using selected storage price
  const subtotal = items.reduce((sum, item) => {
    const data = item.product || item.item || item;
    const price = getSelectedPrice(data, item.selectedStorage);
    if (price == null) return sum;
    return sum + Number(price) * (item.quantity || 1);
  }, 0);

  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    // Voucher logic placeholder
    console.log("Voucher applied:", voucherCode);
  };

  return (
    <section className="border rounded-lg p-4 md:p-6 space-y-4 md:space-y-6 mx-2 md:mx-5 dark:border-gray-700">
      {/* Voucher Code Input */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Have a voucher code?</h3>
        <form onSubmit={handleApplyVoucher} className="flex gap-2">
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            placeholder="Enter voucher code"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            Apply
          </button>
        </form>
      </div>

      {/* Order Items Details */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Order Items</h3>
        <div className="space-y-3">
          {items.map((item) => {
            const data = item.product || item.item || item;
            const price = getSelectedPrice(data, item.selectedStorage);
            return (
              <div key={item.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{data.title || data.name || "Product"}</p>
                    {data.subname && <p className="text-xs text-gray-500">{data.subname}</p>}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                      {item.selectedStorage && (
                        <span className="text-xs text-gray-600">Storage: <span className="font-medium">{item.selectedStorage}</span></span>
                      )}
                      {item.selectedColor && (
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          Color: <span className="w-3 h-3 rounded-full border border-gray-300 inline-block" style={{ backgroundColor: item.selectedColor }} />
                        </span>
                      )}
                      <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right ml-3 shrink-0">
                    {price != null && (
                      <span className="text-yellow-500 font-semibold text-sm">${Number(price).toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})
            </span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-yellow-500">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => setShowPaymentDialog(true)}
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition"
      >
        Checkout
      </button>

      {/* Payment Method Selection Dialog */}
      <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <div className="flex flex-col">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-center">Select Payment Method</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Choose your preferred payment method to proceed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {paymentLoading ? (
            <p className="text-center text-gray-500 py-6">Loading payment methods...</p>
          ) : paymentError ? (
            <p className="text-center text-red-500 py-6">Failed to load payment methods.</p>
          ) : (
            <div className="space-y-3 my-4">
              {paymentMethods?.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                    selectedPaymentMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={method.image}
                    alt={method.title}
                    width={40}
                    height={40}
                    className={`object-contain ${selectedPaymentMethod === method.id ? "opacity-100" : "opacity-70"}`}
                  />
                  <span className={`font-medium ${selectedPaymentMethod === method.id ? "text-blue-700" : "text-gray-700"}`}>
                    {method.title}
                  </span>
                  {selectedPaymentMethod === method.id && (
                    <span className="ml-auto text-blue-500 text-sm font-semibold">Selected</span>
                  )}
                </button>
              ))}
            </div>
          )}

          <AlertDialogFooter className="w-full flex-col gap-2">
            <AlertDialogAction
              onClick={() => {
                if (!selectedPaymentMethod) return;
                setShowPaymentDialog(false);
                setShowOrderDialog(true);
              }}
              className={`w-full py-3 text-base ${
                !selectedPaymentMethod ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Confirm Payment
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => {
                setShowPaymentDialog(false);
                setSelectedPaymentMethod(null);
              }}
              className="w-full py-3 text-sm"
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </AlertDialog>

      {/* Order Confirmation Dialog */}
      <AlertDialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <div className="flex flex-col items-center text-center">
          {/* Back button to payment method selection */}
          <button
            onClick={() => {
              setShowOrderDialog(false);
              setShowPaymentDialog(true);
            }}
            className="self-start flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Change Payment</span>
          </button>

          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Order Confirmed!</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Thank you for your purchase. Your order has been placed successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg p-4 my-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Order Number</span>
              <span className="font-semibold">#ORD-{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <p className="text-xs text-gray-500 mb-1 font-semibold">Items:</p>
              {items.map((item) => {
                const data = item.product || item.item || item;
                return (
                  <div key={item.id} className="flex justify-between text-xs py-0.5">
                    <span className="truncate mr-2">{data.title || data.name || "Product"}</span>
                    <span className="shrink-0">x{item.quantity}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-semibold text-blue-700">
                {paymentMethods?.find((m) => m.id === selectedPaymentMethod)?.title || "N/A"}
              </span>
            </div>
            <hr />
            <div className="flex justify-between text-lg">
              <span className="text-gray-500">Total Paid</span>
              <span className="font-bold text-yellow-500">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-4">
            A confirmation email will be sent to your registered email address.
          </p>

          <AlertDialogFooter className="w-full flex-col gap-2">
            <AlertDialogAction
              onClick={async () => {
                const orderData = {
                  orderNumber: `#ORD-${Date.now().toString().slice(-8)}`,
                  items: items.map((item) => {
                    const data = item.product || item.item || item;
                    return {
                      title: data.title || data.name || "Product",
                      subname: data.subname || null,
                      storage: item.selectedStorage || null,
                      color: item.selectedColor || null,
                      quantity: item.quantity,
                      price: getSelectedPrice(data, item.selectedStorage),
                    };
                  }),
                  paymentMethod: paymentMethods?.find((m) => m.id === selectedPaymentMethod)?.title || "N/A",
                  total: subtotal,
                  date: new Date().toISOString(),
                };
                try {
                  await fetch("/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData),
                  });
                } catch (e) {
                  console.error("Failed to save order:", e);
                }
                clearCart();
                setShowOrderDialog(false);
                router.push("/");
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 py-3 text-base"
            >
              Continue Shopping
            </AlertDialogAction>
            <button
              onClick={() => {
                setShowOrderDialog(false);
              }}
              className="w-full py-3 text-sm text-gray-600 hover:text-gray-800 transition"
            >
              View Order Details
            </button>
          </AlertDialogFooter>
        </div>
      </AlertDialog>
    </section>
  );
};

export default VoucherSummarySection;