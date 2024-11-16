import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const useSignRequest = () => {
  const { primaryWallet } = useDynamicContext();

  const signRequest = (url: string) => {
    if (!primaryWallet) {
      throw new Error("Primary wallet is not available");
    }
    return primaryWallet.signMessage(JSON.stringify({ url }));
  };

  return { signRequest };
};
