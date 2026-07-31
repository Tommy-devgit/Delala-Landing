"use client";

import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-[#FAF8F4] select-none overflow-hidden pb-4 sm:pb-6">
      {/* Outer Padding Container pulled slightly upward (-mt) with balanced horizontal spacing */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 -mt-4 sm:-mt-6 lg:-mt-8">
        
        {/* MAIN HERO CARD CONTAINER — STRICT MAX 100VH HEIGHT & TUCKED UPWARD */}
        <div className="relative w-full max-h-[calc(100vh-120px)] min-h-[480px] sm:min-h-[540px] rounded-[36px] sm:rounded-[44px] lg:rounded-[52px] overflow-hidden shadow-2xl bg-[#1c1b12] border border-[#ECE7DA] flex flex-col justify-between">
          
          {/* 1. TOP VISUAL PHOTO BACKDROP */}
          <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] w-full overflow-hidden">
            {/* Background Visual Photo */}
            <img
              src="/images/hero_property.png"
              alt="Delala Luxury Ethiopian Property"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Soft Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
          </div>

          {/* 2. BOTTOM CONTENT SECTION (Video box removed per request) */}
          <div className="relative z-20 bg-white p-8 sm:p-12 lg:p-14 border-t border-[#ECE7DA]/60">
            <div className="max-w-4xl">
              
              {/* Massive Headline matching 'The Best Way to Heal Your Pain.' */}
              <div className="mb-6 sm:mb-8">
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1c1b12] tracking-tight leading-[1.05]">
                  Find Your Next Home, <br />
                  Without the Hassle.
                </h1>
              </div>

              {/* Subtitle Row with Vertical Line Divider & Pill Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-6 border-t border-[#ECE7DA]">
                {/* Left Label */}
                <div className="text-[11px] font-bold text-[#736F4E] uppercase tracking-wider shrink-0 leading-tight">
                  Real <br />
                  Estate
                </div>

                {/* Vertical Divider Line */}
                <div className="hidden sm:block w-px h-10 bg-[#ECE7DA]" />

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed font-medium flex-1 max-w-xl">
                  Browse verified homes, trusted brokers, and luxury apartments across Ethiopia—all in one place.
                </p>

                {/* Black Pill Action Button */}
                <a
                  href="#download"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1c1b12] text-white font-bold text-xs sm:text-sm shadow-md hover:bg-[#4C061D] transition-colors shrink-0 group"
                >
                  <span>Download App</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
