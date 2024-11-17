import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WalletProvider } from "@/provider/WalletProvider";
import { NavBar } from "@/components/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const chomsky = localFont({
  src: "./fonts/Chomsky.otf",
  variable: "--font-chomsky",
});

export const metadata: Metadata = {
  title: "The Woofington Post",
  description: "The Woofington Post",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${chomsky.variable} antialiased`}
      >
        <WalletProvider>
          <NavBar />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
