import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WalletProvider } from "@/providers/WalletProvider";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rontip - Tip Your Favorite Creators with RON",
  description: "Support developers, creators, and artists directly with RON tokens on the Ronin blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}