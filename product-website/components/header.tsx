"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, User, SlidersHorizontal, MapPin, Building2, ShieldCheck, Home } from "lucide-react";
import { SearchBarCapsule } from "./search-bar-capsule";

export function Header({ onOpenFilters }: { onOpenFilters?: () => void }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* LEFT: Brand Logo (Quiet Product Identity) */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <span className="font-serif-display font-light text-2xl tracking-tight text-[#4C061D] group-hover:text-[#3B3923] transition-colors">
              DELALA
            </span>
            <span className="font-mono-label text-[9px] text-[#4C061D] bg-[#B4C292]/30 border border-[#B4C292]/50 px-2 py-0.5 rounded-full font-bold">
              MARKETPLACE
            </span>
          </Link>

          {/* CENTER: Floating Search Bar Capsule (Quiet Marketplace Hero) */}
          <div className="hidden md:block flex-1 max-w-2xl px-4">
            <SearchBarCapsule onOpenFilters={onOpenFilters} />
          </div>

          {/* RIGHT: Quick Utility Nav (Favorites, Cities, Brokers, Profile) */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/search"
              className="p-2.5 rounded-full bg-white border border-[#ECE7DA] text-[#2D2D2D] hover:border-[#4C061D] hover:text-[#4C061D] transition-colors md:hidden"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Link
              href="/cities"
              className={`hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono-label transition-colors ${
                pathname.startsWith("/cities")
                  ? "bg-[#4C061D] text-white font-bold"
                  : "text-[#736F4E] hover:text-[#4C061D] hover:bg-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>CITIES</span>
            </Link>

            <Link
              href="/brokers"
              className={`hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono-label transition-colors ${
                pathname.startsWith("/brokers")
                  ? "bg-[#4C061D] text-white font-bold"
                  : "text-[#736F4E] hover:text-[#4C061D] hover:bg-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B4C292]" />
              <span>VERIFIED BROKERS</span>
            </Link>

            <Link
              href="/favorites"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono-label transition-colors border border-[#ECE7DA] ${
                pathname === "/favorites"
                  ? "bg-[#4C061D] text-white border-[#4C061D]"
                  : "bg-white text-[#2D2D2D] hover:border-[#4C061D]"
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span className="hidden sm:inline">SAVED</span>
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-2 p-1.5 pl-3 pr-2.5 rounded-full bg-white border border-[#ECE7DA] hover:border-[#4C061D] transition-all shadow-xs text-[#2D2D2D]"
            >
              <User className="w-4 h-4 text-[#4C061D]" />
              <span className="text-xs font-bold hidden sm:inline">Account</span>
            </Link>
          </div>

        </div>

        {/* Mobile Search Capsule Bar */}
        <div className="pb-3 md:hidden">
          <SearchBarCapsule onOpenFilters={onOpenFilters} compact />
        </div>
      </div>
    </header>
  );
}
