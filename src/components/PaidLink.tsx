"use client";

import { useSignRequest } from "@/hooks/useSignRequest";
import { useRouter } from "next/navigation";

export const PaidLink = () => {
  const { signRequest } = useSignRequest();
  const router = useRouter();

  const handleClick = async () => {
    const signatures = await signRequest();
    const { userSignature, restakerSignature } = signatures;
    router.push(
      `/exclusive?userSignature=${userSignature}&restakerSignature=${restakerSignature}`
    );
  };

  return (
    <div>
      <button onClick={handleClick}>Click to see exclusive content</button>
    </div>
  );
};
