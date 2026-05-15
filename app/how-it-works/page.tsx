"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Wallet, Send, UserPlus, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Wallet className="w-8 h-8" />,
    title: "Connect Your Wallet",
    description: "Link your Ronin Wallet or create a new one. We support Ronin Wallet, Metamask, and other EVM-compatible wallets.",
  },
  {
    number: "02",
    icon: <UserPlus className="w-8 h-8" />,
    title: "Create Your Profile",
    description: "Set up your creator profile with your name, bio, and social links. Get your unique Rontip link to share.",
  },
  {
    number: "03",
    icon: <Send className="w-8 h-8" />,
    title: "Receive Tips",
    description: "Share your profile link and start receiving RON tips from your fans and supporters instantly.",
  },
];

const benefits = [
  "Instant transfers with no middleman",
  "100% of your tip goes to the creator",
  "Low transaction fees on Ronin network",
  "No registration or KYC required",
  "Transparent transaction history",
  "Global accessibility",
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              How <span className="ronin-text-gradient">Rontip</span> Works
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Supporting creators and developers has never been easier. 
              Send and receive tips in just a few simple steps.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-ronin/30 transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-6xl font-bold text-ronin/20">{step.number}</span>
                    <div className="w-14 h-14 bg-ronin/10 rounded-2xl flex items-center justify-center text-ronin">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-slate-300 z-10" />
                )}
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Use Rontip?</h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Built on the Ronin blockchain for fast, affordable, and secure transactions
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-ronin flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-ronin/10 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-ronin" />
              <span className="text-sm font-medium text-ronin-dark">Get Started Today</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Ready to support your favorite creators?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/explore"
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 transition-all hover:scale-105"
              >
                Explore Creators
              </a>
              <a
                href="/create-profile"
                className="flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all border-2 border-slate-200 hover:border-ronin"
              >
                Create Your Profile
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}