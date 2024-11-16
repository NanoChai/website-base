import { RESTAKER_PAYMENT_HEADER, USER_PAYMENT_HEADER } from "@/constants";
import { verifySignatures } from "@/utils/verifySignatures";
import { headers } from "next/headers";

export default function ExclusivePage() {
  const headersList = headers();
  const userSignature = headersList.get(USER_PAYMENT_HEADER);
  const restakerSignature = headersList.get(RESTAKER_PAYMENT_HEADER);

  if (!userSignature || !restakerSignature) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-6xl font-bold">Payment Required</div>
      </div>
    );
  }

  const isVerified = verifySignatures({ userSignature, restakerSignature });

  if (!isVerified) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-6xl font-bold">Payment Verification Failed</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-6xl font-bold">This is exclusive content!</div>
    </div>
  );
}
