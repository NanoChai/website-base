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
import { formatUnits, parseUnits } from "viem";
import { useDepositFunds } from "@/hooks/useDepositFunds";
import { Loader2 } from "lucide-react";

export default function FundManagementDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(5);

  const { primaryWallet } = useDynamicContext();

  const address = primaryWallet?.address
    ? (primaryWallet?.address as `0x${string}`)
    : undefined;

  const { balance: fundsBalance } = useFundsBalance(address);
  const { balance: walletBalance } = useUSDCBalance(address);
  // const result = useBalance({
  //   address,
  // });
  // const ethBalance = result.data;
  const formattedFunds = formatUnits(fundsBalance || BigInt(0), 6);
  const formattedWallet = formatUnits(walletBalance || BigInt(0), 6);

  const { grantApproval, depositFunds, allowance } = useDepositFunds(address);

  const amountApproved = formatUnits(allowance || BigInt(0), 6);
  const amountApprovedNumber = Number(amountApproved);

  const needsApproval = amount > amountApprovedNumber;

  const addFunds = async () => {
    setIsLoading(true);
    if (needsApproval) {
      await grantApproval(parseUnits(amount.toString(), 6));
    } else {
      await depositFunds(parseUnits(amount.toString(), 6));
    }
    setIsLoading(false);
  };

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
            <div>Funds in wallet: {formattedWallet} (USDC)</div>
            <div>Funds in account: {formattedFunds} (USDC)</div>
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
        <DialogFooter>
          {isLoading ? (
            <div>
              <Loader2 className="animate-spin mr-2" />
            </div>
          ) : (
            <div className="flex gap-2">
              <Button onClick={addFunds}>
                {needsApproval ? "Approve" : "Deposit"}
              </Button>
              {fundsBalance && fundsBalance > BigInt(0) && (
                <Button>Withdraw</Button>
              )}
              <Button onClick={() => setIsOpen(false)} variant="secondary">
                Cancel
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
