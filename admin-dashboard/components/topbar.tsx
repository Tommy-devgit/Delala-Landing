"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { adminSession } from "@/lib/admin-api";
import { useAdminSession } from "@/lib/use-admin";
import { Button } from "@/components/ui";
import { Avatar } from "@/components/avatar";

/**
 * The bar above every admin screen.
 *
 * Stripped of "Signed in as <email>" and the role badge. Somebody who has just
 * signed in to their own dashboard knows who they are and what they are; the
 * line restated it on every screen and pushed the useful controls to the edge.
 * The avatar and name remain, which is enough to spot a wrong account, and the
 * email is still on the account itself.
 */
export function Topbar({ onOpenMenu }: { onOpenMenu?: () => void }) {
  const router = useRouter();
  const session = useAdminSession();
  const user = session?.user;

  const handleSignOut = () => {
    adminSession.clear();
    router.replace("/login");
  };

  return (
    <header className="h-16 bg-surface border-b border-line px-4 sm:px-5 md:px-7 flex items-center justify-between gap-3 sticky top-0 z-30">
      {/* The only way to reach navigation below `lg`, where the sidebar is an
          off-canvas drawer. */}
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open navigation"
        className="lg:hidden w-9 h-9 rounded-control border border-line text-muted hover:text-primary hover:border-primary/40 flex items-center justify-center transition-colors shrink-0"
      >
        <Menu className="w-4 h-4" aria-hidden="true" />
      </button>

      {/* Keeps the account controls right-aligned when the hamburger is absent. */}
      <div className="hidden lg:block flex-1" />

      <div className="flex items-center gap-2.5 min-w-0">
        <Avatar src={user?.avatarUrl} name={user?.fullName || user?.email} size={32} />
        <span className="text-micro font-semibold text-ink hidden sm:block max-w-40 truncate">
          {user?.fullName}
        </span>
      </div>

      <Button variant="secondary" size="sm" onClick={handleSignOut}>
        <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Sign out</span>
      </Button>
    </header>
  );
}
