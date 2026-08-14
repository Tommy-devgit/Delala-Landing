"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  GitCompare,
  Heart,
  LogOut,
  Menu,
  Plus,
  Search,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/use-session";
import { useUnreadNotifications } from "@/lib/use-notifications";
import { useFavorites } from "@/lib/use-favorites";
import { ACCOUNT_NAV, PRIMARY_NAV, TOOL_NAV, hasDarkHeader } from "@/lib/navigation";
import { Avatar } from "@/components/avatar";

/**
 * The primary navigation.
 *
 * Structure comes from `lib/navigation.ts` so the header, the mobile drawer and
 * the footer share one tree. Sections with children open a menu on hover and on
 * focus, and close on Escape or on a click elsewhere.
 *
 * Two behaviours worth naming:
 *
 * - The bar is transparent over a hero and becomes solid once the page scrolls,
 *   which is why `scrolled` is tracked rather than the bar simply always being
 *   opaque. Pages without a hero opt out by rendering the solid variant from the
 *   first pixel.
 * - Active state is compared on the path only. Rent and Buy are both `/search`
 *   and differ by query string; reading the query needs `useSearchParams`, which
 *   from the root layout forces every page into client rendering and breaks the
 *   static build outright.
 */
export function Header() {
  const pathname = usePathname();
  const session = useSession();
  const user = session?.user;
  const unreadCount = useUnreadNotifications();
  const { count: savedCount } = useFavorites();

  /**
   * Which menu is open, and on which route it was opened.
   *
   * Storing the path alongside the state means navigating closes everything by
   * derivation rather than by resetting state from an effect — writing state
   * synchronously in an effect body is what `react-hooks/set-state-in-effect`
   * forbids, and the alternative of deferring the reset would leave a menu
   * visibly open over the page it just navigated to.
   */
  const [menu, setMenu] = useState<{ path: string; section: string | null; account: boolean; drawer: boolean }>({
    path: pathname,
    section: null,
    account: false,
    drawer: false,
  });

  const onCurrentRoute = menu.path === pathname;
  const openSection = onCurrentRoute ? menu.section : null;
  const accountOpen = onCurrentRoute && menu.account;
  const drawerOpen = onCurrentRoute && menu.drawer;

  const setOpenSection = (section: string | null) =>
    setMenu({ path: pathname, section, account: false, drawer: false });
  const setAccountOpen = (account: boolean) =>
    setMenu({ path: pathname, section: null, account, drawer: false });
  const setDrawerOpen = (drawer: boolean) =>
    setMenu({ path: pathname, section: null, account: false, drawer });

  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  /**
   * Transparent only where something dark is actually behind the bar.
   *
   * The header is `sticky` and sits *above* `<main>` in the document flow, so a
   * transparent bar shows the page background — `--color-canvas`, a warm
   * near-white — not the hero. White logo, white links and white-bordered
   * buttons on that are invisible, which is exactly what happened.
   *
   * Each qualifying page pulls its header up by `-mt-[var(--header-h)]` so it
   * runs underneath this bar. That negative margin and the height here must
   * stay in step, and `hasDarkHeader` in `lib/navigation.ts` is the single list
   * of which routes do it.
   */
  const overlay = hasDarkHeader(pathname) && !scrolled;

  useEffect(() => {
    let cancelled = false;
    const onScroll = () => {
      if (!cancelled) setScrolled(window.scrollY > 24);
    };

    // The initial read is deferred so the first write is not synchronous —
    // `react-hooks/set-state-in-effect`. See §6 of HANDOUT.md.
    void Promise.resolve().then(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const closeAll = () =>
      setMenu((m) => ({ ...m, section: null, account: false, drawer: false }));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenu((m) => ({ ...m, section: null, account: false }));
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const isActive = (href: string) => {
    const [path] = href.split("?");
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  /** Utility buttons all share one shape, so none of them shouts. */
  const utilityClasses = `relative w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
    overlay
      ? "border-white/25 text-white hover:bg-white/10"
      : "border-line bg-surface text-muted hover:text-primary hover:border-primary/40"
  }`;

  const badgeClasses =
    "absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-primary text-white text-[9px] font-medium flex items-center justify-center";

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          overlay ? "bg-transparent" : "bg-canvas/95 backdrop-blur-md border-b border-line"
        }`}
      >
        <div ref={navRef} className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-[var(--header-h)] gap-4">
            {/* Logo, with room around it. */}
            <Link
              href="/"
              className={`font-serif-display font-light text-2xl tracking-tight shrink-0 pr-2 transition-colors ${
                overlay ? "text-white" : "text-primary hover:text-primary-hover"
              }`}
            >
              ደላላ
            </Link>

            {/* Sections */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
              {PRIMARY_NAV.map((section) => {
                const active = isActive(section.href);
                const open = openSection === section.label;

                if (!section.children) {
                  return (
                    <Link
                      key={section.label}
                      href={section.href}
                      className={`px-3 py-2 rounded-control text-micro transition-colors ${
                        overlay
                          ? active
                            ? "text-white font-medium"
                            : "text-white/75 hover:text-white"
                          : active
                            ? "text-primary font-medium"
                            : "text-muted hover:text-primary"
                      }`}
                    >
                      {section.label}
                    </Link>
                  );
                }

                return (
                  <div
                    key={section.label}
                    className="relative"
                    onMouseEnter={() => setOpenSection(section.label)}
                    onMouseLeave={() => setOpenSection(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={() => setOpenSection(open ? null : section.label)}
                      onFocus={() => setOpenSection(section.label)}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-control text-micro transition-colors ${
                        overlay
                          ? active
                            ? "text-white font-medium"
                            : "text-white/75 hover:text-white"
                          : active
                            ? "text-primary font-medium"
                            : "text-muted hover:text-primary"
                      }`}
                    >
                      {section.label}
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>

                    {open && (
                      <div className="absolute left-0 top-full pt-2 w-72">
                        <ul className="bg-surface border border-line rounded-card shadow-lg py-2 overflow-hidden">
                          {section.children.map((child) => (
                            <li key={child.href + child.label}>
                              <Link
                                href={child.href}
                                className="block px-4 py-2.5 hover:bg-canvas transition-colors"
                              >
                                <span className="block text-micro text-ink">{child.label}</span>
                                {child.description && (
                                  <span className="block text-label text-muted mt-0.5">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Utilities */}
            <div className="flex items-center gap-2 shrink-0">
              <Link href="/search" aria-label="Search properties" className={utilityClasses}>
                <Search className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link href="/compare" aria-label="Compare properties" className={`${utilityClasses} hidden sm:flex`}>
                <GitCompare className="w-4 h-4" aria-hidden="true" />
              </Link>

              {/* Same treatment as the bell. The heart was permanently filled
                  rose-500 regardless of whether anything was saved, which read
                  as an alert sitting in the bar at all times. */}
              <Link
                href="/favorites"
                aria-label={savedCount > 0 ? `Saved homes, ${savedCount}` : "Saved homes"}
                className={utilityClasses}
              >
                <Heart className="w-4 h-4" aria-hidden="true" />
                {savedCount > 0 && <span className={badgeClasses}>{savedCount > 9 ? "9+" : savedCount}</span>}
              </Link>

              <Link
                href="/notifications"
                aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"}
                className={utilityClasses}
              >
                <Bell className="w-4 h-4" aria-hidden="true" />
                {unreadCount > 0 && <span className={badgeClasses}>{unreadCount > 9 ? "9+" : unreadCount}</span>}
              </Link>

              {user ? (
                <div className="relative hidden sm:block">
                  <button
                    type="button"
                    onClick={() => setAccountOpen(!accountOpen)}
                    aria-expanded={accountOpen}
                    aria-haspopup="true"
                    aria-label="Account menu"
                    className={`flex items-center gap-1 p-1 pr-2 rounded-full border transition-colors ${
                      overlay ? "border-white/25 hover:bg-white/10" : "border-line bg-surface hover:border-primary/40"
                    }`}
                  >
                    <Avatar src={user.avatarUrl} name={user.fullName} size={26} />
                    <ChevronDown
                      className={`w-3 h-3 ${overlay ? "text-white/70" : "text-muted"}`}
                      aria-hidden="true"
                    />
                  </button>

                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-surface rounded-card border border-line shadow-lg py-2 z-50">
                      <div className="px-4 py-2.5 border-b border-line">
                        <p className="text-micro text-ink truncate">{user.fullName}</p>
                        <p className="text-label text-muted truncate">{user.email}</p>
                      </div>

                      <ul className="py-1">
                        {ACCOUNT_NAV.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block px-4 py-2 text-micro text-body hover:bg-canvas hover:text-primary transition-colors"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={() => authClient.signOut()}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-micro text-primary hover:bg-canvas transition-colors border-t border-line text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className={`hidden sm:inline-flex items-center h-9 px-3 rounded-control text-micro transition-colors ${
                    overlay ? "text-white hover:bg-white/10" : "text-body hover:text-primary"
                  }`}
                >
                  Sign in
                </Link>
              )}

              <Link
                href={user ? "/publish" : "/auth/signin?callbackUrl=/publish"}
                className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-control bg-primary text-white text-micro font-medium hover:bg-primary-hover transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                <span>Post property</span>
              </Link>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className={`lg:hidden ${utilityClasses}`}
              >
                <Menu className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer. Purpose-built rather than the desktop bar collapsed:
          every section is expanded, because a nested accordion on a phone hides
          the thing people came for. */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setDrawerOpen(false)} />

          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-canvas overflow-y-auto">
            <div className="flex items-center justify-between px-4 h-[var(--header-h)] border-b border-line sticky top-0 bg-canvas">
              <span className="font-serif-display font-light text-xl text-primary">ደላላ</span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full border border-line bg-surface text-muted flex items-center justify-center"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-4 space-y-6 pb-24">
              <Link
                href={user ? "/publish" : "/auth/signin?callbackUrl=/publish"}
                className="flex items-center justify-center gap-1.5 h-12 rounded-control bg-primary text-white text-micro font-medium"
              >
                <Plus className="w-4 h-4 text-accent" aria-hidden="true" />
                Post a property
              </Link>

              {PRIMARY_NAV.map((section) => (
                <div key={section.label} className="space-y-1">
                  <Link
                    href={section.href}
                    className="block text-sm font-medium text-ink py-1.5"
                  >
                    {section.label}
                  </Link>
                  {section.children && (
                    <ul className="pl-3 border-l border-line space-y-0.5">
                      {section.children.map((child) => (
                        <li key={child.href + child.label}>
                          <Link
                            href={child.href}
                            className="block py-1.5 text-micro text-muted hover:text-primary transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="space-y-1 pt-2 border-t border-line">
                <p className="text-label text-muted py-1.5">Your tools</p>
                <ul className="space-y-0.5">
                  {TOOL_NAV.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="block py-1.5 text-micro text-body hover:text-primary">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1 pt-2 border-t border-line">
                {user ? (
                  <>
                    <p className="text-label text-muted py-1.5">{user.fullName}</p>
                    <ul className="space-y-0.5">
                      {ACCOUNT_NAV.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="block py-1.5 text-micro text-body hover:text-primary">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => authClient.signOut()}
                      className="flex items-center gap-2 py-2 text-micro text-primary"
                    >
                      <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2 pt-1">
                    <Link
                      href="/auth/signin"
                      className="flex-1 h-11 rounded-control border border-line bg-surface text-body text-micro flex items-center justify-center"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="flex-1 h-11 rounded-control bg-primary text-white text-micro flex items-center justify-center"
                    >
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
