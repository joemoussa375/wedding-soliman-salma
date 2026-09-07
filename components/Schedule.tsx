"use client";

import { useState } from "react";
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
    <section id="schedule" className="relative overflow-hidden bg-[url('/images.png')] bg-cover bg-center px-4 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Duck animation removed; background image now provides visual */}
      </div>
      <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-lime-cream/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-evergreen/10 blur-3xl" />

      <motion.div
        className="relative mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mb-14 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-hunter-green">Wedding day</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-evergreen md:text-5xl">The Itinerary</h2>
          <div className="mt-4 flex items-center justify-center gap-3 text-hunter-green">
            <span className="h-px w-8 bg-hunter-green/45" />
            <p>{weddingConfig.event.date} · {weddingConfig.location.areaEn}</p>
            <span className="h-px w-8 bg-hunter-green/45" />
          </div>
        </div>

        <ol className="relative mx-auto max-w-2xl space-y-5 before:absolute before:bottom-8 before:left-1/2 before:top-8 before:w-px before:-translate-x-1/2 before:border-l-2 before:border-dashed before:border-hunter-green/40">
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
                <div className="rounded-[2rem] border border-lime-cream/75 bg-[#fcf8ed]/85 px-5 py-5 shadow-lg shadow-hunter-green/10 backdrop-blur-sm md:px-6">
                  <time className="font-serif text-sm font-semibold tracking-[0.15em] text-fern">{time}</time>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-evergreen md:text-2xl">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-hunter-green">{detail}</p>
                </div>
              </div>
              <div className="relative z-10 col-start-2 row-start-1 rounded-full bg-[#90AA90] p-1.5"><Flower color={flower} /></div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}


// FAQ Component

const faqs = weddingConfig.faqs;

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[var(--color-hunter-green)] px-4 pb-24 pt-32 md:pb-32 md:pt-40 text-[var(--color-lime-cream)]">
      {/* FAQ background image with dark overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/FAQ.png')" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[var(--color-hunter-green)]/70" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl">
        <p className="mb-3 text-center font-serif text-xl italic text-[var(--color-lime-cream)]/80 tracking-wide">
          Any Questions?
        </p>
        <h2 className="mb-12 text-center font-serif text-4xl font-semibold text-[var(--color-warm-gold)]">
          FAQ
        </h2>

        <div className="space-y-6 pt-6">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-xl bg-[var(--color-evergreen)]/70 backdrop-blur-md border border-gray-700/50 overflow-hidden"
            >
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-lg font-medium text-[var(--color-lime-cream)] text-left"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span>{item.question}</span>
                <span className="ml-2 text-2xl">{openIndex === idx ? "–" : "+"}</span>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 px-4 py-3 text-[var(--color-lime-cream)] bg-[var(--color-evergreen)]/50 rounded-b-xl shadow-lg"
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

