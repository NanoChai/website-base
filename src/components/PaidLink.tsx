"use client";

import { useSignRequest } from "@/hooks/useSignRequest";
import { useRouter } from "next/navigation";

export const PaidLink = () => {
  const { signRequest } = useSignRequest();
  const router = useRouter();

  const handleClick = async () => {
    const url = "/exclusive";
    const signature = await signRequest(url);
    router.push(`/exclusive?paymentSignature=${signature}`);
  };

  return (
    <div>
      <button onClick={handleClick}>Click to see exclusive content</button>
    </div>
  );
};
