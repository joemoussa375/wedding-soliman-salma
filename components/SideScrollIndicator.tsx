"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function SideScrollIndicator() {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);

  // Fade out the indicator once the user scrolls down past 100px
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100 && !isHidden) {
      setIsHidden(true);
    } else if (latest <= 100 && isHidden) {
      setIsHidden(false);
    }
  });

  const handleClick = () => {
    const scheduleElem = document.getElementById("schedule");
    if (scheduleElem) {
      scheduleElem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className={`fixed bottom-8 left-3 sm:left-5 md:left-8 z-40 flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-500 ${
        isHidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={handleClick}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: isHidden ? 0 : 1, x: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      aria-hidden={isHidden}
    >
      <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.3em] text-hunter-green/80 [writing-mode:vertical-rl] rotate-180 hover:text-evergreen transition-colors">
        Scroll
      </p>
      
      <div className="flex flex-col items-center">
        {/* Animated track line */}
        <div className="relative h-12 sm:h-16 w-px bg-palm-leaf/30 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-warm-gold rounded-full"
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Bouncing chevron */}
        <motion.div
           animate={{ y: [0, 4, 0] }}
           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
           className="text-warm-gold -mt-1"
        >
          <svg
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-current"
            fill="none"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
