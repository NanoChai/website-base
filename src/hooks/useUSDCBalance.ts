import { parseAbi } from "viem";
import { useReadContract } from "wagmi";

if (!process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS) {
  throw new Error("NEXT_PUBLIC_USDC_CONTRACT_ADDRESS is not defined");
}
const contractAddress = process.env
  .NEXT_PUBLIC_USDC_CONTRACT_ADDRESS as `0x${string}`;

const tokenAbi = parseAbi([
  "function balanceOf(address _owner) public view returns (uint256)",
]);

export const useUSDCBalance = (address: `0x${string}` | undefined) => {
  const result = useReadContract({
    abi: tokenAbi,
    address: contractAddress,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: !!address,
    },
  });
  return { balance: result.data };
};
