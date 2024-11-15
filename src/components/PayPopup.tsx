import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDynamicContext, useTokenBalances, useUserWallets, useFunding } from "@dynamic-labs/sdk-react-core";

interface PayPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PayPopup = ({ isOpen, onClose }: PayPopupProps) => {
  const { user } = useDynamicContext();
  const { tokenBalances, isLoading, isError, error } = useTokenBalances();
  const userWallets = useUserWallets();
  const { enabled, openFunding } = useFunding();

  const handlePayment = async () => {
    try {
      const balance = tokenBalances?.[0]?.balance || '0';
      if (balance === '0') {
        await openFunding({
          token: "USDT",
          // Replace with your actual wallet address
          address: userWallets?.[0]?.address || "",
        }).then(() => {
          console.log("Funding successful!");
        });
      } else {
        // Add your payment logic here for non-zero balance
        console.log('Processing payment...');
      }
    } catch (err) {
      console.error('Payment failed:', err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white/80 backdrop-blur-md border border-white/20 shadow-xl p-8">
          {user === undefined ? (
            <>
              <Dialog.Title className="text-xl font-semibold mb-6 text-gray-800">
                🔑 Login to Continue
              </Dialog.Title>
              <p className="text-gray-600 mb-6">
                Please connect your wallet to access premium content across the NanoChai Network.
              </p>
              <DynamicWidget />
            </>
          ) : (
            <>
              <Dialog.Title className="text-xl font-semibold mb-6 text-gray-800">
                🚀 Pay Once, Access Everywhere for Months!
              </Dialog.Title>
              <p className="text-gray-600 mb-6">
                Join thousands of happy readers enjoying premium content across hundreds of partner sites. One payment unlocks months of unlimited access to the entire NanoChai Network!
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside mb-6">
                <li>Access to all NanoChai Network sites</li>
                <li>No Captchas, No ads, No subscriptions, ever</li>
                <li>Completely decentralized.</li>
              </ul>
              <div className="mb-4 text-gray-700">
                {isLoading ? (
                  <p>Loading balance...</p>
                ) : isError ? (
                  <p className="text-red-500">Error loading balance: {error}</p>
                ) : (
                  <p>Your Balance: {tokenBalances?.[0]?.balance || '0'} ETH</p>
                )}
              </div>
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg mb-4"
              >
                {isLoading ? 'Loading...' : 'Continue to Pay $5'}
              </button>
              <DynamicWidget />
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
