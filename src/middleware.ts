import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const paymentSignature = request.nextUrl.searchParams.get("paymentSignature");

  // console.log(request);

  if (paymentSignature) {
    requestHeaders.set("payment-signature", paymentSignature);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // // Set a new response header `x-hello-from-middleware2`
  // response.headers.set("payment-signature", "hello");
  return response;
}
