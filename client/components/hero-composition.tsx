"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ShieldCheck,
  MapPin,
  Star,
  Search,
  SlidersHorizontal,
  PhoneCall,
  CheckCircle2,
  Heart,
  Building2,
} from "lucide-react";

export function HeroComposition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous gentle floating loops
      gsap.to(card1Ref.current, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(card2Ref.current, {
        y: 10,
        x: -4,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.5,
      });

      gsap.to(card3Ref.current, {
        y: -10,
        x: 6,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1,
      });

      gsap.to(card4Ref.current, {
        y: 8,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.8,
      });

      gsap.to(phoneRef.current, {
        y: -6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg lg:max-w-xl mx-auto aspect-[4/4] sm:aspect-[4/3.8] lg:aspect-square flex items-center justify-center select-none"
    >
      {/* Background Subtle Radial Glows */}
      <div className="absolute inset-0 bg-radial from-[#B4C292]/30 via-transparent to-transparent blur-3xl rounded-full scale-110 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-radial from-[#4C061D]/15 via-transparent to-transparent blur-2xl rounded-full pointer-events-none" />

      {/* Main Central Phone Mockup */}
      <div
        ref={phoneRef}
        className="relative w-64 sm:w-72 md:w-80 h-[480px] sm:h-[520px] bg-[#3B3923] rounded-[42px] p-3 shadow-2xl border-4 border-[#3B3923] ring-1 ring-black/10 z-20 overflow-hidden"
      >
        {/* Phone Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#2D2D2D] rounded-full z-30 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#1a1a1a] mr-2" />
          <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
        </div>

        {/* Screen Content */}
        <div className="relative w-full h-full bg-[#FAF8F4] rounded-[32px] overflow-hidden flex flex-col pt-8 pb-3 px-3.5 font-sans">
          {/* App Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-heading font-black text-sm text-[#4C061D]">
              Delala
            </span>
            <div className="flex items-center gap-1 bg-[#B4C292]/30 px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#4C061D]">
              <ShieldCheck className="w-3 h-3 text-[#4C061D]" /> Verified
            </div>
          </div>

          {/* Search Bar inside app */}
          <div className="relative mb-3">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#ECE7DA] shadow-2xs">
              <Search className="w-3.5 h-3.5 text-[#736F4E]" />
              <span className="text-xs text-[#2D2D2D]/60 font-medium truncate">
                Bole, Addis Ababa • Under 45k ETB
              </span>
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#4C061D] ml-auto" />
            </div>
          </div>

          {/* In-App Property Card */}
          <div className="relative rounded-2xl bg-white border border-[#ECE7DA] shadow-xs overflow-hidden mb-3 group">
            <div className="relative h-32 w-full overflow-hidden">
              <img
                src="/images/hero_property.png"
                alt="Bole Villa"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-[#4C061D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-[#B4C292]" /> Verified
              </span>
              <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-[#4C061D]">
                <Heart className="w-3.5 h-3.5 fill-[#4C061D]" />
              </button>
            </div>

            <div className="p-2.5">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-heading font-bold text-xs text-[#4C061D]">
                  G+1 Luxury Villa in Bole
                </h4>
                <div className="flex items-center text-[10px] text-[#736F4E]">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                  4.9
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-[#736F4E] mb-2">
                <MapPin className="w-3 h-3 text-[#4C061D]" /> Bole Medhanialem
              </div>

              <div className="flex items-center justify-between border-t border-[#ECE7DA]/60 pt-2">
                <div>
                  <span className="text-xs font-extrabold text-[#4C061D]">
                    45,000 ETB
                  </span>
                  <span className="text-[10px] text-[#736F4E]"> / month</span>
                </div>
                <div className="bg-[#B4C292] text-[#4C061D] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Book Tour
                </div>
              </div>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-hidden text-[10px] mb-2">
            <span className="px-2 py-1 bg-[#4C061D] text-white font-medium rounded-lg whitespace-nowrap">
              3 Bed Villa
            </span>
            <span className="px-2 py-1 bg-white border border-[#ECE7DA] text-[#2D2D2D] rounded-lg whitespace-nowrap">
              Generator
            </span>
            <span className="px-2 py-1 bg-white border border-[#ECE7DA] text-[#2D2D2D] rounded-lg whitespace-nowrap">
              Furnished
            </span>
          </div>

          {/* Bottom Nav Bar Mock */}
          <div className="mt-auto pt-2 border-t border-[#ECE7DA] flex items-center justify-around text-[#736F4E]">
            <div className="flex flex-col items-center text-[#4C061D]">
              <Building2 className="w-4 h-4" />
              <span className="text-[9px] font-semibold">Explore</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-4 h-4" />
              <span className="text-[9px]">Map</span>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-4 h-4" />
              <span className="text-[9px]">Saved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Element 1: Top Left Verified Property Card */}
      <div
        ref={card1Ref}
        className="absolute top-4 -left-4 sm:-left-8 z-30 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#ECE7DA] shadow-xl max-w-[210px] sm:max-w-[230px]"
      >
        <div className="flex items-center gap-2.5 mb-2">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#ECE7DA]">
            <img
              src="/images/hero_property.png"
              alt="Villa"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#4C061D]">
              Bole Atlas Villa
              <ShieldCheck className="w-3.5 h-3.5 text-[#B4C292]" />
            </div>
            <div className="text-[10px] text-[#736F4E] flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5 text-[#4C061D]" /> Addis Ababa
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-[#FAF8F4] p-1.5 rounded-lg border border-[#ECE7DA]/80">
          <span className="text-xs font-black text-[#4C061D]">
            45,000 Birr
          </span>
          <span className="text-[9px] font-semibold text-[#736F4E]">
            100% Inspected
          </span>
        </div>
      </div>

      {/* Floating Element 2: Bottom Right Certified Broker Card */}
      <div
        ref={card2Ref}
        className="absolute -bottom-4 right-0 sm:-right-6 z-30 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#ECE7DA] shadow-xl max-w-[210px] sm:max-w-[240px]"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#B4C292] shrink-0">
            <img
              src="/images/avatar_abebe.png"
              alt="Abebe Broker"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#2D2D2D] truncate">
                Abebe T.
              </span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-[#B4C292]/40 text-[#4C061D]">
                Verified
              </span>
            </div>
            <div className="text-[10px] text-[#736F4E] font-medium truncate">
              Certified Delala Broker
            </div>
            <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold mt-0.5">
              <Star className="w-3 h-3 fill-amber-400" /> 4.98 (120+ homes)
            </div>
          </div>
        </div>
      </div>

      {/* Floating Element 3: Top Right Interactive Location Pin Snippet */}
      <div
        ref={card3Ref}
        className="absolute top-12 -right-4 sm:-right-10 z-30 bg-[#4C061D] text-[#FAF8F4] p-3 rounded-2xl shadow-xl border border-[#B4C292]/30 max-w-[180px]"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#B4C292]/20 flex items-center justify-center text-[#B4C292] shrink-0">
            <MapPin className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Kazanchis</div>
            <div className="text-[10px] text-[#B4C292] font-medium">
              42 Available Homes
            </div>
          </div>
        </div>
      </div>

      {/* Floating Element 4: Bottom Left Instant Direct Contact Alert */}
      <div
        ref={card4Ref}
        className="absolute bottom-16 -left-6 sm:-left-12 z-30 bg-white/90 backdrop-blur-md p-2.5 px-3.5 rounded-full border border-[#ECE7DA] shadow-lg flex items-center gap-2.5"
      >
        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <PhoneCall className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-[#2D2D2D] flex items-center gap-1">
            Direct Owner Chat
          </div>
          <div className="text-[9px] text-[#736F4E]">No hidden fees</div>
        </div>
      </div>
    </div>
  );
}
