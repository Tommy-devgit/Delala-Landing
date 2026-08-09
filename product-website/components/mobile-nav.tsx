"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Building2, User } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Search", href: "/search", icon: Search },
    { label: "Saved", href: "/favorites", icon: Heart },
    { label: "Listings", href: "/my-listings", icon: Building2 },
    { label: "Account", href: "/profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-canvas/95 backdrop-blur-md border-t border-line px-4 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 rounded-card transition-colors ${
              isActive ? "text-primary font-bold" : "text-muted hover:text-ink"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted"}`} />
            <span className="text-label font-mono-label">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
