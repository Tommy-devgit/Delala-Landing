"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  User,
  MapPin,
  ShieldCheck,
  Plus,
  MessageSquare,
  Bell,
  Building2,
  HelpCircle,
  Settings,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { SearchBarCapsule } from "./search-bar-capsule";

export function Header({ onOpenFilters }: { onOpenFilters?: () => void }) {
  const pathname = usePathname();
  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* LEFT: Brand Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <span className="font-serif-display font-light text-2xl tracking-tight text-[#4C061D] group-hover:text-[#3B3923] transition-colors">
              DELALA
            </span>
            <span className="font-mono-label text-[9px] text-[#4C061D] bg-[#B4C292]/30 border border-[#B4C292]/50 px-2 py-0.5 rounded-full font-bold">
              MARKETPLACE
            </span>
          </Link>

          {/* CENTER: Floating Search Bar Capsule */}
          <div className="hidden md:block flex-1 max-w-xl px-4">
            <SearchBarCapsule onOpenFilters={onOpenFilters} />
          </div>

          {/* RIGHT: Quick Utility Nav */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* List Property CTA Button */}
            <Link
              href="/publish"
              className="hidden xl:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#B4C292]" />
              <span>LIST PROPERTY</span>
            </Link>

            <Link
              href="/cities"
              className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono-label transition-colors ${
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
              className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono-label transition-colors ${
                pathname.startsWith("/brokers")
                  ? "bg-[#4C061D] text-white font-bold"
                  : "text-[#736F4E] hover:text-[#4C061D] hover:bg-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B4C292]" />
              <span>BROKERS</span>
            </Link>

            {/* Notifications Bell */}
            <Link
              href="/notifications"
              className="p-2 rounded-full bg-white border border-[#ECE7DA] text-[#736F4E] hover:text-[#4C061D] hover:border-[#4C061D] transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#4C061D]" />
            </Link>

            {/* Messages Chat Icon */}
            <Link
              href="/messages"
              className="p-2 rounded-full bg-white border border-[#ECE7DA] text-[#736F4E] hover:text-[#4C061D] hover:border-[#4C061D] transition-colors"
              title="Messages"
            >
              <MessageSquare className="w-4 h-4" />
            </Link>

            {/* Saved Wishlist */}
            <Link
              href="/favorites"
              className={`p-2 rounded-full border border-[#ECE7DA] transition-colors ${
                pathname === "/favorites"
                  ? "bg-[#4C061D] text-white border-[#4C061D]"
                  : "bg-white text-[#736F4E] hover:border-[#4C061D]"
              }`}
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </Link>

            {/* Avatar Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="flex items-center gap-1.5 p-1.5 pl-3 pr-2.5 rounded-full bg-white border border-[#ECE7DA] hover:border-[#4C061D] transition-all shadow-xs text-[#1C1B12]"
              >
                <div className="w-6 h-6 rounded-full bg-[#4C061D] text-white flex items-center justify-center text-[10px] font-bold">
                  ST
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#736F4E]" />
              </button>

              {avatarOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-[#ECE7DA] shadow-xl py-2 z-50 text-xs font-sans">
                  <div className="px-4 py-2 border-b border-[#ECE7DA]">
                    <div className="font-bold text-[#1C1B12]">Selam Tesfaye</div>
                    <div className="text-[10px] font-mono-label text-[#736F4E]">Verified Home Seeker</div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setAvatarOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[#1C1B12] hover:bg-[#FAF8F4] transition-colors"
                  >
                    <User className="w-4 h-4 text-[#4C061D]" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/my-listings"
                    onClick={() => setAvatarOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[#1C1B12] hover:bg-[#FAF8F4] transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-[#4C061D]" />
                    <span>My Listings</span>
                  </Link>

                  <a
                    href="http://localhost:3001"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setAvatarOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[#1C1B12] hover:bg-[#FAF8F4] transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#4C061D]" />
                    <span>Admin Dashboard</span>
                  </a>

                  <Link
                    href="/help"
                    onClick={() => setAvatarOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[#1C1B12] hover:bg-[#FAF8F4] transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-[#736F4E]" />
                    <span>Help & Support</span>
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setAvatarOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[#1C1B12] hover:bg-[#FAF8F4] transition-colors border-t border-[#ECE7DA]"
                  >
                    <Settings className="w-4 h-4 text-[#736F4E]" />
                    <span>Settings</span>
                  </Link>
                </div>
              )}
            </div>

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
