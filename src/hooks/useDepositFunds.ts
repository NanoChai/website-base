import { abi } from "@/constants";
import { useWriteContract } from "wagmi";

if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
  throw new Error("NEXT_PUBLIC_CONTRACT_ADDRESS is not defined");
}
const contractAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export const useDepositFunds = () => {
  const { writeContract } = useWriteContract();

  const depositFunds = async (amount: bigint) => {
    writeContract({
      abi,
      address: contractAddress,
      functionName: "deposit",
      args: [amount],
    });
  };

  return { depositFunds };
};
