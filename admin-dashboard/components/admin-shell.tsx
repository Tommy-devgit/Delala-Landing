"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
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
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="p-5 md:p-7 flex-1 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
