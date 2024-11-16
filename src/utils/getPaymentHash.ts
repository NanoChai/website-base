import { encodePacked } from "viem";
import { keccak256 } from "viem";
import { PaymentRequest } from "@/types";

export const getPaymentHash = (paymentRequest: PaymentRequest) => {
  const { service, amount, timestamp, chainId, nonce } = paymentRequest;

  if (!nonce) {
    throw new Error("Nonce is not defined");
  }

  const encoded = encodePacked(
    ["string", "uint256", "uint256", "uint256", "uint256"],
    [service, amount, timestamp, nonce, chainId]
  );

  return keccak256(encoded);
};
