"use client";

import { motion } from "framer-motion";
import { DETAILED_FEATURES } from "@/lib/constants";
import {
  ShieldCheck,
  MapPin,
  SlidersHorizontal,
  MessageSquare,
  FileText,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function Features() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-primary" />;
      case "MapPin":
        return <MapPin className="w-5 h-5 text-primary" />;
      case "SlidersHorizontal":
        return <SlidersHorizontal className="w-5 h-5 text-primary" />;
      case "MessageSquare":
        return <MessageSquare className="w-5 h-5 text-primary" />;
      case "FileText":
        return <FileText className="w-5 h-5 text-primary" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="font-mono-label text-label text-primary bg-surface px-3.5 py-1.5 rounded-full border border-line inline-block mb-4">
            PRODUCT CAPABILITIES
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-primary tracking-tight mb-6 leading-[0.95]">
            Built for physical <span className="italic font-normal text-ink">trust</span> & digital clarity.
          </h1>

          <p className="text-base sm:text-lg text-muted font-normal leading-relaxed">
            Delala isn’t just an online directory. We operate on-the-ground field verification teams to ensure every home, broker, and contract is 100% verified before you take a step outside.
          </p>
        </div>

        {/* VISUAL STORYTELLING SECTIONS */}
        <div className="space-y-16 lg:space-y-24">
          {DETAILED_FEATURES.map((feature, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Text Story Column */}
                <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-2"}`}>
                  <span className="font-mono-label text-label text-muted block mb-2">
                    {feature.tag}
                  </span>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-control bg-surface border border-line flex items-center justify-center shrink-0">
                      {getIcon(feature.icon)}
                    </div>
                    <h2 className="font-serif-display text-3xl sm:text-4xl font-light text-ink tracking-tight">
                      {feature.title}
                    </h2>
                  </div>

                  <p className="text-base text-muted leading-relaxed font-normal mb-6">
                    {feature.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-2.5 mb-8">
                    {feature.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-mono-label text-label text-primary-hover font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/download"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium text-xs sm:text-sm hover:bg-primary-hover transition-colors group"
                  >
                    <span>Experience on App</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Visual Image Column */}
                <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                  <div className="relative rounded-card overflow-hidden border border-line shadow-xl bg-ink group aspect-[4/3]">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                      <span className="font-mono-label text-label text-accent bg-black/50 px-3 py-1 rounded-full border border-white/20">
                        {feature.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

