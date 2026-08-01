"use client";

import { BROKERS } from "@/lib/data";
import { BrokerCard } from "@/components/broker-card";
import { ShieldCheck } from "lucide-react";

export default function BrokersDirectoryPage() {
  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="font-mono-label text-[10px] text-[#4C061D] bg-white border border-[#ECE7DA] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>CERTIFIED BROKER DIRECTORY</span>
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl font-light text-[#4C061D] mb-4">
            Verified Real Estate Brokers
          </h1>

          <p className="text-base text-[#736F4E] font-medium">
            Connect directly with licensed Ethiopian real estate brokers whose identities, property titles, and listing claims are physically verified by Delala field teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BROKERS.map((broker) => (
            <BrokerCard key={broker.id} broker={broker} />
          ))}
        </div>

      </div>
    </div>
  );
}
