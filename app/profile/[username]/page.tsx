"use client";

import { useState, use } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { creators, type Creator } from "@/lib/data";
import { useWallet } from "@/hooks/useWallet";
import { cn, truncateAddress, formatRON } from "@/lib/utils";
import { 
  Wallet, 
  Send, 
  ExternalLink, 
  Copy, 
  Check, 
  Loader2,
  Heart,
  Sparkles,
  TrendingUp
} from "lucide-react";

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const creator = creators.find((c) => c.username === resolvedParams.username);
  
  const [tipAmount, setTipAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isTipping, setIsTipping] = useState(false);
  const [tipSuccess, setTipSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { 
    address, 
    isConnected, 
    connect, 
    sendTransaction, 
    balance 
  } = useWallet();

  if (!creator) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-24 pb-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Creator Not Found</h1>
            <p className="text-slate-600">This profile doesn&apos;t exist.</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const handleTip = async () => {
    if (!isConnected || !address) {
      await connect();
      return;
    }

    if (!tipAmount || parseFloat(tipAmount) <= 0) {
      return;
    }

    setIsTipping(true);
    try {
      await sendTransaction(creator.roninAddress, tipAmount);
      setTipSuccess(true);
      setTipAmount("");
      setMessage("");
      setTimeout(() => setTipSuccess(false), 3000);
    } catch (error) {
      console.error("Tip failed:", error);
    } finally {
      setIsTipping(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(creator.roninAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert balance from wei to RON
  const balanceRON = balance ? formatRON((parseInt(balance) / 1e18).toString()) : "0";

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            {/* Banner */}
            <div className="h-32 ronin-gradient" />
            
            <div className="px-8 pb-8">
              {/* Avatar */}
              <div className="relative -mt-16 mb-6">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg"
                />
                <span className="absolute bottom-2 right-2 px-3 py-1 bg-ronin text-white text-sm font-medium rounded-full">
                  {creator.category}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">{creator.name}</h1>
                  <p className="text-slate-500">@{creator.username}</p>
                  <p className="text-slate-600 mt-3 max-w-md">{creator.bio}</p>
                  
                  {/* Social Links */}
                  <div className="flex items-center gap-3 mt-4">
                    {creator.socialLinks.twitter && (
                      <a
                        href={`https://twitter.com/${creator.socialLinks.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-slate-500 hover:text-ronin transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span className="text-sm">{creator.socialLinks.twitter}</span>
                      </a>
                    )}
                    {creator.socialLinks.github && (
                      <a
                        href={`https://github.com/${creator.socialLinks.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-slate-500 hover:text-ronin transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="text-sm">{creator.socialLinks.github}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-2">Ronin Address</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono text-slate-700 break-all">
                      {truncateAddress(creator.roninAddress)}
                    </code>
                    <button
                      onClick={copyAddress}
                      className="p-1.5 text-slate-400 hover:text-ronin transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <TrendingUp className="w-5 h-5 text-ronin mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">{formatRON(creator.totalReceived)}</p>
                  <p className="text-sm text-slate-500">Total Received</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <Heart className="w-5 h-5 text-ronin mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">{creator.tipCount}</p>
                  <p className="text-sm text-slate-500">Tips Received</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <Sparkles className="w-5 h-5 text-ronin mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">4.8</p>
                  <p className="text-sm text-slate-500">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tip Form */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Send className="w-6 h-6 text-ronin" />
              Send a Tip
            </h2>

            {!isConnected ? (
              <div className="text-center py-8">
                <Wallet className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 mb-4">Connect your Ronin wallet to send a tip</p>
                <button
                  onClick={connect}
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-all"
                >
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Wallet Info */}
                <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{truncateAddress(address || "")}</p>
                      <p className="text-sm text-slate-500">Connected</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{balanceRON} RON</p>
                    <p className="text-sm text-slate-500">Balance</p>
                  </div>
                </div>

                {/* Tip Amount */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tip Amount (RON)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ronin/20 focus:border-ronin transition-all text-2xl font-semibold"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                      RON
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {[1, 5, 10, 25, 50].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setTipAmount(amount.toString())}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                          tipAmount === amount.toString()
                            ? "bg-ronin text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                      >
                        {amount} RON
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message (optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave a nice message..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ronin/20 focus:border-ronin transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleTip}
                  disabled={isTipping || !tipAmount || parseFloat(tipAmount) <= 0}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-lg transition-all",
                    tipSuccess
                      ? "bg-green-500 text-white"
                      : "bg-ronin hover:bg-ronin-dark text-white",
                    (isTipping || !tipAmount || parseFloat(tipAmount) <= 0) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isTipping ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : tipSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      Tip Sent Successfully!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send {tipAmount || "0"} RON Tip
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}