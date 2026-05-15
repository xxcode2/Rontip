"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wallet, Menu, X, ChevronDown } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { cn, truncateAddress } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { address, isConnected, connect, disconnect } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 ronin-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">Rontip</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-ronin transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="text-slate-600 hover:text-ronin transition-colors font-medium"
            >
              Explore
            </Link>
            <Link
              href="/how-it-works"
              className="text-slate-600 hover:text-ronin transition-colors font-medium"
            >
              How it Works
            </Link>
          </nav>

          {/* Wallet Button */}
          <div className="hidden md:block">
            {isConnected ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium text-slate-700">
                    {truncateAddress(address || "")}
                  </span>
                </div>
                <button
                  onClick={disconnect}
                  className="text-slate-500 hover:text-red-500 transition-colors text-sm font-medium"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-all hover:scale-105 shadow-lg"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-slate-600 hover:text-ronin transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="text-slate-600 hover:text-ronin transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/how-it-works"
                className="text-slate-600 hover:text-ronin transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </Link>
              <div className="pt-2">
                {isConnected ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 bg-slate-100 px-4 py-3 rounded-xl">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="font-medium text-slate-700">
                        {truncateAddress(address || "")}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        disconnect();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-red-500 font-medium py-2"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      connect();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl font-medium w-full"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}