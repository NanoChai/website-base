"use client";

import { useSignRequest } from "@/hooks/useSignRequest";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type SignedRequest = {
  userSignature: string | undefined;
  restakerSignature: string;
  messageHash: `0x${string}`;
  userAddress: `0x${string}`;
  restakerAddress: `0x${string}`;
};

interface PaidLinkProps {
  articleId: string;
  children: React.ReactNode;
}

export function PaidLink({ articleId, children }: PaidLinkProps) {
  const { signRequest } = useSignRequest();
  const [content, setContent] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { primaryWallet } = useDynamicContext();
  const [signedRequest, setSignedRequest] = useState<SignedRequest | null>(
    null
  );

  useEffect(() => {
    const preSignRequest = async () => {
      console.log("Pre-signing request...");
      if (primaryWallet?.address) {
        try {
          const isConnected = await primaryWallet.isConnected();
          console.log("isConnected", isConnected);
          const request = await signRequest();
          setSignedRequest(request);
        } catch (error) {
          console.error("Failed to pre-sign request:", error);
        }
      }
    };

    preSignRequest();
  }, [primaryWallet?.address]);

  console.log("signedRequest", signedRequest);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching content...", signedRequest);
      const request = await signRequest();
      if (!request) {
        console.error("Failed to sign request");
        return;
      }

      const contentRequest = await fetch("/api/paywall", {
        method: "POST",
        body: JSON.stringify({ ...request, url: articleId }),
      });
      const contentResponse = await contentRequest.json();

      if (contentResponse.data) {
        setContent(contentResponse.data.content);
      } else {
        console.error("Failed to unlock content");
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (!primaryWallet?.address) {
    return (
      <div>
        {children}
        <div className="mt-4 px-4 py-2 text-gray-600 italic">
          Login to see exclusive content
        </div>
      </div>
    );
  }

  return (
    <div>
      {content ? (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
          <p className="text-black">{content}</p>
        </div>
      ) : (
        <div>
          {children}
          <button
            onClick={handleClick}
            disabled={!signedRequest}
            className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 
              text-white rounded-lg font-medium
              hover:from-purple-700 hover:to-blue-700 
              transform hover:scale-105 transition-all duration-200
              shadow-lg hover:shadow-xl
              relative overflow-hidden
              before:absolute before:inset-0
              before:bg-gradient-to-r before:from-white/20 before:to-transparent
              before:translate-x-[-100%] before:hover:translate-x-[100%]
              before:transition-transform before:duration-700
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative inline-flex items-center">
              {!signedRequest ? "Preparing..." : "✨ Read Full Article ✨"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
