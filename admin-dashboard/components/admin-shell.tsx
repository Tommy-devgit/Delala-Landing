"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { useAdminSession } from "@/lib/use-admin";

/**
 * Route guard for the whole dashboard.
 *
 * Nothing protected these pages before — every admin screen rendered to anyone
 * who loaded the URL.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useAdminSession();
  /**
   * Drawer state, owned here because the trigger is in the topbar and the
   * drawer is the sidebar — siblings, so it has to sit above both.
   *
   * The route it was opened on is stored with it, so navigating closes the
   * drawer by derivation. Resetting it from an effect trips
   * `react-hooks/set-state-in-effect`, and deferring that reset would leave the
   * drawer visibly open over the page it just navigated to.
   */
  const [menu, setMenu] = useState({ path: pathname, open: false });
  const menuOpen = menu.open && menu.path === pathname;
  const setMenuOpen = (open: boolean) => setMenu({ path: pathname, open });

  const isLoginRoute = pathname === "/login";

  useEffect(() => {
    if (!isLoginRoute && session === null) {
      router.replace("/login");
    }
  }, [isLoginRoute, session, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  // useSyncExternalStore returns null on the server and on the first client
  // paint, so hold the shell until the session is known rather than flashing
  // the dashboard to a signed-out visitor.
  if (!session) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-canvas">
        <Loader2 className="w-5 h-5 animate-spin text-primary" aria-label="Checking your session" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar mobileOpen={menuOpen} onCloseMobile={() => setMenuOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenMenu={() => setMenuOpen(true)} />
        {/* `min-w-0` on the column above is what lets the wide tables inside
            scroll rather than forcing the whole page wider than the viewport. */}
        <main className="p-4 sm:p-5 md:p-7 flex-1 max-w-7xl w-full mx-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
