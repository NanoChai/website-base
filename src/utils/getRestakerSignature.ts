import { PaymentRequest } from "@/types";

if (!process.env.NEXT_PUBLIC_RESTAKER_URL) {
  throw new Error("RESTAKER_URL is not defined");
}
const restakerUrl = process.env.NEXT_PUBLIC_RESTAKER_URL;

export const getRestakerSignature = (paymentRequest: PaymentRequest) => {
  const { service, amount, userAddress, chainId } = paymentRequest;

  return fetch(`${restakerUrl}/sign-spend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userAddress,
      serviceAddress: service,
      amount: amount.toString(),
      chainId: chainId.toString(),
      userSig: "hard-code",
    }),
  });
};
