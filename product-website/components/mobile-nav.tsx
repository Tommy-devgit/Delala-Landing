"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Building2, MessageSquare, User } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Search", href: "/search", icon: Search },
    { label: "Saved", href: "/favorites", icon: Heart },
    { label: "Listings", href: "/my-listings", icon: Building2 },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Account", href: "/profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF8F4]/95 backdrop-blur-md border-t border-[#ECE7DA] px-4 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-colors ${
              isActive ? "text-[#4C061D] font-bold" : "text-[#736F4E] hover:text-[#1C1B12]"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-[#4C061D]" : "text-[#736F4E]"}`} />
            <span className="text-[10px] font-mono-label">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
