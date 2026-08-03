"use client";

import { useState } from "react";
import { BrokerTable } from "@/components/broker-table";
import { ADMIN_BROKERS, AdminBroker } from "@/lib/mock-admin-data";

export default function AdminBrokersPage() {
  const [brokers, setBrokers] = useState<AdminBroker[]>(ADMIN_BROKERS);

  const handleToggleVerify = (id: string) => {
    setBrokers((prev) => prev.map((b) => (b.id === id ? { ...b, verified: !b.verified } : b)));
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-[#ECE7DA] pb-6">
        <span className="text-[11px] font-mono-label font-bold text-[#736F4E] tracking-widest uppercase">
          AGENCY DIRECTORY
        </span>
        <h1 className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mt-1">
          Verified Broker Directory
        </h1>
        <p className="text-xs text-[#736F4E] font-mono-label mt-1">
          Licensed agency compliance, real estate registration & listing performance
        </p>
      </div>

      <BrokerTable brokers={brokers} onToggleVerify={handleToggleVerify} />
    </div>
  );
}
