"use client";

import { useFundsBalance } from "@/hooks/useFundsBalance";
import { useDepositFunds } from "@/hooks/useDepositFunds";

import FundManagementDialog from "./FundManagementDialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { BalanceView } from "./BalanceView";

export const FundsManagementButton = ({
  address,
}: {
  address: `0x${string}`;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { balance } = useFundsBalance(address);
  const { depositFunds } = useDepositFunds();

  return (
    <div className="mx-3">
      <div className="flex gap-2">
        <BalanceView address={address} />
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>
          Manage Funds
        </Button>
      </div>
      <FundManagementDialog isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};
