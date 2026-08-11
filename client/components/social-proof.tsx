"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS_DATA } from "@/lib/constants";
import { ShieldCheck, Award, MapPin, Smile } from "lucide-react";

function Counter({ targetValue }: { targetValue: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const numericMatch = targetValue.match(/\d+[\d,]*/);
  const rawNumber = numericMatch ? parseInt(numericMatch[0].replace(/,/g, ""), 10) : 0;
  const suffix = targetValue.replace(/[\d,]/g, "");

  useEffect(() => {
    if (!isInView) return;

    const start = 0;
    const duration = 2000;
    const frameTime = 1000 / 60;
    const totalFrames = Math.round(duration / frameTime);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(rawNumber * (1 - Math.pow(1 - progress, 3)));
      setCount(currentCount);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(rawNumber);
      }
    }, frameTime);

    return () => clearInterval(timer);
  }, [isInView, rawNumber]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function SocialProof() {
  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <ShieldCheck className="w-5 h-5 text-primary" />;
      case 1:
        return <Award className="w-5 h-5 text-primary" />;
      case 2:
        return <MapPin className="w-5 h-5 text-primary" />;
      case 3:
        return <Smile className="w-5 h-5 text-primary" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-canvas relative border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-surface p-6 rounded-lg border border-line shadow-xs text-center hover:border-accent hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between group"
            >
              <div className="w-10 h-10 rounded-lg bg-canvas border border-line flex items-center justify-center mb-3 group-hover:bg-primary/5 transition-colors">
                {getStatIcon(idx)}
              </div>

              <div>
                <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight mb-1">
                  <Counter targetValue={stat.value} />
                </div>
                <div className="font-heading text-sm sm:text-base font-bold text-body mb-1">
                  {stat.label}
                </div>
                <p className="text-xs text-muted font-medium leading-normal">
                  {stat.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
