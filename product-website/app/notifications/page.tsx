"use client";

import { Bell, CheckCircle2, Calendar, ShieldCheck, Tag } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: "1",
      title: "Walkthrough Visit Confirmed",
      message: "Certified broker Abebe Tesfaye confirmed your walkthrough appointment for Bole Medhanialem Villa tomorrow at 10:00 AM.",
      time: "2 hours ago",
      icon: Calendar,
      type: "VISIT",
    },
    {
      id: "2",
      title: "Listing Audit Verified & Published",
      message: "Delala field agents verified your property 'Kazanchis Executive Studio'. Listing is now live on marketplace.",
      time: "1 day ago",
      icon: CheckCircle2,
      type: "AUDIT",
    },
    {
      id: "3",
      title: "Price Drop Alert",
      message: "Monthly rent for saved listing 'Old Airport Diplomatic G+1 Villa' dropped from ETB 105,000 to ETB 95,000.",
      time: "3 days ago",
      icon: Tag,
      type: "PRICE",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1B12] font-sans pb-24">
      <div className="bg-[#4C061D] text-white py-12 border-b border-[#3B0416]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif-display text-3xl sm:text-4xl text-white">
            Notifications & System Alerts
          </h1>
          <p className="mt-1 text-sm text-[#ECE7DA]/80">
            Realtime walkthrough confirmations, field audit statuses, and saved property updates.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-4">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.id} className="p-6 rounded-3xl bg-white border border-[#ECE7DA] shadow-xs flex items-start gap-4 hover:border-[#4C061D] transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#4C061D]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#1C1B12]">{n.title}</h3>
                  <span className="text-[10px] font-mono-label text-[#736F4E]">{n.time}</span>
                </div>
                <p className="text-xs text-[#736F4E] mt-1">{n.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
