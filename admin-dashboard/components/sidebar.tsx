"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  CheckSquare,
  Users,
  MapPin,
  Building,
  Flag,
  Calendar,
  BarChart3,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { useResource } from "@/lib/use-admin";

const NAV_ITEMS = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "Approvals", href: "/approvals", icon: CheckSquare, badge: "pending" as const },
  { label: "Users", href: "/users", icon: Users },
  { label: "Cities", href: "/cities", icon: MapPin },
  { label: "Neighborhoods", href: "/neighborhoods", icon: Building },
  { label: "Reports", href: "/reports", icon: Flag, badge: "reports" as const },
  { label: "Visits", href: "/visits", icon: Calendar },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  // Badges reflect the real queues; they used to be the strings "12" and "3".
  const { data: overview } = useResource(() => adminApi.getOverview(), []);

  const badgeCount = (kind: "pending" | "reports"): number =>
    kind === "pending" ? overview?.metrics.pendingApprovals ?? 0 : overview?.metrics.pendingReports ?? 0;

  return (
    <aside className="w-56 bg-primary text-white flex flex-col shrink-0 h-screen sticky top-0">
      <div className="px-4 h-16 flex items-center gap-2.5 border-b border-white/10">
        <span className="w-8 h-8 rounded-control bg-white/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-accent" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-serif-display text-base leading-tight truncate">Delala Admin</p>
          <p className="text-label text-white/55">Marketplace control</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        <ul className="space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const count = item.badge ? badgeCount(item.badge) : 0;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2.5 px-3 h-9 rounded-control text-micro transition-colors ${
                    isActive
                      ? "bg-white/15 text-white font-semibold"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {count > 0 && (
                    <span className="min-w-5 h-5 px-1.5 rounded-full bg-accent text-primary text-label font-bold flex items-center justify-center tabular">
                      {count}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
