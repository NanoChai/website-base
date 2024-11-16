import { getPaymentHash } from "@/utils/getPaymentHash";
import { getPaymentRequest } from "@/utils/getPaymentRequest";
import { getRestakerSignature } from "@/utils/getRestakerSignature";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const useSignRequest = () => {
  const { primaryWallet } = useDynamicContext();

  const signRequest = async () => {
    if (!primaryWallet?.address) {
      throw new Error("Primary wallet is not available");
    }
    const paymentRequest = getPaymentRequest();
    const restakerResponse = await getRestakerSignature(
      paymentRequest,
      primaryWallet.address
    )
      .then((res) => res.json())
      .then(({ data }) => data);

    const {
      signature: restakerSignature,
      nonce,
      restakerAddress,
      status,
    } = restakerResponse;

    if (status !== "success") {
      console.log(restakerResponse);
      throw new Error("Restaker request failed");
    }
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
