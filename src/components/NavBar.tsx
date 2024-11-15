"use client";

import { usePayPopup } from "@/provider/WalletProvider";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { WalletOutline, SettingsOutline } from 'react-ionicons'
import { useEffect, useState } from 'react';

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
    <div className="flex justify-end p-3 bg-gray-300 sticky top-0 z-60">
      <div className="flex items-center gap-0">
        {user && balance && (
          <div className="flex items-center">
            <span className="text-gray-500 text-sm font-medium bg-gray-200 rounded-l-full px-3 py-1.5 border-10 border-r-0 border-gray-300">
              {/* Decide the cost per request, or use eth/token directly */}
              {balance * 1000} REQUESTS
            </span>
          </div>
        )}
        <button 
          onClick={openPayPopup}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`transition-colors flex items-center justify-center -ml-[2px]
            ${user 
              ? 'bg-green-500 hover:bg-green-600 w-8 h-8 rounded-r-full' 
              : 'bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded'
            } text-white`}
        >
          {user ? (
            isHovering ? (
              <SettingsOutline
                color={'white'} 
                height="20px"
                width="20px"
              />
            ) : (
              <WalletOutline
                color={'white'} 
                height="20px"
                width="20px"
              />
            )
          ) : (
            'Connect Wallet'
          )}
        </button>
      </div>
    </div>
  );
};
