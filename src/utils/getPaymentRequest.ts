import { AMOUNT, CHAIN_ID, SERVICE } from "@/constants";

export const getPaymentRequest = () => {
  return {
    service: SERVICE,
    amount: AMOUNT,
    chainId: CHAIN_ID,
  };
};
