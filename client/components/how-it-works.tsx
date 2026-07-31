"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { Search, Users, KeyRound, CheckCircle2, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Search":
        return <Search className="w-6 h-6 text-[#4C061D]" />;
      case "Users":
        return <Users className="w-6 h-6 text-[#4C061D]" />;
      case "KeyRound":
        return <KeyRound className="w-6 h-6 text-[#4C061D]" />;
      default:
        return <Search className="w-6 h-6 text-[#4C061D]" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#FAF8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] text-xs font-bold mb-4">
            <span>Simple 3-Step Journey</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4">
            How Delala works for home hunters.
          </h2>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
            Finding your dream house in Ethiopia is now as simple as tap, visit, and move in.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                onClick={() => setActiveStep(idx)}
                className={`relative bg-white p-8 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "border-[#4C061D] shadow-xl ring-2 ring-[#4C061D]/10 bg-gradient-to-b from-white to-[#FAF8F4]"
                    : "border-[#ECE7DA] shadow-xs hover:border-[#B4C292] hover:shadow-md"
                }`}
              >
                {/* Step Number Badge */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading font-black text-4xl text-[#B4C292]/60">
                      {step.number}
                    </span>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-[#4C061D] text-[#B4C292] shadow-md scale-105"
                          : "bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D]"
                      }`}
                    >
                      {getIcon(step.icon)}
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-[#4C061D] mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#736F4E] mb-4">
                    {step.subtitle}
                  </div>

                  <p className="text-sm sm:text-base text-[#2D2D2D]/80 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="bg-[#FAF8F4] p-3 rounded-2xl border border-[#ECE7DA] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B4C292] shrink-0" />
                  <span className="text-xs font-medium text-[#4C061D]">
                    {step.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Step Preview Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#ECE7DA] shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-[#736F4E] uppercase tracking-wider mb-2 block">
              Step {HOW_IT_WORKS_STEPS[activeStep].number} Spotlight
            </span>
            <h4 className="font-heading text-2xl font-extrabold text-[#4C061D] mb-3">
              {HOW_IT_WORKS_STEPS[activeStep].title} — {HOW_IT_WORKS_STEPS[activeStep].subtitle}
            </h4>
            <p className="text-sm sm:text-base text-[#2D2D2D]/80 leading-relaxed mb-6">
              {HOW_IT_WORKS_STEPS[activeStep].description}
            </p>
            <a
              href="#download"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#4C061D] hover:text-[#3B3923] group"
            >
              <span>Get started on the Delala app</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="relative w-full lg:w-96 aspect-[4/3] bg-[#3B3923] rounded-2xl overflow-hidden border border-[#ECE7DA] shadow-md flex items-center justify-center p-6 text-center">
            <img
              src="/images/hero_property.png"
              alt="How it works preview"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 bg-white/90 backdrop-blur-md p-4 rounded-xl text-[#4C061D] border border-[#ECE7DA]">
              <span className="font-heading text-base font-bold block mb-1">
                Verified Search Active
              </span>
              <span className="text-xs text-[#2D2D2D]/80">
                100% In-Person Physical Check Included
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
