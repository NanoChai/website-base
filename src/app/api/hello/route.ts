import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const headersList = headers();
  const signature = headersList.get("payment-signature");

  if (!signature) {
    return NextResponse.json({ message: "Payment Required" }, { status: 402 });
  }

  // Check the signature
  const isValid = true;

  if (!isValid) {
    return NextResponse.json({ message: "Invalid Signature" }, { status: 400 });
  }

  return NextResponse.json({ message: "Payment Received" });
};
