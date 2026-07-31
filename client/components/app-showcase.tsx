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
} from "lucide-react";

export function AppShowcase() {
  const [activeScreen, setActiveScreen] = useState<"search" | "map" | "chat">("search");

  return (
    <section id="app-showcase" className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#4C061D] rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-[#B4C292]/30">
          
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#B4C292]/20 via-transparent to-transparent blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column: Copy & Value Proposition */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#B4C292] text-xs font-extrabold mb-6 border border-white/15">
                <Smartphone className="w-3.5 h-3.5" />
                <span>The Delala Mobile Experience</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Ethiopian house hunting, digitized in the palm of your hand.
              </h2>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal mb-8 max-w-lg">
                Download the free Delala app to explore 100% physically verified homes, schedule viewings in 1-click, and chat directly with certified owners across Ethiopia.
              </p>

              {/* Screen Preview Toggle Buttons */}
              <div className="flex items-center gap-2 mb-8 bg-black/30 p-1.5 rounded-2xl border border-white/15 max-w-md">
                <button
                  onClick={() => setActiveScreen("search")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    activeScreen === "search"
                      ? "bg-white text-[#4C061D] shadow-md"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Verified Feed
                </button>

                <button
                  onClick={() => setActiveScreen("map")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    activeScreen === "map"
                      ? "bg-[#B4C292] text-[#4C061D] shadow-md"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Sub-City Map
                </button>

                <button
                  onClick={() => setActiveScreen("chat")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    activeScreen === "chat"
                      ? "bg-white text-[#4C061D] shadow-md"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Direct Chat
                </button>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <ShieldCheck className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    100% In-Person Checked
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <BellRing className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    Instant Price Alerts
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <MapPin className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    Neighborhood Layers
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <MessageSquare className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    Zero Middleman Fees
                  </span>
                </div>
              </div>

              {/* Download Buttons & QR Code */}
              <div id="download" className="flex flex-wrap items-center gap-4">
                <a
                  href="#download"
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-[#4C061D] font-bold text-sm shadow-md hover:bg-[#FAF8F4] transition-all"
                >
                  <Smartphone className="w-5 h-5 text-[#4C061D]" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-semibold text-[#736F4E]">Download on</span>
                    <span className="text-xs font-extrabold text-[#4C061D]">App Store</span>
                  </div>
                </a>

                <a
                  href="#download"
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#3B3923] text-white font-bold text-sm shadow-md border border-[#B4C292]/30 hover:bg-[#2D2D2D] transition-all"
                >
                  <Smartphone className="w-5 h-5 text-[#B4C292]" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-semibold text-[#B4C292]">Get it on</span>
                    <span className="text-xs font-extrabold text-white">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Product Mobile Phone Frame */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/4.5] flex items-center justify-center select-none">
                
                {/* Outer Device Frame */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-72 sm:w-80 h-[500px] bg-[#3B3923] rounded-[44px] p-3 border-4 border-white/20 shadow-2xl overflow-hidden relative z-20"
                >
                  {/* Speaker Notch */}
                  <div className="w-24 h-4 bg-[#2D2D2D] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-black mr-2" />
                    <div className="w-2 h-2 rounded-full bg-black" />
                  </div>

                  {/* Screen Content Container */}
                  <div className="w-full h-[calc(100%-24px)] bg-[#FAF8F4] rounded-[34px] p-4 text-[#2D2D2D] flex flex-col pt-3 font-sans overflow-hidden">
                    
                    {/* App Bar - Clean Typography Brand Name */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#ECE7DA]">
                      <span className="font-heading font-black text-base text-[#4C061D]">
                        Delala
                      </span>
                      <span className="text-[10px] font-bold text-[#4C061D] bg-[#B4C292]/30 px-2 py-0.5 rounded-full">
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
                          <div className="bg-white p-2.5 rounded-xl border border-[#ECE7DA] flex items-center gap-2 mb-3 shadow-2xs">
                            <Search className="w-3.5 h-3.5 text-[#736F4E]" />
                            <span className="text-xs text-[#2D2D2D]/70 font-medium">Bole • 30k-50k ETB</span>
                            <SlidersHorizontal className="w-3.5 h-3.5 text-[#4C061D] ml-auto" />
                          </div>

                          <div className="bg-white rounded-2xl border border-[#ECE7DA] overflow-hidden shadow-xs mb-3">
                            <div className="relative h-32 w-full">
                              <img src="/images/hero_property.png" alt="Bole Villa" className="w-full h-full object-cover" />
                              <span className="absolute top-2 left-2 bg-[#4C061D] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-2.5 h-2.5 text-[#B4C292]" /> Verified
                              </span>
                            </div>
                            <div className="p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-xs text-[#4C061D]">Bole Medhanialem G+1</span>
                                <div className="flex items-center text-[10px] text-amber-500 font-bold">
                                  <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> 4.9
                                </div>
                              </div>
                              <div className="text-[11px] font-extrabold text-[#4C061D] mb-2">45,000 ETB / month</div>
                              <button className="w-full py-2 bg-[#4C061D] text-white rounded-xl text-xs font-bold">
                                Book Tour
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
                          className="flex-1 bg-[#ECE7DA]/50 rounded-2xl p-3 flex flex-col justify-between relative overflow-hidden border border-[#ECE7DA]"
                        >
                          <div className="bg-white/90 p-2.5 rounded-xl text-xs font-bold text-[#4C061D] shadow-xs flex items-center justify-between">
                            <span>Interactive Map View</span>
                            <MapPin className="w-4 h-4 text-[#4C061D]" />
                          </div>

                          <div className="space-y-2 my-auto">
                            <div className="bg-[#4C061D] text-white p-2 rounded-xl text-xs font-bold shadow-md flex items-center justify-between">
                              <span>Bole Medhanialem</span>
                              <span className="bg-[#B4C292] text-[#4C061D] text-[10px] px-2 py-0.5 rounded-full">42 Homes</span>
                            </div>
                            <div className="bg-white text-[#2D2D2D] p-2 rounded-xl text-xs font-bold shadow-xs flex items-center justify-between">
                              <span>Kazanchis Sub-City</span>
                              <span className="text-[10px] text-[#736F4E]">28 Homes</span>
                            </div>
                            <div className="bg-white text-[#2D2D2D] p-2 rounded-xl text-xs font-bold shadow-xs flex items-center justify-between">
                              <span>Old Airport Diplomatic</span>
                              <span className="text-[10px] text-[#736F4E]">19 Homes</span>
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
                          <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-[#ECE7DA] mb-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#B4C292]">
                              <img src="/images/avatar_abebe.png" alt="Abebe Broker" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#2D2D2D]">Abebe (Verified Owner)</div>
                              <div className="text-[9px] text-[#736F4E]">Active Now • Bole Villa</div>
                            </div>
                          </div>

                          <div className="space-y-2 my-auto">
                            <div className="bg-[#FAF8F4] border border-[#ECE7DA] p-2.5 rounded-2xl rounded-tl-xs text-xs text-[#2D2D2D] max-w-[85%]">
                              Is Saturday at 3:00 PM good for the physical walkthrough?
                            </div>
                            <div className="bg-[#4C061D] text-white p-2.5 rounded-2xl rounded-tr-xs text-xs max-w-[85%] ml-auto">
                              Yes perfect! See you at Bole Medhanialem.
                            </div>
                          </div>

                          <div className="bg-white p-2 rounded-xl border border-[#ECE7DA] text-xs text-[#736F4E] mt-3">
                            Type message...
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom App Nav Mock */}
                    <div className="pt-2 border-t border-[#ECE7DA] flex items-center justify-around text-[#736F4E]">
                      <div className="flex flex-col items-center text-[#4C061D]">
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

                {/* Floating Micro Badge */}
                <div className="absolute top-8 -right-4 sm:-right-8 z-30 bg-white p-3 rounded-2xl border border-[#ECE7DA] shadow-xl max-w-[170px] hidden sm:block">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-[#4C061D]" />
                    <div className="text-[10px]">
                      <div className="font-extrabold text-[#4C061D]">Scan QR</div>
                      <div className="text-[#736F4E]">Instant Install</div>
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
