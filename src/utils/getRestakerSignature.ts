import { PaymentRequest } from "@/types";
import { privateKeyToAccount } from "viem/accounts";
import { getPaymentHash } from "./getPaymentHash";

if (!process.env.NEXT_PUBLIC_RESTAKER_URL) {
  throw new Error("RESTAKER_URL is not defined");
}
const restakerUrl = process.env.NEXT_PUBLIC_RESTAKER_URL;

const NO_ONES_KEY =
  "0x0babb115ae03421a131bd34458da291d22962bedb2492a29db308df0df93f9c8";
const account = privateKeyToAccount(NO_ONES_KEY);
console.log("account", account.address);
const getMockRestakerSignature = async (paymentRequest: PaymentRequest) => {
  const message = getPaymentHash(paymentRequest);
  const signature = await account.signMessage({ message });
  return signature;
};

export const getRestakerSignature = async (paymentRequest: PaymentRequest) => {
  // const nonce = BigInt(1);
  // const signature = await getMockRestakerSignature({
  //   ...paymentRequest,
  //   nonce,
  // });
  // return {
  //   signature,
  //   nonce: "1",
  //   restakerAddress: "0x1FDD9d4f271D4aE9f4F2FA241EEFE331A75f0498",
  // };

  const { service, amount, timestamp, chainId } = paymentRequest;
  return fetch(restakerUrl, {
    method: "POST",
    body: JSON.stringify({
      serviceAddress: service,
      amount: amount.toString(),
      timestamp: timestamp.toString(),
      chainId: chainId.toString(),
      userSig: "hard-code",
    }),
  });
};
