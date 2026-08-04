"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient, UserSession } from "@/lib/auth-client";
import { AuthModal } from "@/components/auth-modal";
import {
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
  Compass,
  UserCheck,
  LogOut,
} from "lucide-react";

export function Header({ onOpenFilters }: { onOpenFilters?: () => void }) {
  const pathname = usePathname();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [session, setSession] = useState<{ user: UserSession; token: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    function loadSession() {
      const activeSession = authClient.getSession();
      setSession(activeSession);
    }
    loadSession();

    window.addEventListener("delala_auth_change", loadSession);
    return () => window.removeEventListener("delala_auth_change", loadSession);
  }, []);

  const navLinks = [
    { label: "EXPLORE HOMES", href: "/search", icon: Compass },
    { label: "CITIES", href: "/cities", icon: MapPin },
    { label: "VERIFIED BROKERS", href: "/brokers", icon: ShieldCheck },
    { label: "HELP & SUPPORT", href: "/help", icon: HelpCircle },
  ];

  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300 border-b border-[#ECE7DA]/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          
          {/* LEFT: Brand Logomark */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="font-serif-display font-light text-2xl tracking-tight text-[#4C061D] group-hover:text-[#3B3923] transition-colors">
              DELALA
            </span>
            <span className="font-mono-label text-[9px] text-[#4C061D] bg-[#B4C292]/30 border border-[#B4C292]/50 px-2.5 py-0.5 rounded-full font-bold">
              MARKETPLACE
            </span>
          </Link>

          {/* CENTER: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono-label tracking-wide transition-all ${
                    isActive
                      ? "bg-[#4C061D] text-white font-bold shadow-xs"
                      : "text-[#736F4E] hover:text-[#4C061D] hover:bg-[#FAF8F4]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: List Property Button & Utility Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* List Property CTA Button */}
            <Link
              href="/publish"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-[#B4C292]" />
              <span className="hidden sm:inline">LIST PROPERTY</span>
              <span className="sm:hidden">LIST</span>
            </Link>

            {/* Notifications Bell */}
            <Link
              href="/notifications"
              className="p-2.5 rounded-full bg-white border border-[#ECE7DA] text-[#736F4E] hover:text-[#4C061D] hover:border-[#4C061D] transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </Link>

            {/* Messages Chat Icon */}
            <Link
              href="/messages"
              className="p-2.5 rounded-full bg-white border border-[#ECE7DA] text-[#736F4E] hover:text-[#4C061D] hover:border-[#4C061D] transition-colors"
              title="Messages"
            >
              <MessageSquare className="w-4 h-4" />
            </Link>

            {/* Saved Wishlist */}
            <Link
              href="/favorites"
              className={`p-2.5 rounded-full border border-[#ECE7DA] transition-colors ${
                pathname === "/favorites"
                  ? "bg-[#4C061D] text-white border-[#4C061D]"
                  : "bg-white text-[#736F4E] hover:border-[#4C061D]"
              }`}
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </Link>

            {/* User Avatar / Auth Gateway Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setAvatarOpen(!avatarOpen)}
                  className="flex items-center gap-1.5 p-1.5 pl-3 pr-2 rounded-full bg-white border border-[#ECE7DA] hover:border-[#4C061D] transition-all shadow-xs text-[#1C1B12]"
                >
                  <div className="w-7 h-7 rounded-full bg-[#4C061D] text-white flex items-center justify-center text-[10px] font-bold">
                    {user.fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#736F4E]" />
                </button>

                {avatarOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-[#ECE7DA] shadow-xl py-2 z-50 text-xs font-sans animate-in fade-in-50">
                    <div className="px-4 py-2.5 border-b border-[#ECE7DA]">
                      <div className="font-bold text-[#1C1B12]">{user.fullName}</div>
                      <div className="text-[10px] font-mono-label text-[#736F4E] uppercase">{user.role} ACCOUNT</div>
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

                    <button
                      onClick={() => {
                        setAvatarOpen(false);
                        setIsAuthModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[#1C1B12] hover:bg-[#FAF8F4] transition-colors text-left"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <span>Switch Persona</span>
                    </button>

                    <button
                      onClick={() => {
                        setAvatarOpen(false);
                        authClient.signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors border-t border-[#ECE7DA] mt-1 text-left font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2.5 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label font-bold text-[#4C061D] hover:bg-[#ECE7DA] transition-colors"
              >
                SIGN IN / PERSONA
              </button>
            )}

          </div>

        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(u) => setSession({ user: u, token: "active" })}
      />
    </header>
  );
}
