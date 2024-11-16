"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { baseSepolia } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

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

export const WalletProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};
