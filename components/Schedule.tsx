"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "../wedding.config";

const events = weddingConfig.schedule;



function FlowerPin({ petalColor }: { petalColor: string }) {
  return (
    <div className="relative z-10 col-start-2 row-start-1 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 border border-[#e8b4c0] shadow-md shadow-[#d88d9c]/20 backdrop-blur-sm">
      <svg
        viewBox="0 0 40 40"
        className="h-7 w-7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer Petals rotated around exact center */}
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M20 20 C14 13 14 5 20 4 C26 5 26 13 20 20 Z"
            fill={petalColor}
            stroke="#ffffff"
            strokeWidth="0.75"
            transform={`rotate(${angle} 20 20)`}
          />
        ))}
        {/* Inner Blossom Petals for botanical dimension */}
        {[36, 108, 180, 252, 324].map((angle) => (
          <path
            key={angle}
            d="M20 20 C16 15 16 9 20 8.5 C24 9 24 15 20 20 Z"
            fill="#f7cbd3"
            opacity="0.75"
            transform={`rotate(${angle} 20 20)`}
          />
        ))}
        {/* Golden pistil center */}
        <circle cx="20" cy="20" r="3.5" fill="#c89f56" stroke="#ffffff" strokeWidth="0.75" />
        <circle cx="18.8" cy="18.8" r="1" fill="#ffffff" opacity="0.8" />
      </svg>
    </div>
  );
}

export default function Schedule() {
  return (
    <section 
      id="schedule" 
      className="relative overflow-hidden bg-transparent px-4 py-20 md:py-32"
    >
      {/* Ambient soft glow accents positioned for mobile and desktop */}
      <div className="pointer-events-none absolute -left-16 top-10 h-72 w-72 rounded-full bg-[#fce7ea]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-palm-leaf/20 blur-3xl" />

      <motion.div
        className="relative mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative mb-14 text-center">
          {/* Subtle mobile-visible botanical flourish above header */}
          <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-25" aria-hidden="true">
            <Image
              src="/vines.png"
              alt=""
              width={130}
              height={50}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />
          </div>
          <p className="relative z-10 text-xs font-bold uppercase tracking-[0.3em] text-[#c47585]">Wedding day</p>
          <h2 className="relative z-10 mt-3 font-serif text-4xl font-semibold text-evergreen md:text-5xl">The Itinerary</h2>
          <div className="relative z-10 mt-4 flex items-center justify-center gap-3 text-hunter-green">
            <span className="h-px w-8 bg-[#e2a8b5]" />
            <p>{weddingConfig.event.date} · {weddingConfig.location.areaEn}</p>
            <span className="h-px w-8 bg-[#e2a8b5]" />
          </div>
        </div>

        <ol className="relative mx-auto max-w-2xl space-y-5 before:absolute before:bottom-8 before:left-1/2 before:top-8 before:w-px before:-translate-x-1/2 before:border-l-2 before:border-dashed before:border-[#e2a8b5]">
          {events.map(({ time, title, detail, flower }, index) => (
            <motion.li
              key={time}
              className={`relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 ${index % 2 === 0 ? "md:-translate-x-12" : "md:translate-x-12"}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className={index % 2 === 0 ? "col-start-1" : "col-start-3"}>
                <div className="relative overflow-hidden rounded-[2rem] border border-[#f5d7df] bg-white/95 px-5 py-5 shadow-lg shadow-[#d88d9c]/10 backdrop-blur-sm md:px-6">
                  {/* Subtle corner watermark visible on mobile devices */}
                  <div className="pointer-events-none absolute -bottom-5 -right-5 w-16 h-16 opacity-15" aria-hidden="true">
                    <Image src="/vines.png" alt="" fill sizes="64px" className="object-contain rotate-45" />
                  </div>
                  <time className="relative z-10 font-serif text-sm font-semibold tracking-[0.15em] text-[#c47585]">{time}</time>
                  <h3 className="relative z-10 mt-1 font-serif text-xl font-semibold text-evergreen md:text-2xl">{title}</h3>
                  <p className="relative z-10 mt-1.5 text-sm leading-relaxed text-hunter-green">{detail}</p>
                </div>
              </div>
              <FlowerPin petalColor={flower} />
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}


// FAQ Component — Rich Emerald Night Contrast with Pink & Gold Accents

const faqs = weddingConfig.faqs;

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative overflow-hidden bg-hunter-green px-4 pb-24 pt-16 md:pb-32 md:pt-24 text-lime-cream">
      {/* FAQ background image with rich emerald marble & gold veins texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay"
        style={{ backgroundImage: "url('/FAQ.png')" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hunter-green via-evergreen/95 to-[#0e1d13]" aria-hidden="true" />
      
      {/* Ambient glowing orbs */}
      <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-[#d88d9c]/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 bottom-16 h-72 w-72 rounded-full bg-warm-gold/15 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl z-20">
        <p className="mb-2 text-center font-serif text-xl italic text-[#f7c5ce] tracking-wide">
          Any Questions?
        </p>
        <h2 className="mb-10 text-center font-serif text-4xl font-semibold md:text-5xl tracking-wide text-[#edd7a6] bg-gradient-to-r from-[#dfb76c] via-[#faecd0] to-[#dfb76c] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(223,183,108,0.25)]">
          FAQ
        </h2>

        <div className="space-y-4 pt-2">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-evergreen/80 backdrop-blur-md border border-palm-leaf/35 shadow-xl shadow-black/25 overflow-hidden transition-all duration-300 hover:border-[#f0cbd3]/50"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-lg font-medium text-lime-cream text-left transition-colors hover:text-[#f7c5ce]"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-serif">{item.question}</span>
                <span className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-hunter-green/90 border border-palm-leaf/50 text-lg font-semibold text-[#f7c5ce] shadow-sm">
                  {openIndex === idx ? "–" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 pt-1 text-lime-cream/90 bg-black/20 border-t border-palm-leaf/25 leading-relaxed text-sm md:text-base font-sans"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FAQ };

