"use client";

import { useSignRequest } from "@/hooks/useSignRequest";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const PaidLink = () => {
  const { signRequest } = useSignRequest();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const signedRequest = await signRequest();
    const url = "test";
    const contentRequest = await fetch("/api/paywall", {
      method: "POST",
      body: JSON.stringify({ ...signedRequest, url }),
    });
    const contentResponse = await contentRequest.json();
    setContent(contentResponse);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader2 className="animate-spin mr-2" />;
  }

  return (
    <div>
      {content ? (
        <>{JSON.stringify(content)}</>
      ) : (
        <button onClick={handleClick}>Click to see exclusive content</button>
      )}
    </div>
  );
};
