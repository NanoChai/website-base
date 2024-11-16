import { client } from "@/viem";

if (!process.env.NEXT_PUBLIC_RESTAKER_ADDRESS) {
  throw new Error("NEXT_PUBLIC_RESTAKER_ADDRESS is not defined");
}

const restakerAddress = process.env
  .NEXT_PUBLIC_RESTAKER_ADDRESS as `0x${string}`;

export const verifySignatures = async ({
  restakerSignature,
  userSignature,
  userAddress,
  messageHash,
}: {
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
