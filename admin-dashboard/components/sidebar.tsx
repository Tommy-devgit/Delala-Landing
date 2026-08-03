"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  CheckSquare,
  Users,
  ShieldCheck,
  MapPin,
  Building,
  Flag,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "OVERVIEW", href: "/", icon: LayoutDashboard },
  { label: "PROPERTIES", href: "/properties", icon: Building2 },
  { label: "PENDING APPROVALS", href: "/approvals", icon: CheckSquare, badge: "12" },
  { label: "USERS", href: "/users", icon: Users },
  { label: "BROKERS", href: "/brokers", icon: ShieldCheck },
  { label: "CITIES", href: "/cities", icon: MapPin },
  { label: "NEIGHBORHOODS", href: "/neighborhoods", icon: Building },
  { label: "REPORTS", href: "/reports", icon: Flag, badge: "3" },
  { label: "VISITS", href: "/visits", icon: Calendar },
  { label: "ANALYTICS", href: "/analytics", icon: BarChart3 },
  { label: "SETTINGS", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#4C061D] text-white flex flex-col justify-between shrink-0 h-screen sticky top-0 shadow-xl">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#630D28] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white text-[#4C061D] flex items-center justify-center font-serif-display font-bold text-xl shadow-md">
            D
          </div>
          <div>
            <div className="font-serif-display font-light text-xl text-white tracking-wide">
              Delala
            </div>
            <div className="text-[10px] font-mono-label tracking-widest text-[#B4C292] font-semibold uppercase">
              ADMIN PLATFORM
            </div>
          </div>
        </div>

        {/* Dense Nav List */}
        <nav className="p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono-label font-bold tracking-wider transition-all ${
                  isActive
                    ? "bg-[#FAF8F4] text-[#4C061D] shadow-md"
                    : "text-[#E6D9D0] hover:bg-[#630D28] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#4C061D]" : "text-[#B4C292]"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? "bg-[#4C061D] text-white"
                        : "bg-[#B4C292] text-[#4C061D]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status */}
      <div className="p-4 border-t border-[#630D28] bg-[#3B0416]">
        <div className="flex items-center justify-between text-[11px] font-mono-label">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B4C292] animate-pulse" />
            <span className="text-[#E6D9D0]">API v1 ACTIVE</span>
          </div>
          <span className="text-[#B4C292] font-bold">100% HEALTH</span>
        </div>
      </div>
    </aside>
  );
}
