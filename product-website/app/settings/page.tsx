"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Globe, Bell, ShieldCheck, Check } from "lucide-react";

export default function SettingsPage() {
  const [currency, setCurrency] = useState("ETB");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-8">
        
        <div className="mb-10">
          <span className="font-mono-label text-[10px] text-[#4C061D] bg-white border border-[#ECE7DA] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 shadow-xs">
            <SettingsIcon className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>MARKETPLACE PREFERENCES</span>
          </span>

          <h1 className="font-serif-display text-4xl font-light text-[#4C061D] mb-2">
            Account Preferences
          </h1>
          <p className="text-sm text-[#736F4E]">
            Manage currency display, search alerts, and notification settings.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6 bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs">
          
          {/* Currency Display */}
          <div>
            <label className="font-mono-label text-[10px] text-[#4C061D] block mb-2 font-bold">
              CURRENCY DISPLAY
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-medium text-[#2D2D2D]"
            >
              <option value="ETB">ETB - Ethiopian Birr (Default)</option>
              <option value="USD">USD - US Dollar (Approximate Conversion)</option>
            </select>
          </div>

          {/* Notifications */}
          <div>
            <label className="font-mono-label text-[10px] text-[#4C061D] block mb-3 font-bold">
              LISTING ALERTS & NOTIFICATIONS
            </label>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-medium cursor-pointer">
                <div>
                  <div className="font-bold text-[#1c1b12]">New Listing Alerts</div>
                  <div className="text-[11px] text-[#736F4E]">Get notified when a home matching your sub-city is verified</div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#4C061D]" />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-medium cursor-pointer">
                <div>
                  <div className="font-bold text-[#1c1b12]">Walkthrough Reminders</div>
                  <div className="text-[11px] text-[#736F4E]">SMS and email reminders before scheduled field walkthroughs</div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#4C061D]" />
              </label>
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#4C061D] text-white font-mono-label text-xs font-bold shadow-md hover:bg-[#3B3923] transition-colors"
            >
              Save Settings →
            </button>

            {savedSuccess && (
              <span className="text-xs text-[#4C061D] font-mono-label font-bold flex items-center gap-1">
                <Check className="w-4 h-4 text-[#B4C292]" /> PREFERENCES SAVED!
              </span>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}
