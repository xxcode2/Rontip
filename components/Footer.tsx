"use client";

import Link from "next/link";
import { Github, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 ronin-gradient rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-2xl font-bold">Rontip</span>
            </Link>
            <p className="text-slate-400 max-w-md">
              The easiest way to support your favorite creators, developers, and artists 
              using RON tokens on the Ronin blockchain.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-ronin transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-slate-400 hover:text-ronin transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-slate-400 hover:text-ronin transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/create-profile" className="text-slate-400 hover:text-ronin transition-colors">
                  Create Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-ronin transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-ronin transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-ronin transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-ronin transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 Rontip. Built on Ronin Blockchain.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-ronin transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-ronin transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-ronin transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}