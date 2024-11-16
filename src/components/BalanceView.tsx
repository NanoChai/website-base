"use client";

import { useFundsBalance } from "@/hooks/useFundsBalance";
import { formatUnits } from "viem";

export const BalanceView = ({ address }: { address: `0x${string}` }) => {
  const { balance } = useFundsBalance(address);

  const usdAmount = balance ? formatUnits(balance, 6) : "0";

  return (
    <div className="mx-3 bg-gray-300 my-auto p-1">
      Account Balance: {usdAmount}
    </div>
  );
};
