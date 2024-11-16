import { headers } from "next/headers";

export default function ExclusivePage() {
  const headersList = headers();
  const signature = headersList.get("payment-signature");

  if (!signature) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-6xl font-bold">Payment Required</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-6xl font-bold">This is exclusive content!</div>
    </div>
  );
}
