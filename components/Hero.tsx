"use client";

import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ronin/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-ronin/10 px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-ronin" />
            <span className="text-sm font-medium text-ronin-dark">
              Built on Ronin Blockchain
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6 animate-slide-up">
            Support Your Favorite
            <span className="block ronin-text-gradient">Creators & Developers</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Send tips directly to developers, creators, and artists using RON tokens. 
            No middleman, no fees, just direct support.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link
              href="/explore"
              className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 transition-all hover:scale-105 shadow-xl"
            >
              Explore Creators
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/create-profile"
              className="flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all border-2 border-slate-200 hover:border-ronin shadow-lg"
            >
              Create Your Profile
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900">10K+</div>
              <div className="text-sm text-slate-500 mt-1">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900">50K+</div>
              <div className="text-sm text-slate-500 mt-1">Tips Sent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900">100K+</div>
              <div className="text-sm text-slate-500 mt-1">RON Volume</div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-24 grid md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Zap className="w-6 h-6" />}
            title="Instant Transfers"
            description="Send and receive tips instantly with RON tokens on the Ronin network"
          />
          <FeatureCard 
            icon={<Users className="w-6 h-6" />}
            title="Direct Support"
            description="100% of your tip goes directly to the creator with no platform fees"
          />
          <FeatureCard 
            icon={<Sparkles className="w-6 h-6" />}
            title="Easy Profile"
            description="Create your profile in seconds and start receiving tips from day one"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:border-ronin/30 transition-all hover:-translate-y-1">
      <div className="w-12 h-12 bg-ronin/10 rounded-xl flex items-center justify-center text-ronin mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
}