"use client";

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { baseSepolia } from "viem/chains";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useState, createContext, useContext } from "react";
import { PayPopup } from "@/components/PayPopup";

if (!process.env.NEXT_PUBLIC_DYNAMIC_ID) {
  throw new Error("NEXT_PUBLIC_DYNAMIC_ID is not set");
}

const environmentId = process.env.NEXT_PUBLIC_DYNAMIC_ID;

const config = createConfig({
  chains: [baseSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [baseSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

interface PayPopupContextType {
  openPayPopup: () => void;
  closePayPopup: () => void;
  isPayPopupOpen: boolean;
}

const PayPopupContext = createContext<PayPopupContextType | undefined>(
  undefined
);

export const WalletProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isPayPopupOpen, setIsPayPopupOpen] = useState(false);

  const payPopupValue = {
    openPayPopup: () => setIsPayPopupOpen(true),
    closePayPopup: () => setIsPayPopupOpen(false),
    isPayPopupOpen,
  };

  return (
    <DynamicContextProvider
      settings={{
        environmentId,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <PayPopupContext.Provider value={payPopupValue}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              {children}
              <PayPopup
                isOpen={isPayPopupOpen}
                onClose={() => setIsPayPopupOpen(false)}
              />
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </PayPopupContext.Provider>
    </DynamicContextProvider>
  );
};

export const usePayPopup = () => {
  const context = useContext(PayPopupContext);
  if (!context) {
    throw new Error("usePayPopup must be used within a WalletProvider");
  }
  return context;
};
