"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useWallet } from "@/hooks/useWallet";
import { cn, truncateAddress } from "@/lib/utils";
import { Wallet, User, FileText, Link as LinkIcon, Loader2, Check, Sparkles } from "lucide-react";

export default function CreateProfilePage() {
  const { address, isConnected, connect, balance } = useWallet();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    category: "Developer",
    twitter: "",
    github: "",
    website: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const categories = ["Developer", "Creator", "Educator", "Writer", "Gamer", "Other"];

  const handleSubmit = async () => {
    setIsCreating(true);
    // Simulate profile creation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsCreating(false);
    setCreated(true);
  };

  const balanceRON = balance ? (parseInt(balance) / 1e18).toFixed(4) : "0";

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-lg mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center">
              <div className="w-20 h-20 bg-ronin/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-10 h-10 text-ronin" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Connect Wallet First</h1>
              <p className="text-slate-600 mb-8">
                You need to connect your Ronin wallet to create a profile and receive tips.
              </p>
              <button
                onClick={connect}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all hover:scale-105"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (created) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-lg mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Profile Created!</h1>
              <p className="text-slate-600 mb-2">
                Your profile is now live and ready to receive tips.
              </p>
              <p className="text-sm text-slate-500 mb-8">
                Share your profile link: <code className="bg-slate-100 px-2 py-1 rounded">rontip.com/{formData.username}</code>
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`/profile/${formData.username}`}
                  className="inline-flex items-center justify-center gap-2 bg-ronin text-white px-8 py-4 rounded-full font-semibold hover:bg-ronin-dark transition-all"
                >
                  View Your Profile
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-full font-semibold hover:bg-slate-200 transition-all"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Create Your <span className="ronin-text-gradient">Profile</span>
            </h1>
            <p className="text-slate-600">Set up your creator profile and start receiving tips</p>
          </div>

          {/* Wallet Info */}
          <div className="flex items-center justify-between bg-white rounded-xl p-4 mb-8 border border-slate-100">
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

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <User className="w-4 h-4" />
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ronin/20 focus:border-ronin transition-all"
                />
              </div>

              {/* Username */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <span>@</span>
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "") })}
                  placeholder="yourname"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ronin/20 focus:border-ronin transition-all"
                />
                <p className="text-sm text-slate-500 mt-1">rontip.com/{formData.username || "username"}</p>
              </div>

              {/* Bio */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <FileText className="w-4 h-4" />
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell people about yourself..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ronin/20 focus:border-ronin transition-all resize-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                        formData.category === cat
                          ? "bg-ronin text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
                  <LinkIcon className="w-4 h-4" />
                  Social Links (optional)
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    placeholder="Twitter username"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ronin/20 focus:border-ronin transition-all"
                  />
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="GitHub username"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ronin/20 focus:border-ronin transition-all"
                  />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="Website URL"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ronin/20 focus:border-ronin transition-all"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isCreating || !formData.name || !formData.username || !formData.bio}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-lg transition-all",
                  "bg-ronin hover:bg-ronin-dark text-white",
                  (isCreating || !formData.name || !formData.username || !formData.bio) && "opacity-50 cursor-not-allowed"
                )}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Create Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}