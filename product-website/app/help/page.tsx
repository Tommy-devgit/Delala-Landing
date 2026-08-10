"use client";

import { HelpCircle, ShieldAlert, CheckCircle2, Phone, Mail, FileText, Zap, Droplets } from "lucide-react";

export default function HelpPage() {
  const faqs = [
    {
      q: "How does Delala verify property listings and brokers?",
      a: "Every published property undergoes a mandatory field-agent physical audit. We verify title deeds, inspect standby generator capacity (kVA), test reserve water tanks, and validate government broker agency licenses (ETH-RE-XXXX).",
    },
    {
      q: "Why are standby generator and water tank details required?",
      a: "Power outages and municipal water rationing are common infrastructure considerations in Ethiopian cities. Exposing exact generator kVA and water tank liter volume ensures home seekers choose homes suited to their power and water requirements.",
    },
    {
      q: "Are there any hidden broker commission fees?",
      a: "No. Delala enforces zero commission gouging. All broker fees are transparently disclosed upfront on certified broker profiles.",
    },
    {
      q: "How do I schedule a physical walkthrough visit?",
      a: "Open any verified property listing and click 'Schedule Walkthrough Visit'. Choose a preferred date and time slot. The certified broker will receive instant notification to confirm your visit.",
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans pb-24">
      {/* Header */}
      <div className="bg-primary text-white py-8 border-b border-primary-hover">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas/10 text-accent text-xs font-mono-label mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Scam Protection Center</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl text-white">
            Marketplace Help & Support
          </h1>
          <p className="mt-2 text-sm text-line/80">
            Verification standards, Ethiopian housing guidelines, and scam prevention protocol.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-5">
        
        {/* Scam Warning Callout */}
        <div className="p-6 rounded-panel bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-1" />
          <div className="space-y-1">
            <h3 className="font-bold text-sm">Delala Scam Prevention Notice</h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              Never send advance wire transfers or unverified cash payments via informal social media handles before physically inspecting the property with a certified broker bearing a Delala ID badge.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="font-serif-display text-2xl text-ink">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-panel bg-surface border border-line shadow-xs space-y-2">
                <h3 className="font-bold text-sm text-ink flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="p-6 rounded-panel bg-surface border border-line shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-card bg-primary text-white flex items-center justify-center">
              <Phone className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="font-bold text-sm text-ink">Call Delala Support</div>
              <div className="text-xs font-mono-label text-primary font-bold">+251 911 000 888</div>
            </div>
          </div>

          <div className="p-6 rounded-panel bg-surface border border-line shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-card bg-primary text-white flex items-center justify-center">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="font-bold text-sm text-ink">Email Verification Team</div>
              <div className="text-xs font-mono-label text-primary font-bold">support@delala.et</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
