"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Globe, Bell, ShieldCheck, Check } from "lucide-react";
import { buttonClasses } from "@/components/ui";

export default function SettingsPage() {
  const [currency, setCurrency] = useState("ETB");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-canvas min-h-screen py-8 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-8">
        
        <div className="mb-6">
          <span className="font-mono-label text-label text-primary bg-surface border border-line px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 shadow-xs">
            <SettingsIcon className="w-3.5 h-3.5 text-primary" />
            <span>Preferences</span>
          </span>

          <h1 className="font-serif-display text-4xl font-light text-primary mb-2">
            Account Preferences
          </h1>
          <p className="text-sm text-muted">
            Manage currency display, search alerts, and notification settings.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4 bg-surface p-6 rounded-panel border border-line shadow-xs">
          
          {/* Currency Display */}
          <div>
            <label className="font-mono-label text-label text-primary block mb-2 font-bold">
              CURRENCY DISPLAY
            </label>
            <select
              aria-label="CURRENCY DISPLAY"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-3.5 rounded-control bg-canvas border border-line text-xs font-medium text-body"
            >
              <option value="ETB">ETB - Ethiopian Birr (Default)</option>
              <option value="USD">USD - US Dollar (Approximate Conversion)</option>
            </select>
          </div>

          {/* Notifications */}
          <div>
            <label className="font-mono-label text-label text-primary block mb-3 font-bold">
              LISTING ALERTS & NOTIFICATIONS
            </label>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 rounded-control bg-canvas border border-line text-xs font-medium cursor-pointer">
                <div>
                  <div className="font-bold text-ink">New Listing Alerts</div>
                  <div className="text-micro text-muted">Get notified when a home matching your sub-city is verified</div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
              </label>

              <label className="flex items-center justify-between p-4 rounded-control bg-canvas border border-line text-xs font-medium cursor-pointer">
                <div>
                  <div className="font-bold text-ink">Walkthrough Reminders</div>
                  <div className="text-micro text-muted">SMS and email reminders before scheduled field walkthroughs</div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
              </label>
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="submit"
              className={buttonClasses({ size: "md" })}
            >
              Save Settings →
            </button>

            {savedSuccess && (
              <span className="text-xs text-primary font-mono-label font-bold flex items-center gap-1">
                <Check className="w-4 h-4 text-accent" /> PREFERENCES SAVED!
              </span>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}
