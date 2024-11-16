const SERVICE = "0x0"; // Providers Wallet
const AMOUNT = BigInt(1);
const CHAIN_ID = BigInt(1);

export const getPaymentRequest = () => {
  const timestamp = BigInt(Math.floor(Date.now() / 1000));
  return {
    service: SERVICE,
    amount: AMOUNT,
    timestamp,
    chainId: CHAIN_ID,
  };
};
