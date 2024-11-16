import { verifySignatures } from "@/utils/verifySignatures";
import { NextRequest, NextResponse } from "next/server";
import { lockedContent } from "./content";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const {
    userSignature,
    restakerSignature,
    userAddress,
    messageHash,
    restakerAddress,
    url,
  } = body;
  console.log(body);
  if (
    !userSignature ||
    !restakerSignature ||
    !userAddress ||
    !messageHash ||
    !restakerAddress ||
    !url
  ) {
    return NextResponse.json({ message: "Payment Required" }, { status: 402 });
  }

  // Check the signature
  let isValid = false;

  try {
    isValid = await verifySignatures(body);
  } catch (e) {
    console.log(e);
  }

  if (!isValid) {
    return NextResponse.json({ message: "Invalid Signature" }, { status: 400 });
  }

  const data = lockedContent.data[url as keyof typeof lockedContent.data];

  if (!data) {
    return NextResponse.json({ message: "No content found" }, { status: 404 });
  }

  return NextResponse.json({ data });
};
