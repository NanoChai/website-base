import { PaymentRequest } from "@/types";

if (!process.env.NEXT_PUBLIC_RESTAKER_URL) {
  throw new Error("RESTAKER_URL is not defined");
}

const RESTAKER_URL = process.env.NEXT_PUBLIC_RESTAKER_URL;

export const getRestakerSignature = (paymentRequest: PaymentRequest) => {
  return fetch(RESTAKER_URL, {
    method: "POST",
    body: JSON.stringify(paymentRequest),
  });
};
