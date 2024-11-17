import { verifySignatures } from "@/utils/verifySignatures";
import { NextRequest, NextResponse } from "next/server";
import { lockedContent } from "./content";

export const POST = async (request: NextRequest) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers, status: 200 });
  }

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
