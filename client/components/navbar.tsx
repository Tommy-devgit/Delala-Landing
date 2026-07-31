"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { Menu, X, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar({ variant = "sticky" }: { variant?: "sticky" | "embedded" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (variant === "embedded") {
    return (
      <header className="w-full py-6 px-6 sm:px-10 flex items-center justify-between z-30 relative">
        {/* Brand Logo */}
        <Link href="/" className="font-heading font-black text-2xl tracking-tight text-white hover:opacity-90 transition-opacity">
          Delala
        </Link>

        {/* Center Integrated Pill Navigation bar */}
        <nav className="hidden md:flex items-center gap-6 bg-white/90 backdrop-blur-md px-8 py-2.5 rounded-full border border-white/40 shadow-sm text-sm font-medium text-[#2D2D2D]">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-[#4C061D] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#download"
            className="px-6 py-2.5 rounded-full bg-white text-[#4C061D] font-semibold text-sm shadow-sm hover:bg-[#FAF8F4] transition-all"
          >
            Download App
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>
    );
  }

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
          <Link href="/" className="font-heading font-black text-2xl tracking-tight text-[#4C061D]">
            Delala
          </Link>

          <nav className="hidden md:flex items-center gap-6 bg-white px-7 py-2 rounded-full border border-[#ECE7DA] shadow-xs text-sm font-medium text-[#2D2D2D]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-[#4C061D] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#download"
              className="px-5 py-2.5 rounded-full bg-[#4C061D] text-white font-medium text-sm shadow-xs hover:bg-[#3B3923] transition-colors"
            >
              Download App
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-[#ECE7DA] text-[#2D2D2D]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF8F4] border-b border-[#ECE7DA] px-6 py-4 space-y-3"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-[#2D2D2D] hover:text-[#4C061D]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-3 rounded-xl bg-[#4C061D] text-white font-semibold text-sm"
            >
              Download App
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
