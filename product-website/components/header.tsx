"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/use-session";
import { Avatar } from "@/components/avatar";
import { useUnreadNotifications } from "@/lib/use-notifications";
import {
  Heart,
  User,
  MapPin,
  ShieldCheck,
  Plus,
  Bell,
  Building2,
  CalendarClock,
  HelpCircle,
  Settings,
  ChevronDown,
  Compass,
  LogOut,
} from "lucide-react";

export function Header({ onOpenFilters }: { onOpenFilters?: () => void }) {
  const pathname = usePathname();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const unreadCount = useUnreadNotifications();
  const session = useSession();

  const navLinks = [
    { label: "EXPLORE", href: "/search", icon: Compass },
    { label: "CITIES", href: "/cities", icon: MapPin },
    { label: "SUPPORT", href: "/help", icon: HelpCircle },
  ];

  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300 border-b border-line/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-6">

          {/* LEFT: Brand Logomark */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="font-serif-display font-light text-2xl tracking-tight text-primary group-hover:text-primary-hover transition-colors">
              ደላላ
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
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono-label tracking-wide transition-all ${isActive
                    ? "bg-primary text-white font-bold shadow-xs"
                    : "text-muted hover:text-primary hover:bg-canvas"
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
              href={user ? "/publish" : "/auth/signin?callbackUrl=/publish"}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-primary text-white font-mono-label text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-accent" />
              <span className="hidden sm:inline">List property</span>
              <span className="sm:hidden">List</span>
            </Link>

            {/* Notifications Bell */}
            <Link
              href="/notifications"
              className="p-2.5 rounded-full bg-surface border border-line text-muted hover:text-primary hover:border-primary transition-colors relative"
              aria-label={
                unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"
              }
            >
              <Bell className="w-4 h-4" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>

            {/* Saved Wishlist */}
            <Link
              href="/favorites"
              className={`p-2.5 rounded-full border border-line transition-colors ${pathname === "/favorites"
                ? "bg-primary text-white border-primary"
                : "bg-surface text-muted hover:border-primary"
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
                  className="flex items-center gap-1.5 p-1.5 pl-3 pr-2 rounded-full bg-surface border border-line hover:border-primary transition-all shadow-xs text-ink"
                >
                  <Avatar src={user.avatarUrl} name={user.fullName} size={28} />
                  <ChevronDown className="w-3.5 h-3.5 text-muted" />
                </button>

                {avatarOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface rounded-card border border-line shadow-xl py-2 z-50 text-xs font-sans animate-in fade-in-50">
                    <div className="px-4 py-2.5 border-b border-line flex items-center gap-2.5">
                      <Avatar src={user.avatarUrl} name={user.fullName} size={36} />
                      <div className="min-w-0">
                      <div className="font-bold text-ink truncate">{user.fullName}</div>
                      <div className="text-label text-muted">{user.role} account</div>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setAvatarOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-ink hover:bg-canvas transition-colors font-medium"
                    >
                      <User className="w-4 h-4 text-primary" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      href="/my-listings"
                      onClick={() => setAvatarOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-ink hover:bg-canvas transition-colors font-medium"
                    >
                      <Building2 className="w-4 h-4 text-primary" />
                      <span>My listings</span>
                    </Link>

                    {/* Requesting a viewing notifies the owner; this is where
                        they answer it. Without a route in, the notification
                        led nowhere. */}
                    <Link
                      href="/viewings"
                      onClick={() => setAvatarOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-ink hover:bg-canvas transition-colors font-medium"
                    >
                      <CalendarClock className="w-4 h-4 text-primary" />
                      <span>Viewings</span>
                    </Link>

                    <button
                      onClick={() => {
                        setAvatarOpen(false);
                        authClient.signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors border-t border-line mt-1 text-left font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2.5 rounded-full bg-canvas border border-line text-xs font-mono-label font-bold text-primary hover:bg-line transition-colors"
                >
                  SIGN IN
                </Link>
                <Link
                  href="/auth/signup"
                  className="hidden sm:inline-block px-4 py-2.5 rounded-full bg-accent text-primary text-xs font-mono-label font-bold hover:bg-surface transition-colors"
                >
                  CREATE ACCOUNT
                </Link>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
