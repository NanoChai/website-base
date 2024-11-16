import { AMOUNT, CHAIN_ID, SERVICE } from "@/constants";

export const getPaymentRequest = () => {
  const timestamp = BigInt(Math.floor(Date.now() / 1000));
  return {
    service: SERVICE,
    amount: AMOUNT,
    timestamp,
    chainId: CHAIN_ID,
  };
};
