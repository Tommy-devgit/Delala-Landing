"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        scrolled
          ? "bg-[#FAF8F4]/90 backdrop-blur-md border-b border-[#ECE7DA] py-3.5 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Amharic Script Tag */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <span className="font-heading font-black text-2xl tracking-tight text-[#4C061D] group-hover:text-[#3B3923] transition-colors">
              Delala
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] font-bold text-xs border border-[#B4C292]/50">
              ደላላ
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 bg-white/90 backdrop-blur-md px-8 py-2.5 rounded-full border border-[#ECE7DA] shadow-xs text-sm font-bold text-[#2D2D2D]"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-[#4C061D] transition-colors relative py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons: Download App CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#download"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#4C061D] text-white font-bold text-sm shadow-sm hover:bg-[#3B3923] transition-all duration-200 group"
            >
              <span>Download App</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-[#ECE7DA] text-[#2D2D2D] hover:bg-[#FAF8F4] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF8F4] border-b border-[#ECE7DA] px-6 py-5 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DA]">
              <span className="text-xs font-bold text-[#736F4E] uppercase tracking-wider">
                Menu Navigation
              </span>
              <span className="text-xs text-[#4C061D] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B4C292]" /> Verified Platform
              </span>
            </div>

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-bold text-[#2D2D2D] hover:text-[#4C061D] transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-2">
              <a
                href="#download"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3.5 rounded-2xl bg-[#4C061D] text-white font-bold text-sm shadow-md"
              >
                Download Delala App
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
