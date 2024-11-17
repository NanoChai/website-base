import { verifySignatures } from "@/utils/verifySignatures";
import { NextRequest, NextResponse } from "next/server";
import { lockedContent } from "./content";

export const OPTIONS = async (request: NextRequest) => {
  const origin = request.headers.get('origin');
  
  const allowedOrigins = [
    'https://website-ai-agent.vercel.app',
    'https://website-base-kappa.vercel.app',
  ];

  const isAllowedOrigin = origin && allowedOrigins.includes(origin);

  const headers = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };

  return new NextResponse(null, { headers, status: 200 });
};

export const POST = async (request: NextRequest) => {
  const origin = request.headers.get('origin');
  
  const allowedOrigins = [
    'https://website-ai-agent.vercel.app',
    'https://website-base-kappa.vercel.app',
  ];

  const isAllowedOrigin = origin && allowedOrigins.includes(origin);

  const headers = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  const body = await request.json();

  const {
    userSignature,
    restakerSignature,
    userAddress,
    messageHash,
    restakerAddress,
    url,
  } = body;

  if (
    !userSignature ||
    !restakerSignature ||
    !userAddress ||
    !messageHash ||
    !restakerAddress ||
    !url
  ) {
    return new NextResponse(
      JSON.stringify({ message: "Payment Required" }), 
      { status: 402, headers }
    );
  }

  let isValid = false;

  try {
    isValid = await verifySignatures(body);
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: "Server Error" }), 
      { status: 500, headers }
    );
  }

  if (!isValid) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid Signature" }), 
      { status: 400, headers }
    );
  }

  const data = lockedContent.data[url as keyof typeof lockedContent.data];

  if (!data) {
    return new NextResponse(
      JSON.stringify({ message: "No content found" }), 
      { status: 404, headers }
    );
  }

  return new NextResponse(
    JSON.stringify({ data }), 
    { headers }
  );
};
