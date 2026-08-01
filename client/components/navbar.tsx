"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 sm:py-3.5" : "py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl border border-[#ECE7DA] rounded-xl px-6 py-2.5 shadow-sm"
              : "bg-transparent py-1 px-2"
          }`}
        >
          {/* FAR LEFT: Brand Logo */}
          <div className="flex items-center shrink-0 z-10">
            <Link href="/" className="group flex items-center gap-2">
              <span className="font-serif-display font-light text-2xl tracking-tight text-[#4C061D] group-hover:text-[#3B3923] transition-colors">
                DELALA
              </span>
              <span className="font-mono-label text-[9px] text-[#736F4E] border border-[#ECE7DA] px-1.5 py-0.5 rounded-sm">
                ET
              </span>
            </Link>
          </div>

          {/* CENTER: Navigation Links (Ghost button layout from design.md) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center justify-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2 text-sm text-[#2D2D2D]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors text-xs lg:text-sm font-medium tracking-tight py-1 relative ${
                    isActive ? "text-[#4C061D] font-bold" : "hover:text-[#4C061D] text-[#736F4E]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4C061D] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* FAR RIGHT: Primary White-on-Burgundy Action Button (design.md 8px radius, trailing arrow) */}
          <div className="hidden md:flex items-center gap-4 shrink-0 z-10">
            <Link
              href="/download"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#4C061D] text-white font-medium text-xs sm:text-sm shadow-xs hover:bg-[#3B3923] transition-all duration-200 group active:scale-98"
            >
              <span>Download App</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white border border-[#ECE7DA] text-[#2D2D2D] hover:bg-[#FAF8F4] transition-colors z-10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-[#ECE7DA] p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DA]">
              <span className="font-serif-display text-xl text-[#4C061D]">
                DELALA
              </span>
              <span className="font-mono-label text-[10px] text-[#736F4E]">NAV</span>
            </div>

            <div className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors py-1 ${
                      isActive ? "text-[#4C061D] font-bold" : "text-[#2D2D2D] hover:text-[#4C061D]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#ECE7DA]">
              <Link
                href="/download"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3 rounded-lg bg-[#4C061D] text-white font-medium text-sm shadow-sm"
              >
                Download App →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

