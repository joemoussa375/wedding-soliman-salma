"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { weddingConfig } from "../wedding.config";

export default function CurtainSplash({
  onOpen,
  onStartMusic,
}: {
  onOpen: () => void;
  onStartMusic?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const img = new Image();
    img.src = "/green_curtain.png";

    const handleReady = () => {
      if (isCancelled) return;
      setIsReady(true);
    };

    if (img.complete) {
      handleReady();
    } else {
      img.onload = handleReady;
      img.onerror = handleReady; // Fallback so splash doesn't block indefinitely on network failure
    }

    return () => {
      isCancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  const handleClick = () => {
    if (isOpen) return;
    onStartMusic?.();
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      // Keep the revealed invite on screen just long enough to read before smoothly revealing the site
      const t = setTimeout(() => {
        onOpen();
      }, 3800); // 3.8s total (2.4s curtain animation + 0.72s stagger + ~1s comfortable reading time)
      return () => clearTimeout(t);
    }
  }, [isOpen, onOpen]);

  if (!isReady) return null;

  return (
    <motion.div
      className="fixed inset-0 min-h-[100dvh] z-[100] flex items-center justify-center overflow-hidden pointer-events-auto cursor-pointer select-none"
      onClick={handleClick}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      {/* Tap hint before opening */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="absolute z-30 flex flex-col items-center pointer-events-none px-4 text-center"
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{
              opacity: [0.85, 1, 0.85],
              scale: [1, 1.03, 1],
              y: [0, -3, 0],
            }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.3 } }}
            transition={{
              repeat: Infinity,
              duration: 2.4,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-2 rounded-full border border-warm-gold/75 bg-evergreen/90 px-5 py-2.5 shadow-2xl shadow-black/50 backdrop-blur-md">
              <span className="text-sm">✨</span>
              <span className="font-serif text-xs md:text-sm font-semibold tracking-[0.2em] text-lime-cream uppercase">
                Tap anywhere to open
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Curtain Container */}
      <motion.div className="absolute top-0 bottom-0 left-0 w-1/2 z-20 flex origin-top-left">
        {Array.from({ length: 10 }).map((_, idx) => {
          // idx 0 is left edge, idx 9 is center edge
          const totalIndex = idx;
          return (
            <motion.div
              key={`left-${idx}`}
              className="absolute top-0 bottom-0 origin-top bg-[#0d2812]"
              style={{
                left: `${idx * 10}%`,
                width: "10.5%", // slight overlap to prevent gaps during animation
                backgroundColor: "#0d2812",
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.2) 100%), url('/green_curtain.png')`,
                backgroundSize: "100% 100%, 100vw 100vh",
                backgroundPosition: `0 0, -${totalIndex * 5}vw 0`,
                backgroundRepeat: "no-repeat",
                boxShadow: "inset -1px 0 5px rgba(0,0,0,0.2)",
              }}
              initial={{ x: "0vw", y: "0vh", rotateZ: 0 }}
              animate={isOpen ? {
                x: `${-15 - (4 * idx)}vw`,
                y: `${-(idx * 1.5)}vh`,
                rotateZ: idx * 1.5
              } : {
                x: "0vw", y: "0vh", rotateZ: 0
              }}
              transition={{
                duration: 2.4, // 2.4 seconds total duration
                ease: "easeInOut",
                delay: (9 - idx) * 0.08 // 80ms stagger per strip
              }}
            />
          );
        })}
      </motion.div>
      
      {/* Right Curtain Container */}
      <motion.div className="absolute top-0 bottom-0 right-0 w-1/2 z-20 flex origin-top-right">
        {Array.from({ length: 10 }).map((_, idx) => {
          // idx 0 is center edge, idx 9 is right edge
          const totalIndex = 10 + idx;
          return (
            <motion.div
              key={`right-${idx}`}
              className="absolute top-0 bottom-0 origin-top bg-[#0d2812]"
              style={{
                left: `${idx * 10}%`,
                width: "10.5%", // slight overlap
                backgroundColor: "#0d2812",
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.2) 100%), url('/green_curtain.png')`,
                backgroundSize: "100% 100%, 100vw 100vh",
                backgroundPosition: `0 0, -${totalIndex * 5}vw 0`,
                backgroundRepeat: "no-repeat",
                boxShadow: "inset 1px 0 5px rgba(0,0,0,0.2)",
              }}
              initial={{ x: "0vw", y: "0vh", rotateZ: 0 }}
              animate={isOpen ? {
                x: `${55 - (4 * idx)}vw`,
                y: `${-(9 - idx) * 1.5}vh`,
                rotateZ: -(9 - idx) * 1.5
              } : {
                x: "0vw", y: "0vh", rotateZ: 0
              }}
              transition={{
                duration: 2.4, // 2.4 seconds total duration
                ease: "easeInOut",
                delay: idx * 0.08 // 80ms stagger per strip
              }}
            />
          );
        })}
      </motion.div>

      {/* The Wedding Invite Card (revealed when curtains open) */}
      <motion.div 
        className="relative z-10 w-[90vw] md:w-[600px] aspect-[1.42] bg-[#fffbf9] rounded flex flex-col items-center justify-center shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 1.0, delay: 0.25, ease: "easeOut" }}
      >
        <div className="absolute inset-2 md:inset-3 border-2 md:border-4 border-double border-[#e8b4c0]/80 rounded-sm opacity-90" />

        <div className="text-center font-serif text-evergreen px-6 z-10 flex flex-col items-center">
          <p className="text-xs md:text-lg italic text-[#c47585] mb-3 md:mb-5">{weddingConfig.splash.inviteIntroText}</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6 tracking-wide bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 inline-block text-transparent bg-clip-text py-1">{weddingConfig.couple.fullName}</h2>
          <div className="w-16 h-px bg-[#e2a8b5] mb-4 md:mb-6" />
          <p className="text-[10px] md:text-sm font-sans tracking-widest uppercase text-hunter-green leading-relaxed">
            {weddingConfig.event.date}<br />
            {weddingConfig.location.areaEn}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
