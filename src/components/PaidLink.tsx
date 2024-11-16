"use client";

import { useSignRequest } from "@/hooks/useSignRequest";
import { useState } from "react";

export const PaidLink = () => {
  const { signRequest } = useSignRequest();
  const [content, setContent] = useState();

  const handleClick = async () => {
    const signedRequest = await signRequest();
    const url = "/cool-content";
    const contentRequest = await fetch("/api/paywall", {
      method: "POST",
      body: JSON.stringify({ ...signedRequest, url }),
    });
    const contentResponse = await contentRequest.json();
    setContent(contentResponse);
  };

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
