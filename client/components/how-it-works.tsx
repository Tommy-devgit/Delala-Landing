"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEEKER_JOURNEY, OWNER_JOURNEY } from "@/lib/constants";
import { Users, Building2, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function HowItWorks() {
  const [activeAudience, setActiveAudience] = useState<"seekers" | "owners">("seekers");
  const steps = activeAudience === "seekers" ? SEEKER_JOURNEY : OWNER_JOURNEY;

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="font-mono-label text-label text-primary bg-surface px-3.5 py-1.5 rounded-full border border-line inline-block mb-4">
            STRUCTURED PROCESS
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-primary tracking-tight mb-6 leading-[0.95]">
            How <span className="italic font-normal text-ink">Delala</span> works.
          </h1>

          <p className="text-base sm:text-lg text-muted font-normal leading-relaxed">
            Select your journey below to see how Delala creates a safe, transparent connection between house hunters and property managers.
          </p>
        </div>

        {/* Journey Audience Selector Tabs */}
        <div className="flex items-center gap-3 mb-12 bg-surface p-1.5 rounded-lg border border-line shadow-xs max-w-md">
          <button
            onClick={() => setActiveAudience("seekers")}
            className={`flex-1 py-2.5 px-4 rounded-md font-mono-label text-label transition-all flex items-center justify-center gap-2 ${
              activeAudience === "seekers"
                ? "bg-primary text-white shadow-xs"
                : "text-muted hover:text-primary"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>FOR HOUSE HUNTERS</span>
          </button>

          <button
            onClick={() => setActiveAudience("owners")}
            className={`flex-1 py-2.5 px-4 rounded-md font-mono-label text-label transition-all flex items-center justify-center gap-2 ${
              activeAudience === "owners"
                ? "bg-primary-hover text-white shadow-xs"
                : "text-muted hover:text-primary-hover"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>FOR OWNERS & BROKERS</span>
          </button>
        </div>

        {/* Dynamic Journey Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAudience}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {steps.map((item) => (
              <div
                key={item.step}
                className="bg-surface p-8 feature-card-radius border border-line shadow-xs flex flex-col justify-between hover:border-accent hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif-display text-4xl font-light text-muted/35">
                      {item.step}
                    </span>
                    <span className="p-2 rounded-lg bg-canvas text-primary">
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                  </div>

                  <h3 className="font-serif-display text-2xl font-light text-ink mb-1">
                    {item.title}
                  </h3>

                  <div className="font-mono-label text-label text-muted mb-4">
                    {item.subtitle}
                  </div>

                  <p className="text-sm text-muted leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-line flex items-center justify-between font-mono-label text-label text-primary">
                  <span>STEP {item.step} OF 03</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Callout Banner */}
        <div className="mt-16 bg-primary text-white p-8 sm:p-12 rounded-card shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif-display text-3xl font-light mb-2">
              Ready to start your journey?
            </h3>
            <p className="text-sm text-white/80 max-w-xl font-normal">
              Download the Delala mobile app to browse verified homes or list your property with zero upfront fees.
            </p>
          </div>

          <Link
            href="/download"
            className="px-6 py-3 rounded-lg bg-accent text-primary font-bold text-sm hover:bg-surface transition-colors shrink-0"
          >
            Download Delala App →
          </Link>
        </div>

      </div>
    </section>
  );
}

