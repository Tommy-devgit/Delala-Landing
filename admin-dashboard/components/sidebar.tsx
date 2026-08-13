"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building,
  Building2,
  Calendar,
  CheckSquare,
  Flag,
  LayoutDashboard,
  MapPin,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { useResource } from "@/lib/use-admin";

/**
 * Grouped by the job being done rather than by table (§31).
 *
 * An operator arrives with an intent — moderate the queue, look something up,
 * check the numbers — and a flat list of ten tables makes them scan for the
 * right one every time. Every entry points at a route that exists; nothing is
 * listed that has no screen behind it.
 */
const NAV_GROUPS: {
  label: string;
  items: { label: string; href: string; icon: typeof LayoutDashboard; badge?: "pending" | "reports" }[];
}[] = [
  {
    label: "",
    items: [{ label: "Overview", href: "/", icon: LayoutDashboard }],
  },
  {
    label: "Moderation",
    items: [
      { label: "Approvals", href: "/approvals", icon: CheckSquare, badge: "pending" },
      { label: "Reports", href: "/reports", icon: Flag, badge: "reports" },
      // No separate "Verification" entry: granting a badge happens on the Users
      // screen, and a second label pointing at the same route is just a longer
      // menu with nothing extra behind it.
    ],
  },
  {
    label: "Marketplace",
    items: [
      { label: "Properties", href: "/properties", icon: Building2 },
      { label: "Users", href: "/users", icon: Users },
      { label: "Brokers", href: "/brokers", icon: ShieldCheck },
      { label: "Viewings", href: "/visits", icon: Calendar },
    ],
  },
  {
    label: "Locations",
    items: [
      { label: "Cities", href: "/cities", icon: MapPin },
      { label: "Neighborhoods", href: "/neighborhoods", icon: Building },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

const STORAGE_KEY = "delala_admin_sidebar_collapsed";

/**
 * The admin sidebar, collapsible to icons.
 *
 * Collapsed state persists per device, because it is a working preference: an
 * operator who wants the width back for a wide table wants it back on every
 * screen, not just the one they were on.
 *
 * Tooltips only exist while collapsed — they are the label, and showing them
 * next to a visible label would be noise. They are CSS-only (`group-hover`
 * plus `group-focus-visible`) rather than JavaScript, so keyboard focus
 * surfaces them too and there is no positioning library involved.
 */
export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { data: overview } = useResource(() => adminApi.getOverview(), []);

  // Read after mount: touching localStorage during render would produce markup
  // the server never generated.
  useEffect(() => {
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (cancelled) return;
      try {
        setCollapsed(window.localStorage.getItem(STORAGE_KEY) === "true");
      } catch {
        // Private mode. The default expanded state is fine.
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = () => {
    setCollapsed((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // Preference simply does not persist.
      }
      return next;
    });
  };

  // Badges reflect the real queues; they used to be the strings "12" and "3".
  const badgeCount = (kind: "pending" | "reports"): number =>
    kind === "pending" ? overview?.metrics.pendingApprovals ?? 0 : overview?.metrics.pendingReports ?? 0;

  return (
    <aside
      className={`bg-primary text-white flex flex-col shrink-0 h-screen sticky top-0 transition-[width] duration-300 ease-out ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div
        className={`h-16 flex items-center border-b border-white/10 shrink-0 ${
          collapsed ? "justify-center px-2" : "gap-2.5 px-4"
        }`}
      >
        <span className="w-8 h-8 rounded-control bg-white/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-accent" aria-hidden="true" />
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-serif-display text-base leading-tight truncate">Delala Admin</p>
            <p className="text-label text-white/55">Marketplace control</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3" aria-label="Admin sections">
        {NAV_GROUPS.map((group, groupIndex) => (
          <div key={group.label || `group-${groupIndex}`} className="mb-3 last:mb-0">
            {group.label &&
              (collapsed ? (
                // A rule stands in for the heading, so the grouping survives
                // the collapse without a label that would not fit.
                <div className="mx-3 my-2 border-t border-white/10" aria-hidden="true" />
              ) : (
                <p className="px-5 mb-1 text-label text-white/40">{group.label}</p>
              ))}

            <ul className="space-y-0.5 px-2">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const count = item.badge ? badgeCount(item.badge) : 0;

                return (
                  <li key={`${group.label}-${item.href}-${item.label}`} className="relative group">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center h-9 rounded-control text-micro transition-colors ${
                        collapsed ? "justify-center px-0" : "gap-2.5 px-3"
                      } ${
                        isActive
                          ? "bg-white/15 text-white font-semibold"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="relative shrink-0">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        {/* Collapsed, the count has nowhere to sit inline, so it
                            becomes a dot on the icon — still visible, no width. */}
                        {collapsed && count > 0 && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent" />
                        )}
                      </span>

                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {count > 0 && (
                            <span className="min-w-5 h-5 px-1.5 rounded-full bg-accent text-primary text-label font-bold flex items-center justify-center tabular">
                              {count}
                            </span>
                          )}
                        </>
                      )}

                      {collapsed && <span className="sr-only">{item.label}</span>}
                    </Link>

                    {collapsed && (
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 whitespace-nowrap rounded-control bg-ink text-white text-label px-2.5 py-1.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150"
                      >
                        {item.label}
                        {count > 0 && <span className="ml-1.5 text-accent">{count}</span>}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-2 shrink-0">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`flex items-center h-9 w-full rounded-control text-micro text-white/70 hover:text-white hover:bg-white/10 transition-colors ${
            collapsed ? "justify-center" : "gap-2.5 px-3"
          }`}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4" aria-hidden="true" />
          ) : (
            <>
              <PanelLeftClose className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
