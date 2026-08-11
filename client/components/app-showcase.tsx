"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  ShieldCheck,
  MapPin,
  BellRing,
  MessageSquare,
  QrCode,
  CheckCircle2,
  Star,
  Search,
  SlidersHorizontal,
  Building2,
  Heart,
  Check,
} from "lucide-react";

export function AppShowcase() {
  const [activeScreen, setActiveScreen] = useState<"search" | "map" | "chat">("search");

  return (
    <section id="app-showcase" className="py-16 sm:py-20 lg:py-24 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main App Showcase Container */}
        <div className="bg-primary rounded-control p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-accent/30">
          
          {/* Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-accent/20 via-transparent to-transparent blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Column: Conversion Copy & App Features Checklist */}
            <div className="lg:col-span-6">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Ethiopian house hunting, digitized on your mobile phone.
              </h2>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal mb-8 max-w-lg">
                Download the free Delala mobile app to browse 100% physically verified homes, filter by exact sub-cities, schedule tours in 1-click, and chat directly with verified owners across Ethiopia.
              </p>

              {/* Screen Preview Toggle Pills */}
              <div className="flex items-center gap-2 mb-8 bg-black/30 p-1.5 rounded-full border border-white/15 max-w-md">
                <button
                  onClick={() => setActiveScreen("search")}
                  className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all ${
                    activeScreen === "search"
                      ? "bg-surface text-primary shadow-md"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Verified Feed
                </button>

                <button
                  onClick={() => setActiveScreen("map")}
                  className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all ${
                    activeScreen === "map"
                      ? "bg-accent text-primary shadow-md"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Sub-City Map
                </button>

                <button
                  onClick={() => setActiveScreen("chat")}
                  className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all ${
                    activeScreen === "chat"
                      ? "bg-surface text-primary shadow-md"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Direct Chat
                </button>
              </div>

              {/* Checklist Requirements */}
              <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white/95">
                  <div className="w-5 h-5 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>100% physically checked photos & legal document verification</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white/95">
                  <div className="w-5 h-5 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Real-time availability updates & instant Birr price alerts</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white/95">
                  <div className="w-5 h-5 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Direct owner messaging with zero hidden viewing fees</span>
                </div>
              </div>

              {/* Download Buttons & System Badges */}
              <div id="download" className="flex flex-wrap items-center gap-4">
                <a
                  href="#download"
                  className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-surface text-primary font-bold text-sm shadow-md hover:bg-canvas transition-all"
                >
                  <Smartphone className="w-5 h-5 text-primary" />
                  <div className="flex flex-col text-left">
                    <span className="text-label uppercase font-bold text-muted">Download for</span>
                    <span className="text-xs font-extrabold text-primary">iOS App Store</span>
                  </div>
                </a>

                <a
                  href="#download"
                  className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-primary-hover text-white font-bold text-sm shadow-md border border-accent/30 hover:bg-body transition-all"
                >
                  <Smartphone className="w-5 h-5 text-accent" />
                  <div className="flex flex-col text-left">
                    <span className="text-label uppercase font-bold text-accent">Get it on</span>
                    <span className="text-xs font-extrabold text-white">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Product Mobile Device Mockup */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/4.5] flex items-center justify-center select-none">
                
                {/* Device Frame */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-72 sm:w-80 h-[500px] bg-primary-hover rounded-control p-3 border-4 border-white/20 shadow-2xl overflow-hidden relative z-20"
                >
                  {/* Speaker Notch */}
                  <div className="w-24 h-4 bg-body rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-black mr-2" />
                    <div className="w-2 h-2 rounded-full bg-black" />
                  </div>

                  {/* Screen Content Container */}
                  <div className="w-full h-[calc(100%-24px)] bg-canvas rounded-lg p-4 text-body flex flex-col pt-3 font-sans overflow-hidden">
                    
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-line">
                      <span className="font-heading font-black text-base text-primary">
                        Delala
                      </span>
                      <span className="text-label font-bold text-primary bg-accent/30 px-2 py-0.5 rounded-full">
                        Addis Ababa
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      {activeScreen === "search" && (
                        <motion.div
                          key="search"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 flex flex-col justify-between"
                        >
                          <div className="bg-surface p-2.5 rounded-lg border border-line flex items-center gap-2 mb-3 shadow-2xs">
                            <Search className="w-3.5 h-3.5 text-muted" />
                            <span className="text-xs text-body/70 font-medium">Bole • 30k-50k ETB</span>
                            <SlidersHorizontal className="w-3.5 h-3.5 text-primary ml-auto" />
                          </div>

                          <div className="bg-surface rounded-lg border border-line overflow-hidden shadow-xs mb-3">
                            <div className="relative h-32 w-full">
                              <img src="/images/hero_home_away.jpg" alt="Bole Villa" className="w-full h-full object-cover" />
                              <span className="absolute top-2 left-2 bg-primary text-white text-label font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-2.5 h-2.5 text-accent" /> Verified
                              </span>
                            </div>
                            <div className="p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-xs text-primary">Bole Medhanialem Residence</span>
                                <div className="flex items-center text-label text-amber-500 font-bold">
                                  <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> 4.9
                                </div>
                              </div>
                              <div className="text-label font-extrabold text-primary mb-2">45,000 ETB / month</div>
                              <button className="w-full py-2 bg-primary text-white rounded-full text-xs font-bold">
                                Book Walkthrough
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeScreen === "map" && (
                        <motion.div
                          key="map"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 bg-line/50 rounded-lg p-3 flex flex-col justify-between relative overflow-hidden border border-line"
                        >
                          <div className="bg-surface/90 p-2.5 rounded-lg text-xs font-bold text-primary shadow-xs flex items-center justify-between">
                            <span>Sub-City Map View</span>
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>

                          <div className="space-y-2 my-auto">
                            <div className="bg-primary text-white p-2 rounded-lg text-xs font-bold shadow-md flex items-center justify-between">
                              <span>Bole Medhanialem</span>
                              <span className="bg-accent text-primary text-label px-2 py-0.5 rounded-full">42 Homes</span>
                            </div>
                            <div className="bg-surface text-body p-2 rounded-lg text-xs font-bold shadow-xs flex items-center justify-between">
                              <span>Kazanchis Sub-City</span>
                              <span className="text-label text-muted">28 Homes</span>
                            </div>
                            <div className="bg-surface text-body p-2 rounded-lg text-xs font-bold shadow-xs flex items-center justify-between">
                              <span>Old Airport Diplomatic</span>
                              <span className="text-label text-muted">19 Homes</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeScreen === "chat" && (
                        <motion.div
                          key="chat"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 flex flex-col justify-between"
                        >
                          <div className="flex items-center gap-2.5 bg-surface p-2.5 rounded-lg border border-line mb-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-accent">
                              <img src="/images/avatar_abebe.png" alt="Abebe Broker" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-body">Abebe (Verified Owner)</div>
                              <div className="text-label text-muted">Active Now • Bole Villa</div>
                            </div>
                          </div>

                          <div className="space-y-2 my-auto">
                            <div className="bg-canvas border border-line p-2.5 rounded-lg text-xs text-body max-w-[85%]">
                              Is Saturday at 3:00 PM good for the physical walkthrough?
                            </div>
                            <div className="bg-primary text-white p-2.5 rounded-lg text-xs max-w-[85%] ml-auto">
                              Yes perfect! See you at Bole Medhanialem.
                            </div>
                          </div>

                          <div className="bg-surface p-2 rounded-lg border border-line text-xs text-muted mt-3">
                            Type message...
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom App Nav */}
                    <div className="pt-2 border-t border-line flex items-center justify-around text-muted">
                      <div className="flex flex-col items-center text-primary">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="text-[8px] font-bold">Explore</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[8px]">Map</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Heart className="w-3.5 h-3.5" />
                        <span className="text-[8px]">Saved</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating QR Badge */}
                <div className="absolute top-8 -right-4 sm:-right-8 z-30 bg-surface p-3 rounded-lg border border-line shadow-xl max-w-[170px] hidden sm:block">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-primary" />
                    <div className="text-label">
                      <div className="font-extrabold text-primary">Scan QR</div>
                      <div className="text-muted">Instant Install</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
