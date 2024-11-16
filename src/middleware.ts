import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const paymentSignature = request.nextUrl.searchParams.get("paymentSignature");
  if (paymentSignature) {
    requestHeaders.set("payment-signature", paymentSignature);
  }
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
