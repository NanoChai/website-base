import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div>This is the home page</div>
      <div>
        <Link href={"/about"}>About</Link>
        <Link href={"/settings"}>Settings</Link>
      </div>
    </div>
  );
}
