import { client } from "@/viem";

export const verifySignatures = async ({
  restakerAddress,
  restakerSignature,
  userSignature,
  userAddress,
  messageHash,
}: {
  restakerAddress: `0x${string}`;
  restakerSignature: `0x${string}`;
  userSignature: `0x${string}`;
  userAddress: `0x${string}`;
  messageHash: `0x${string}`;
}) => {
  const isRestakerSignatureValid = await client.verifyMessage({
    address: restakerAddress,
    message: messageHash,
    signature: restakerSignature,
  });

  if (!isRestakerSignatureValid) {
    console.log("Restaker signature is invalid");
    return false;
  }

  const isUserSignatureValid = await client.verifyMessage({
    address: userAddress,
    message: messageHash,
    signature: userSignature,
  });

  if (!isUserSignatureValid) {
    console.log("User signature is invalid");
    return false;
  }

  return true;
};
