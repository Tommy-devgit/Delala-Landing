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
  ShieldAlert,
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
    <aside className="w-64 bg-[#1E293B] border-r border-[#334155] flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-[#334155] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#4C061D] flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <div>
            <div className="font-bold text-sm text-[#F8FAFC] tracking-tight">
              DELALA ADMIN
            </div>
            <div className="text-[10px] font-mono text-[#94A3B8]">
              PLATFORM INFRASTRUCTURE
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
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
                  isActive
                    ? "bg-[#4C061D] text-white"
                    : "text-[#94A3B8] hover:bg-[#334155]/50 hover:text-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#B4C292]" : "text-[#94A3B8]"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? "bg-[#B4C292] text-[#4C061D]" : "bg-[#4C061D] text-white"
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
      <div className="p-4 border-t border-[#334155] bg-[#0F172A]">
        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[#94A3B8]">API v1 ACTIVE</span>
          </div>
          <span className="font-mono text-emerald-400 font-bold">100% HEALTH</span>
        </div>
      </div>
    </aside>
  );
}
