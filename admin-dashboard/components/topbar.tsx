"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { adminSession } from "@/lib/admin-api";
import { useAdminSession } from "@/lib/use-admin";
import { Badge, Button } from "@/components/ui";
import { Avatar } from "@/components/avatar";

export function Topbar() {
  const router = useRouter();
  const session = useAdminSession();
  const user = session?.user;

  const handleSignOut = () => {
    adminSession.clear();
    router.replace("/login");
  };

  return (
    <header className="h-16 bg-surface border-b border-line px-5 md:px-7 flex items-center justify-between gap-4 sticky top-0 z-30">
      <div className="min-w-0">
        <p className="text-micro text-muted truncate">
          Signed in as <span className="text-ink font-semibold">{user?.email}</span>
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {user && <Badge tone="primary">{user.role.toLowerCase()}</Badge>}

        <div className="flex items-center gap-2.5 pl-3 border-l border-line">
          <Avatar src={user?.avatarUrl} name={user?.fullName || user?.email} size={32} />
          <span className="text-micro font-semibold text-ink hidden sm:block max-w-32 truncate">
            {user?.fullName}
          </span>
        </div>

        <Button variant="secondary" size="sm" onClick={handleSignOut}>
          <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </header>
  );
}
