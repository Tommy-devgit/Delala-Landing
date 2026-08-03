"use client";

import { useState } from "react";
import { UserTable } from "@/components/user-table";
import { ADMIN_USERS, AdminUser } from "@/lib/mock-admin-data";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);

  const handleRoleChange = (id: string, newRole: AdminUser["role"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  const handleStatusToggle = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" } : u)),
    );
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-[#ECE7DA] pb-6">
        <span className="text-[11px] font-mono-label font-bold text-[#736F4E] tracking-widest uppercase">
          ACCESS CONTROL
        </span>
        <h1 className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mt-1">
          User Role & Access Management
        </h1>
        <p className="text-xs text-[#736F4E] font-mono-label mt-1">
          Platform user accounts, permission scope assignments & suspension controls
        </p>
      </div>

      <UserTable users={users} onRoleChange={handleRoleChange} onStatusToggle={handleStatusToggle} />
    </div>
  );
}
