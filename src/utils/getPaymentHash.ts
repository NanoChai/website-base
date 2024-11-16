import { encodePacked } from "viem";
import { keccak256 } from "viem";

const SERVICE = "0x0"; // Providers Wallet
const AMOUNT = BigInt(1);
const CHAIN_ID = BigInt(1);

export const getPaymentHash = () => {
  const timestamp = BigInt(Math.floor(Date.now() / 1000));

  const nonce = BigInt(0);

  const encoded = encodePacked(
    ["string", "uint256", "uint256", "uint256", "uint256"],
    [SERVICE, AMOUNT, timestamp, nonce, CHAIN_ID]
  );

  return keccak256(encoded);
};
