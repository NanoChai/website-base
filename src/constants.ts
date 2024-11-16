import { parseAbi } from "viem";

export const USER_PAYMENT_HEADER = "user-payment-signature";
export const RESTAKER_PAYMENT_HEADER = "restaker-payment-signature";
export const SERVICE = "0xefDD4C11efD4df6F1173150e89102D343ae50AA4"; // Providers Wallet
export const AMOUNT = BigInt(1);
export const CHAIN_ID = BigInt(1);

export const abi = parseAbi([
  "function deposit(uint256 amount) external",
  "function getDeposits(address user) external view returns (uint256)",
]);
