"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { ArrowUpRight, Menu, X, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF8F4]/85 backdrop-blur-md border-b border-[#ECE7DA]/80 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C061D] rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4C061D] flex items-center justify-center text-[#B4C292] font-semibold text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
              D
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-[#4C061D]">
                  Delala
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#B4C292]/30 text-[#4C061D] border border-[#B4C292]/40">
                  ደላላ
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#ECE7DA] shadow-xs">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 text-sm font-medium text-[#2D2D2D]/80 hover:text-[#4C061D] hover:bg-[#FAF8F4] rounded-full transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#download"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4C061D] text-[#FAF8F4] font-medium text-sm shadow-sm hover:bg-[#3B3923] hover:shadow-md active:scale-98 transition-all duration-200 group"
            >
              <Smartphone className="w-4 h-4 text-[#B4C292] group-hover:rotate-12 transition-transform duration-300" />
              <span>Download App</span>
              <ArrowUpRight className="w-4 h-4 text-[#B4C292]/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white border border-[#ECE7DA] text-[#2D2D2D] hover:text-[#4C061D] focus:outline-none focus:ring-2 focus:ring-[#4C061D]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#FAF8F4]/95 backdrop-blur-xl border-b border-[#ECE7DA] overflow-hidden"
          >
            <div className="px-5 pt-3 pb-6 space-y-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-[#2D2D2D] hover:text-[#4C061D] hover:bg-white rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <a
                  href="#download"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#4C061D] text-[#FAF8F4] font-medium text-base shadow-sm"
                >
                  <Smartphone className="w-5 h-5 text-[#B4C292]" />
                  <span>Download Delala App</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
