"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { creators, categories, type Creator } from "@/lib/data";
import { Search, Filter, Heart, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn, truncateAddress, formatRON } from "@/lib/utils";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCreators = creators.filter((creator) => {
    const matchesCategory = selectedCategory === "All" || creator.category === selectedCategory;
    const matchesSearch = 
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Explore <span className="ronin-text-gradient">Creators</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover and support amazing creators, developers, and artists in the Ronin community
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ronin/20 focus:border-ronin transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all",
                    selectedCategory === category
                      ? "bg-ronin text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Creators Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>

          {filteredCreators.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No creators found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link href={`/profile/${creator.username}`}>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-ronin/30 hover:shadow-lg transition-all hover:-translate-y-1 group">
        {/* Avatar and Category */}
        <div className="flex items-start justify-between mb-4">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-16 h-16 rounded-full bg-slate-100"
          />
          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
            {creator.category}
          </span>
        </div>

        {/* Info */}
        <h3 className="font-semibold text-slate-900 text-lg group-hover:text-ronin transition-colors">
          {creator.name}
        </h3>
        <p className="text-slate-500 text-sm mb-3">@{creator.username}</p>
        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
          {creator.bio}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="text-center">
            <p className="font-semibold text-slate-900">{formatRON(creator.totalReceived)}</p>
            <p className="text-xs text-slate-500">RON received</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-900">{creator.tipCount}</p>
            <p className="text-xs text-slate-500">tips</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-xs text-slate-400">
              {truncateAddress(creator.roninAddress)}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2 mt-4">
          {creator.socialLinks.twitter && (
            <a
              href={`https://twitter.com/${creator.socialLinks.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 text-slate-400 hover:text-ronin transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}
          {creator.socialLinks.github && (
            <a
              href={`https://github.com/${creator.socialLinks.github}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 text-slate-400 hover:text-ronin transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {creator.socialLinks.website && (
            <a
              href={creator.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 text-slate-400 hover:text-ronin transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}