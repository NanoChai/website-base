"use client";

import { usePayPopup } from "@/provider/WalletProvider";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from 'react';
import { WalletIcon } from './WalletIcon';
import { SiteNav } from './SiteNav';

export const NavBar = () => {
  const { openPayPopup } = usePayPopup();
  const { user, primaryWallet } = useDynamicContext();
  const [balance, setBalance] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (primaryWallet?.address) {
        try {
          const response = await fetch(`/api/query?address=${primaryWallet.address}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: { balance?: string } = await response.json();
          if (!data.balance) {
            throw new Error('Balance not found in response');
          }
          setBalance(data.balance);
        } catch (error) {
          console.error('Failed to fetch balance:', error);
        }
      }
    };

    if (user) {
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [user, primaryWallet?.address]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-3 bg-gray-300 sticky top-0 z-60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          <span className="text-xl font-bold">App Title</span>
        </div>

        <WalletIcon 
          isHovering={isHovering}
          isConnected={!!user}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={openPayPopup}
          balance={balance}
        />
      </div>
      <SiteNav />
    </div>
  );
};
