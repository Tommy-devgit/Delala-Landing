import { AppShowcase } from "@/components/app-showcase";
import { FinalCTA } from "@/components/final-cta";
import type { Metadata } from "next";
import { Smartphone, ShieldCheck, Download, CheckCircle2, Apple, Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Download Delala App | Mobile Housing Marketplace",
  description:
    "Download the free Delala mobile app for iOS and Android. Search verified homes across Addis Ababa and Ethiopia, chat with owners, and receive instant rent alerts.",
};

export default function DownloadPage() {
  return (
    <div className="py-8 space-y-12">
      {/* 1. Header Banner */}
      <section className="py-16 sm:py-20 bg-[#FAF8F4] relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="px-3.5 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] font-extrabold text-xs border border-[#B4C292]/50 inline-block mb-6">
            Mobile App Download
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#1c1b12] tracking-tight mb-6">
            Get the Delala Mobile App.
          </h1>

          <p className="text-base sm:text-xl text-[#2D2D2D]/85 leading-relaxed max-w-2xl mx-auto font-normal mb-8">
            Experience verified Ethiopian house hunting on your phone. Available free for iOS and Android devices.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#download"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#4C061D] text-white font-extrabold text-sm shadow-md hover:bg-[#3B3923] transition-all"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              <span>Download for iOS & Android</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Interactive Mobile Showcase */}
      <AppShowcase />

      {/* 3. Device Compatibility & Features Grid */}
      <section className="py-16 bg-[#FAF8F4] border-t border-[#ECE7DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1c1b12] tracking-tight mb-4">
              Everything you need in one powerful app.
            </h2>
            <p className="text-base text-[#2D2D2D]/80">
              Designed specifically for house hunters, property owners, and certified brokers in Ethiopia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-[#ECE7DA] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center text-[#4C061D] mb-6 font-bold">
                01
              </div>
              <h3 className="font-heading text-xl font-bold text-[#1c1b12] mb-2">
                Fast Search & Filters
              </h3>
              <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed">
                Filter by monthly Birr price, sub-city, generator backup, water tank size, and house type.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-[#ECE7DA] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center text-[#4C061D] mb-6 font-bold">
                02
              </div>
              <h3 className="font-heading text-xl font-bold text-[#1c1b12] mb-2">
                Direct Owner Chat
              </h3>
              <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed">
                Connect directly with verified owners and brokers inside the app with zero viewing fees.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-[#ECE7DA] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center text-[#4C061D] mb-6 font-bold">
                03
              </div>
              <h3 className="font-heading text-xl font-bold text-[#1c1b12] mb-2">
                Legal Contract Protection
              </h3>
              <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed">
                Access standardized Ethiopian legal lease templates to safeguard your security deposit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Grand CTA Banner */}
      <FinalCTA />
    </div>
  );
}
