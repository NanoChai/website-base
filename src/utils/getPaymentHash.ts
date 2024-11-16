import { encodePacked } from "viem";
import { keccak256 } from "viem";
import { PaymentRequest } from "@/types";

export const getPaymentHash = (paymentRequest: PaymentRequest) => {
  const { service, amount, userAddress, chainId, nonce } = paymentRequest;

  if (!nonce) {
    throw new Error("Nonce is not defined");
  }

  console.log([
    service,
    userAddress,
    amount.toString(),
    nonce.toString(),
    chainId.toString(),
  ]);

  const encoded = encodePacked(
    ["address", "address", "string", "string", "string"],
    [
      service,
      userAddress,
      amount.toString(),
      nonce.toString(),
      chainId.toString(),
    ]
  );

  return keccak256(encoded);
};
