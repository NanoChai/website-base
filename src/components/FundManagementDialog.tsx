"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFundsBalance } from "@/hooks/useFundsBalance";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useBalance } from "wagmi";
import { useUSDCBalance } from "@/hooks/useUSDCBalance";
import { formatUnits } from "viem";

export default function FundManagementDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [amount, setAmount] = useState(5);

  const { primaryWallet } = useDynamicContext();

  const address = primaryWallet?.address
    ? (primaryWallet?.address as `0x${string}`)
    : undefined;

  const { balance: fundsBalance } = useFundsBalance(address);
  const { balance: walletBalance } = useUSDCBalance(address);
  const result = useBalance({
    address,
  });
  const ethBalance = result.data;

  const formattedFunds = formatUnits(fundsBalance || BigInt(0), 6);
  const formattedWallet = formatUnits(walletBalance || BigInt(0), 6);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Funds</DialogTitle>
          <DialogDescription>
            To use microChai you must transfers funds from your wallet to your
            account
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <div>Funds in wallet: {formattedWallet}</div>
            <div>Funds in account: {formattedFunds}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount ($USD)
            </Label>
            <Input
              id="amount"
              type="number"
              className="col-span-3"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter className="flex">
          <Button>Deposit</Button>
          <Button>Withdraw</Button>
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
