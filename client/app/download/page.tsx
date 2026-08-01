import { AppShowcase } from "@/components/app-showcase";
import { FinalCTA } from "@/components/final-cta";
import type { Metadata } from "next";
import { Smartphone, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Download Delala App | Mobile Housing Marketplace",
  description:
    "Download the free Delala mobile app for iOS and Android. Search verified homes across Addis Ababa and Ethiopia, chat with owners, and receive instant rent alerts.",
};

export default function DownloadPage() {
  return (
    <div className="py-6 space-y-12">
      {/* 1. Header Banner */}
      <section className="py-16 sm:py-20 bg-[#FAF8F4] relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="font-mono-label text-[11px] text-[#4C061D] bg-white px-4 py-1.5 rounded-full border border-[#ECE7DA] inline-block mb-6">
            MOBILE APP DOWNLOAD
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#4C061D] tracking-tight mb-6 leading-[0.95]">
            Get the <span className="italic font-normal text-[#1c1b12]">Delala</span> Mobile App.
          </h1>

          <p className="text-base sm:text-lg text-[#736F4E] leading-relaxed max-w-2xl mx-auto font-normal mb-8">
            Experience verified Ethiopian house hunting on your phone. Available free for iOS and Android devices.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#download"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#4C061D] text-white font-medium text-sm shadow-md hover:bg-[#3B3923] transition-all group"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              <span>Download for iOS & Android</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Interactive Mobile Showcase */}
      <AppShowcase />

      {/* 3. Device Compatibility & Features Grid (30px radius cards) */}
      <section className="py-16 bg-[#FAF8F4] border-t border-[#ECE7DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif-display text-3xl sm:text-4xl font-light text-[#1c1b12] tracking-tight mb-4">
              Everything you need in one powerful app.
            </h2>
            <p className="text-base text-[#736F4E]">
              Designed specifically for house hunters, property owners, and certified brokers in Ethiopia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 feature-card-radius border border-[#ECE7DA] shadow-xs">
              <div className="font-mono-label text-[11px] text-[#4C061D] mb-4 font-bold">
                01 • SEARCH
              </div>
              <h3 className="font-serif-display text-2xl font-light text-[#1c1b12] mb-2">
                Fast Search & Filters
              </h3>
              <p className="text-xs sm:text-sm text-[#736F4E] leading-relaxed">
                Filter by monthly Birr price, sub-city, generator backup, water tank size, and house type.
              </p>
            </div>

            <div className="bg-white p-8 feature-card-radius border border-[#ECE7DA] shadow-xs">
              <div className="font-mono-label text-[11px] text-[#4C061D] mb-4 font-bold">
                02 • CHAT
              </div>
              <h3 className="font-serif-display text-2xl font-light text-[#1c1b12] mb-2">
                Direct Owner Chat
              </h3>
              <p className="text-xs sm:text-sm text-[#736F4E] leading-relaxed">
                Connect directly with verified owners and brokers inside the app with zero viewing fees.
              </p>
            </div>

            <div className="bg-white p-8 feature-card-radius border border-[#ECE7DA] shadow-xs">
              <div className="font-mono-label text-[11px] text-[#4C061D] mb-4 font-bold">
                03 • PROTECT
              </div>
              <h3 className="font-serif-display text-2xl font-light text-[#1c1b12] mb-2">
                Legal Contract Protection
              </h3>
              <p className="text-xs sm:text-sm text-[#736F4E] leading-relaxed">
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

