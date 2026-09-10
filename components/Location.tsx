"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "../wedding.config";

export default function Location() {
  const { location } = weddingConfig;

  return (
    <section className="relative overflow-hidden bg-transparent px-4 pt-20 pb-36 md:pt-32 md:pb-48">
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#d88d9c]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-12 h-64 w-64 rounded-full bg-palm-leaf/15 blur-3xl" />

      <motion.div
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-[#f2cbd4] bg-white/95 shadow-xl shadow-[#d88d9c]/10"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="grid md:grid-cols-[0.85fr_1.15fr]">
          {/* Location image */}
          <div className="relative min-h-72 overflow-hidden">
            <Image
              src={location.venueImage}
              alt={location.venueNameAr}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 340px"
            />
          </div>

          <div className="p-8 text-center sm:p-12 md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c47585]">Where to find us</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-evergreen">The Location</h2>
            <div className="mt-6 h-px w-16 bg-[#e2a8b5] md:mx-0 mx-auto" />
            <p className="mt-6 font-serif text-2xl font-semibold text-evergreen" lang="ar" dir="rtl">{location.venueNameAr}</p>
            {location.hallNameAr && (
              <p className="mt-1 font-serif text-xl font-medium text-fern" lang="ar" dir="rtl">{location.hallNameAr}</p>
            )}
            <p className="mt-2 text-hunter-green" lang="ar" dir="rtl">{location.areaAr}</p>
            <p className="mt-5 text-sm leading-relaxed text-hunter-green">{location.arrivalNote}</p>
            <a
              href={location.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-evergreen px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-lime-cream border border-warm-gold/60 backdrop-blur-sm shadow-lg shadow-evergreen/25 transition-all duration-200 hover:bg-hunter-green hover:border-warm-gold hover:shadow-xl hover:shadow-evergreen/35 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evergreen"
            >
              <span className="h-2 w-2 rounded-full bg-[#f7c5ce] shadow-[0_0_8px_#f7c5ce]" aria-hidden="true" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </motion.div>

      {/* Smooth, gradual fade-out from the light floral background into the emerald FAQ background */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-b from-transparent via-hunter-green/50 to-hunter-green"
        aria-hidden="true"
      />
    </section>
  );
}
