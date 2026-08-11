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
      <div className="absolute inset-0 bg-radial from-accent/30 via-transparent to-transparent blur-3xl rounded-full scale-110 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-radial from-primary/15 via-transparent to-transparent blur-2xl rounded-full pointer-events-none" />

      {/* Main Central Phone Mockup */}
      <div
        ref={phoneRef}
        className="relative w-64 sm:w-72 md:w-80 h-[480px] sm:h-[520px] bg-primary-hover rounded-[42px] p-3 shadow-2xl border-4 border-primary-hover ring-1 ring-black/10 z-20 overflow-hidden"
      >
        {/* Phone Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-body rounded-full z-30 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#1a1a1a] mr-2" />
          <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
        </div>

        {/* Screen Content */}
        <div className="relative w-full h-full bg-canvas rounded-[32px] overflow-hidden flex flex-col pt-8 pb-3 px-3.5 font-sans">
          {/* App Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-heading font-black text-sm text-primary">
              Delala
            </span>
            <div className="flex items-center gap-1 bg-accent/30 px-2 py-0.5 rounded-full text-label font-semibold text-primary">
              <ShieldCheck className="w-3 h-3 text-primary" /> Verified
            </div>
          </div>

          {/* Search Bar inside app */}
          <div className="relative mb-3">
            <div className="flex items-center gap-2 bg-surface px-3 py-2 rounded-control border border-line shadow-2xs">
              <Search className="w-3.5 h-3.5 text-muted" />
              <span className="text-xs text-body/60 font-medium truncate">
                Bole, Addis Ababa • Under 45k ETB
              </span>
              <SlidersHorizontal className="w-3.5 h-3.5 text-primary ml-auto" />
            </div>
          </div>

          {/* In-App Property Card */}
          <div className="relative rounded-card bg-surface border border-line shadow-xs overflow-hidden mb-3 group">
            <div className="relative h-32 w-full overflow-hidden">
              <img
                src="/images/hero_property.png"
                alt="Bole Villa"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-primary text-white text-label font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-accent" /> Verified
              </span>
              <button className="absolute top-2 right-2 p-1.5 rounded-full bg-surface/80 backdrop-blur-xs text-primary">
                <Heart className="w-3.5 h-3.5 fill-primary" />
              </button>
            </div>

            <div className="p-2.5">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-heading font-bold text-xs text-primary">
                  G+1 Luxury Villa in Bole
                </h4>
                <div className="flex items-center text-label text-muted">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                  4.9
                </div>
              </div>

              <div className="flex items-center gap-1 text-label text-muted mb-2">
                <MapPin className="w-3 h-3 text-primary" /> Bole Medhanialem
              </div>

              <div className="flex items-center justify-between border-t border-line/60 pt-2">
                <div>
                  <span className="text-xs font-extrabold text-primary">
                    45,000 ETB
                  </span>
                  <span className="text-label text-muted"> / month</span>
                </div>
                <div className="bg-accent text-primary text-label font-semibold px-2 py-0.5 rounded-full">
                  Book Tour
                </div>
              </div>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-hidden text-label mb-2">
            <span className="px-2 py-1 bg-primary text-white font-medium rounded-lg whitespace-nowrap">
              3 Bed Villa
            </span>
            <span className="px-2 py-1 bg-surface border border-line text-body rounded-lg whitespace-nowrap">
              Generator
            </span>
            <span className="px-2 py-1 bg-surface border border-line text-body rounded-lg whitespace-nowrap">
              Furnished
            </span>
          </div>

          {/* Bottom Nav Bar Mock */}
          <div className="mt-auto pt-2 border-t border-line flex items-center justify-around text-muted">
            <div className="flex flex-col items-center text-primary">
              <Building2 className="w-4 h-4" />
              <span className="text-label font-semibold">Explore</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-4 h-4" />
              <span className="text-label">Map</span>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-4 h-4" />
              <span className="text-label">Saved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Element 1: Top Left Verified Property Card */}
      <div
        ref={card1Ref}
        className="absolute top-4 -left-4 sm:-left-8 z-30 bg-surface/90 backdrop-blur-md p-3.5 rounded-card border border-line shadow-xl max-w-[210px] sm:max-w-[230px]"
      >
        <div className="flex items-center gap-2.5 mb-2">
          <div className="relative w-10 h-10 rounded-control overflow-hidden shrink-0 border border-line">
            <img
              src="/images/hero_property.png"
              alt="Villa"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1 text-label font-bold text-primary">
              Bole Atlas Villa
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            </div>
            <div className="text-label text-muted flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5 text-primary" /> Addis Ababa
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-canvas p-1.5 rounded-lg border border-line/80">
          <span className="text-xs font-black text-primary">
            45,000 Birr
          </span>
          <span className="text-label font-semibold text-muted">
            100% Inspected
          </span>
        </div>
      </div>

      {/* Floating Element 2: Bottom Right Certified Broker Card */}
      <div
        ref={card2Ref}
        className="absolute -bottom-4 right-0 sm:-right-6 z-30 bg-surface/95 backdrop-blur-md p-3.5 rounded-card border border-line shadow-xl max-w-[210px] sm:max-w-[240px]"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-accent shrink-0">
            <img
              src="/images/avatar_abebe.png"
              alt="Abebe Broker"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-body truncate">
                Abebe T.
              </span>
              <span className="px-1.5 py-0.2 rounded-full text-label font-extrabold bg-accent/40 text-primary">
                Verified
              </span>
            </div>
            <div className="text-label text-muted font-medium truncate">
              Certified Delala Broker
            </div>
            <div className="flex items-center gap-1 text-label text-amber-500 font-bold mt-0.5">
              <Star className="w-3 h-3 fill-amber-400" /> 4.98 (120+ homes)
            </div>
          </div>
        </div>
      </div>

      {/* Floating Element 3: Top Right Interactive Location Pin Snippet */}
      <div
        ref={card3Ref}
        className="absolute top-12 -right-4 sm:-right-10 z-30 bg-primary text-canvas p-3 rounded-card shadow-xl border border-accent/30 max-w-[180px]"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-control bg-accent/20 flex items-center justify-center text-accent shrink-0">
            <MapPin className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Kazanchis</div>
            <div className="text-label text-accent font-medium">
              42 Available Homes
            </div>
          </div>
        </div>
      </div>

      {/* Floating Element 4: Bottom Left Instant Direct Contact Alert */}
      <div
        ref={card4Ref}
        className="absolute bottom-16 -left-6 sm:-left-12 z-30 bg-surface/90 backdrop-blur-md p-2.5 px-3.5 rounded-full border border-line shadow-lg flex items-center gap-2.5"
      >
        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <PhoneCall className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-label font-bold text-body flex items-center gap-1">
            Direct Owner Chat
          </div>
          <div className="text-label text-muted">No hidden fees</div>
        </div>
      </div>
    </div>
  );
}
