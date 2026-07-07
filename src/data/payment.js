export const PaymentApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/payment-method`;

export const fetchPayment = (...args) =>
  fetch(...args).then((res) => res.json());