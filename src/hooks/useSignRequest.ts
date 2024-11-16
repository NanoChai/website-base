import { getPaymentHash } from "@/utils/getPaymentHash";
import { getPaymentRequest } from "@/utils/getPaymentRequest";
import { getRestakerSignature } from "@/utils/getRestakerSignature";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const useSignRequest = () => {
  const { primaryWallet } = useDynamicContext();

  const signRequest = async () => {
    if (!primaryWallet) {
      throw new Error("Primary wallet is not available");
    }
    const paymentRequest = getPaymentRequest();
    const restakerSignature = await getRestakerSignature(paymentRequest);
    const messageHash = getPaymentHash(paymentRequest);
    const userSignature = await primaryWallet.signMessage(messageHash);

    return {
      userSignature,
      restakerSignature,
      messageHash,
      userAddress: primaryWallet.address,
    };
  };

  return { signRequest };
};
