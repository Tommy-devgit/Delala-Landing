"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 sm:py-4" : "py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "bg-white/85 backdrop-blur-md border border-[#ECE7DA] rounded-full px-6 py-2.5 shadow-sm"
              : "bg-transparent py-1 px-2"
          }`}
        >
          {/* FAR LEFT: Logo */}
          <div className="flex items-center shrink-0 z-10">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-heading font-black text-2xl tracking-tight text-[#4C061D] group-hover:text-[#3B3923] transition-colors">
                Delala
              </span>
              <span className="text-xs font-extrabold text-[#736F4E] bg-[#FAF8F4] border border-[#ECE7DA] px-2 py-0.5 rounded-md tracking-wider">
                ደላላ
              </span>
            </Link>
          </div>

          {/* PERFECTLY CENTERED: Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center justify-center gap-7 lg:gap-9 absolute left-1/2 -translate-x-1/2 text-sm font-bold text-[#2D2D2D]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors text-xs lg:text-sm font-bold tracking-tight py-1 relative ${
                    isActive ? "text-[#4C061D]" : "hover:text-[#4C061D] text-[#2D2D2D]/80"
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

          {/* FAR RIGHT: Download App Button */}
          <div className="hidden md:flex items-center shrink-0 z-10">
            <Link
              href="/download"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#4C061D] text-white font-bold text-xs sm:text-sm shadow-xs hover:bg-[#3B3923] transition-all duration-200 group"
            >
              <span>Download App</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-[#ECE7DA] text-[#2D2D2D] hover:bg-[#FAF8F4] transition-colors z-10"
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
            className="md:hidden mx-4 mt-2 bg-white/95 backdrop-blur-md rounded-3xl border border-[#ECE7DA] p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DA]">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-lg text-[#4C061D]">
                  Delala
                </span>
                <span className="text-xs font-bold text-[#736F4E]">ደላላ</span>
              </div>
              <span className="text-xs text-[#736F4E] font-medium">Navigation</span>
            </div>

            <div className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-bold transition-colors py-1 ${
                      isActive ? "text-[#4C061D]" : "text-[#2D2D2D] hover:text-[#4C061D]"
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
                className="block text-center py-3 rounded-2xl bg-[#4C061D] text-white font-bold text-sm shadow-sm"
              >
                Download App
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
