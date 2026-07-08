export const PaymentApiUrl = "/api/data/payment-method";

export const fetchPayment = (...args) =>
  fetch(...args).then((res) => res.json());