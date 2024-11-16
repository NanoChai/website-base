"use client";

import { useFundsBalance } from "@/hooks/useFundsBalance";
import { useDepositFunds } from "@/hooks/useDepositFunds";

import FundManagementDialog from "./FundManagementDialog";
import { useState } from "react";
import { Button } from "./ui/button";

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
      <Button onClick={() => setIsModalOpen(!isModalOpen)}>Manage Funds</Button>
      <FundManagementDialog isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};
