import { abi } from "@/constants";
import { useReadContract } from "wagmi";

if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
  throw new Error("NEXT_PUBLIC_CONTRACT_ADDRESS is not defined");
}
const contractAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export const useFundsBalance = (address: `0x${string}` | undefined) => {
  const result = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getDeposits",
    args: [address!],
    query: {
      enabled: !!address,
    },
  });
  return { balance: result.data };
};
