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
    const restakerResponse = await getRestakerSignature(paymentRequest).then(
      (res) => res.json()
    );
    const {
      signature: restakerSignature,
      nonce,
      restakerAddress,
    } = restakerResponse;
    const messageHash = getPaymentHash({
      ...paymentRequest,
      nonce: BigInt(nonce),
    });
    const userSignature = await primaryWallet.signMessage(messageHash);
    const userAddress = primaryWallet.address;
    return {
      userSignature,
      restakerSignature,
      messageHash,
      userAddress,
      restakerAddress,
    };
  };

  return { signRequest };
};
