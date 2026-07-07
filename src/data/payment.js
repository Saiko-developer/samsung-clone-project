export const PaymentApiUrl = "/api/payment-method";

export const fetchPayment = (...args) =>
  fetch(...args).then((res) => res.json());