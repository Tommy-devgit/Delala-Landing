"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Heart, Home, Search, User } from "lucide-react";

/**
 * The bottom bar on small screens.
 *
 * Purpose-built rather than a shrunken desktop nav (§27): five destinations, a
 * thumb-sized target for each, and no dropdowns. It carried "Listings", which
 * pointed at the poster's own listings — a screen most visitors have no use for
 * — while Home and Guides, which nearly everyone wants, were unreachable
 * without going through the desktop header.
 */
export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/search", icon: Search },
    { label: "Saved", href: "/favorites", icon: Heart },
    { label: "Guides", href: "/guides", icon: BookOpen },
    { label: "Account", href: "/profile", icon: User },
  ];

  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-canvas/95 backdrop-blur-md border-t border-line px-2 py-2 flex items-center justify-around"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        // Exact match for the home route, prefix for the rest, so a guide
        // article still marks Guides as the section you are in.
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-card transition-colors min-w-14 ${
              isActive ? "text-primary" : "text-muted hover:text-ink"
            }`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            <span className={`text-label ${isActive ? "font-medium" : ""}`}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
