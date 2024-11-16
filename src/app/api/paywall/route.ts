import { verifySignatures } from "@/utils/verifySignatures";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { userSignature, restakerSignature, userAddress, messageHash } = body;

  if (!userSignature || !restakerSignature || !userAddress || !messageHash) {
    return NextResponse.json({ message: "Payment Required" }, { status: 402 });
  }

  // Check the signature
  const isValid = await verifySignatures(body);

  if (!isValid) {
    return NextResponse.json({ message: "Invalid Signature" }, { status: 400 });
  }

  console.log("User wants content for url", body.url);

  return NextResponse.json({ message: "Content unlocked", url: body.url });
};
