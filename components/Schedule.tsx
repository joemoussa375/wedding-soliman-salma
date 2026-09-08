"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "../wedding.config";

const events = weddingConfig.schedule;



function Flower({ color }: { color: string }) {
  return (
    <span className="relative block h-11 w-11" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((rotation) => (
        <span
          key={rotation}
          className="absolute left-1/2 top-1/2 h-5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-[75%_25%_75%_25%]"
          style={{ backgroundColor: color, transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-10px)` }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-warm-gold/70 bg-warm-gold" />
    </span>
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
                    <Image src="/vines.png" alt="" fill className="object-contain rotate-45" />
                  </div>
                  <time className="relative z-10 font-serif text-sm font-semibold tracking-[0.15em] text-[#c47585]">{time}</time>
                  <h3 className="relative z-10 mt-1 font-serif text-xl font-semibold text-evergreen md:text-2xl">{title}</h3>
                  <p className="relative z-10 mt-1.5 text-sm leading-relaxed text-hunter-green">{detail}</p>
                </div>
              </div>
              <div className="relative z-10 col-start-2 row-start-1 rounded-full bg-[#fcebee] border border-[#e8b4c0] p-1.5 shadow-sm">
                <Flower color={flower} />
              </div>
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
    <section className="relative overflow-hidden bg-hunter-green px-4 pb-24 pt-32 md:pb-32 md:pt-40 text-lime-cream">
      {/* Seamless curved arch transition from the light body background into deep emerald night */}
      <div className="absolute top-0 inset-x-0 h-16 sm:h-24 pointer-events-none z-10 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-full text-[#faf7f5] fill-current"
        >
          <path d="M0,0 L1200,0 L1200,40 Q600,120 0,40 Z" />
        </svg>
      </div>

      {/* Gentle gradient fog so the arch edge softens into the dark foliage */}
      <div 
        className="pointer-events-none absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#faf7f5]/30 via-transparent to-transparent z-10" 
        aria-hidden="true" 
      />

      {/* FAQ background image with rich emerald marble & gold veins texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-85 mix-blend-overlay"
        style={{ backgroundImage: "url('/FAQ.png')" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hunter-green/85 via-evergreen/90 to-[#0e1d13]" aria-hidden="true" />
      
      {/* Ambient glowing orbs */}
      <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-[#d88d9c]/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 bottom-16 h-72 w-72 rounded-full bg-warm-gold/15 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl z-20">
        <p className="mb-2 text-center font-serif text-xl italic text-[#f7c5ce] tracking-wide">
          Any Questions?
        </p>
        <h2 className="mb-10 text-center font-serif text-4xl font-semibold text-warm-gold md:text-5xl">
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

