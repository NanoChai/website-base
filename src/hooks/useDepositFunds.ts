import { abi, CHAIN_ID } from "@/constants";
import { parseAbi } from "viem";
import { useReadContract, useWriteContract } from "wagmi";

if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
  throw new Error("NEXT_PUBLIC_CONTRACT_ADDRESS is not defined");
}
const contractAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

if (!process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS) {
  throw new Error("NEXT_PUBLIC_USDC_CONTRACT_ADDRESS is not defined");
}
const usdcTokenAddress = process.env
  .NEXT_PUBLIC_USDC_CONTRACT_ADDRESS as `0x${string}`;

if (!process.env.NEXT_PUBLIC_RESTAKER_URL) {
  throw new Error("RESTAKER_URL is not defined");
}
const restakerUrl = process.env.NEXT_PUBLIC_RESTAKER_URL;

const tokenAbi = parseAbi([
  "function allowance(address _owner, address _spender) public view returns (uint256)",
  "function approve(address _spender, uint256 _value) public returns (bool)",
]);

export const useDepositFunds = (address: `0x${string}` | undefined) => {
  const { writeContractAsync } = useWriteContract();

  const result = useReadContract({
    abi: tokenAbi,
    address: usdcTokenAddress,
    functionName: "allowance",
    args: [address!, contractAddress],
    query: {
      enabled: !!address,
    },
  });

  const depositFunds = async (amount: bigint) => {
    return writeContractAsync({
      abi,
      address: contractAddress,
      functionName: "deposit",
      args: [amount],
    }).then(() => {
      return fetch(`${restakerUrl}/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAddress: address,
          amount: amount.toString(),
          chainId: CHAIN_ID,
        }),
      });
    });
  };

  const grantApproval = async (amount: bigint) => {
    return writeContractAsync({
      abi: tokenAbi,
      address: usdcTokenAddress,
      functionName: "approve",
      args: [contractAddress, amount],
    });
  };

  return { grantApproval, depositFunds, allowance: result.data };
};
