"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "../components/Hero";
import CurtainSplash from "../components/CurtainSplash";
import Location from "../components/Location";
import Schedule, { FAQ } from "../components/Schedule";
import MusicPlayer, { MusicPlayerHandle } from "../components/MusicPlayer";
import SideScrollIndicator from "../components/SideScrollIndicator";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const musicRef = useRef<MusicPlayerHandle>(null);

  // Disable scrolling while splash is visible
  useEffect(() => {
    document.body.style.overflow = showSplash ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSplash]);

  const handleStartMusic = () => {
    musicRef.current?.play();
  };

  return (
    <main className="min-h-screen font-sans">
      <MusicPlayer ref={musicRef} showControls={!showSplash} />

      <AnimatePresence mode="wait">
        {showSplash && (
          <CurtainSplash
            key="curtain-splash"
            onOpen={() => setShowSplash(false)}
            onStartMusic={handleStartMusic}
          />
        )}
      </AnimatePresence>
      
      {!showSplash && (
        <div className="animate-in fade-in duration-1000">
          <SideScrollIndicator />
          <Hero />
          <Schedule />
          <Location />
          <FAQ />
        </div>
      )}
    </main>
  );
}
