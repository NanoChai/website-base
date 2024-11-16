"use client";

import { useFundsBalance } from "@/hooks/useFundsBalance";

export const BalanceView = ({ address }: { address: `0x${string}` }) => {
  const { balance } = useFundsBalance(address);
  return <div className="flex gap-2 mx-3">{balance?.toString()}</div>;
};
