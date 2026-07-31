"use client";

import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { Search, Users, KeyRound, CheckCircle2, ArrowRight } from "lucide-react";

export function HowItWorks() {
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
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4C061D]/10 text-[#4C061D] text-xs font-extrabold mb-4 border border-[#4C061D]/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>3 Simple Steps</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4 leading-tight">
            How Delala works for house hunters and owners.
          </h2>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
            Finding or sharing a property in Ethiopia is as simple as discover, connect, and finalize.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs hover:shadow-lg hover:border-[#B4C292] transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-heading font-black text-4xl text-[#736F4E]/40 group-hover:text-[#4C061D] transition-colors">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center">
                    {getIcon(step.icon)}
                  </div>
                </div>

                <h3 className="font-heading text-2xl font-bold text-[#4C061D] mb-1">
                  {step.title}
                </h3>
                <div className="text-xs font-semibold text-[#736F4E] mb-4 uppercase tracking-wider">
                  {step.subtitle}
                </div>

                <p className="text-sm sm:text-base text-[#2D2D2D]/80 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#ECE7DA] flex items-center justify-between text-xs font-bold text-[#4C061D]">
                <span>Step {step.number} of 03</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
