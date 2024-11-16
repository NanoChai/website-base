import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RESTAKER_PAYMENT_HEADER, USER_PAYMENT_HEADER } from "./constants";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const userSignature = request.nextUrl.searchParams.get("userSignature");
  const restakerSignature =
    request.nextUrl.searchParams.get("restakerSignature");
  if (userSignature && restakerSignature) {
    requestHeaders.set(USER_PAYMENT_HEADER, userSignature);
    requestHeaders.set(RESTAKER_PAYMENT_HEADER, userSignature);
  }
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
