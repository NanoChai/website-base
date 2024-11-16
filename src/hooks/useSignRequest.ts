import { getPaymentHash } from "@/utils/getPaymentHash";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const useSignRequest = () => {
  const { primaryWallet } = useDynamicContext();

  const signRequest = () => {
    if (!primaryWallet) {
      throw new Error("Primary wallet is not available");
    }
    const hash = getPaymentHash();
    return primaryWallet.signMessage(hash);
  };

  return { signRequest };
};
