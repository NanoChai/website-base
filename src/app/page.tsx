import { PaidLink } from "@/components/PaidLink";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-6xl font-bold">HOME</div>
      <div className="p-3">
        <PaidLink />
      </div>
    </div>
  );
}
