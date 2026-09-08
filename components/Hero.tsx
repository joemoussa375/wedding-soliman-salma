"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Countdown from "./Countdown";
import { weddingConfig } from "../wedding.config";

export default function Hero() {
  const { couple, event, location } = weddingConfig;

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-4 py-2 sm:py-4 md:py-8 text-center">
      <motion.div
        className="z-10 flex flex-col items-center gap-1.5 sm:gap-2.5 md:gap-5 my-auto max-w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="p-1 md:p-2 font-serif text-4xl sm:text-5xl font-bold tracking-widest md:text-7xl leading-tight">
          <span className="block md:inline bg-gradient-to-r from-evergreen via-hunter-green to-fern bg-clip-text text-transparent">{couple.partner1}</span>{" "}
          <span className="block md:inline my-0 md:my-0 text-3xl sm:text-4xl md:text-7xl font-normal md:font-bold text-[#d88d9c] drop-shadow-sm">{couple.ampersand || "&"}</span>{" "}
          <span className="block md:inline bg-gradient-to-r from-fern via-hunter-green to-evergreen bg-clip-text text-transparent">{couple.partner2}</span>
        </h1>

        <div className="relative inline-flex isolate items-center overflow-hidden rounded-full bg-[#fff6f8]/90 border border-[#f0c2cc] px-8 py-1.5 sm:px-10 sm:py-1.5 md:px-12 md:py-2 shadow-[0_4px_16px_rgba(216,141,156,0.18)] backdrop-blur-sm">
          <Image
            src="/vines.png"
            alt=""
            width={90}
            height={110}
            style={{ width: "auto", height: "auto" }}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-9 -left-5 opacity-25 mix-blend-multiply -rotate-12"
          />
          <p className="relative z-10 text-sm sm:text-base font-bold tracking-[0.16em] text-evergreen md:text-lg">
            {event.tagline}
          </p>
          <Image
            src="/vines.png"
            alt=""
            width={90}
            height={110}
            style={{ width: "auto", height: "auto" }}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-9 -right-5 scale-x-[-1] opacity-25 mix-blend-multiply rotate-12"
          />
        </div>

        <motion.div
          className="my-0.5 md:my-1 h-px w-20 md:w-24 bg-[#e2a8b5]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
        />

        <div className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-2 text-evergreen">
          <p className="text-[0.68rem] sm:text-[0.7rem] font-semibold tracking-[0.28em] text-[#c47585]">
            {event.saveTheDateBadge}
          </p>
          <p className="font-serif text-2xl font-semibold tracking-wide md:text-3xl">
            {event.date}
          </p>
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-hunter-green md:text-sm">
            <span className="h-px w-7 md:w-8 bg-[#e2a8b5]" aria-hidden="true" />
            <span>{location.areaEn}</span>
            <span className="h-px w-7 md:w-8 bg-[#e2a8b5]" aria-hidden="true" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Countdown />
        </motion.div>

        {/* Scroll hint indicator */}
        <motion.div
          className="mt-1.5 sm:mt-2.5 md:mt-4 flex flex-col items-center gap-1 cursor-pointer select-none group"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
          onClick={() => {
            const scheduleElem = document.getElementById("schedule");
            if (scheduleElem) {
              scheduleElem.scrollIntoView({ behavior: "smooth" });
            } else {
              window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
            }
          }}
        >
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-hunter-green/80 group-hover:text-evergreen transition-colors">
            Scroll to explore
          </p>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#c47585]"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 stroke-current"
              fill="none"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 10l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
