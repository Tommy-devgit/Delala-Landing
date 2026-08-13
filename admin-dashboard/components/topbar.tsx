"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
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
export function Topbar() {
  const router = useRouter();
  const session = useAdminSession();
  const user = session?.user;

  const handleSignOut = () => {
    adminSession.clear();
    router.replace("/login");
  };

  return (
    <header className="h-16 bg-surface border-b border-line px-5 md:px-7 flex items-center justify-end gap-3 sticky top-0 z-30">
      <div className="flex items-center gap-2.5">
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
