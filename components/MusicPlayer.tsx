"use client";

import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "../wedding.config";

export interface MusicPlayerHandle {
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

interface MusicPlayerProps {
  showControls?: boolean;
}

const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(function MusicPlayer(
  { showControls = true },
  ref
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const faqElem = document.getElementById("faq");
    if (!faqElem) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDarkSection(entry.isIntersecting);
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(faqElem);
    return () => observer.disconnect();
  }, [showControls]);

  const startPlayback = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.volume = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          // Smooth volume ramp-up to 0.75
          let vol = 0;
          const interval = setInterval(() => {
            if (!audioRef.current || vol >= 0.75) {
              clearInterval(interval);
              if (audioRef.current) audioRef.current.volume = 0.75;
            } else {
              vol = Math.min(0.75, vol + 0.05);
              audioRef.current.volume = vol;
            }
          }, 80);
        })
        .catch((err) => {
          console.warn("Audio playback was blocked or prevented by browser:", err);
          setIsPlaying(false);
        });
    }
  };

  const pausePlayback = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  };

  useImperativeHandle(ref, () => ({
    play: startPlayback,
    pause: pausePlayback,
    toggle: togglePlayback,
  }));

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingConfig.music.src}
        loop
        preload="auto"
      />

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-[110] md:bottom-7 md:right-7 select-none"
          >
            <button
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause background music" : "Play background music"}
              className={`group relative flex items-center gap-2.5 rounded-full px-3.5 py-2 backdrop-blur-md transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer ${
                isDarkSection
                  ? "bg-evergreen/90 text-lime-cream border border-warm-gold/60 shadow-[0_8px_25px_rgba(0,0,0,0.35)] hover:bg-evergreen hover:border-warm-gold"
                  : "bg-white/85 text-evergreen border border-[#e8b4c0] shadow-[0_6px_20px_rgba(216,141,156,0.22)] hover:bg-white hover:border-[#c47585]"
              }`}
            >
              {/* Equalizer Wave / Play Icon */}
              <div className="flex h-4 w-4 items-end justify-center gap-[2.5px]">
                {isPlaying ? (
                  <>
                    <motion.span
                      className={`w-[2.5px] rounded-full transition-colors duration-500 ${
                        isDarkSection ? "bg-warm-gold" : "bg-warm-gold"
                      }`}
                      animate={{ height: ["30%", "100%", "40%", "90%", "30%"] }}
                      transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
                    />
                    <motion.span
                      className={`w-[2.5px] rounded-full transition-colors duration-500 ${
                        isDarkSection ? "bg-warm-gold" : "bg-warm-gold"
                      }`}
                      animate={{ height: ["90%", "25%", "100%", "50%", "90%"] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                    />
                    <motion.span
                      className={`w-[2.5px] rounded-full transition-colors duration-500 ${
                        isDarkSection ? "bg-warm-gold" : "bg-warm-gold"
                      }`}
                      animate={{ height: ["40%", "85%", "20%", "100%", "40%"] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    />
                    <motion.span
                      className={`w-[2.5px] rounded-full transition-colors duration-500 ${
                        isDarkSection ? "bg-warm-gold" : "bg-warm-gold"
                      }`}
                      animate={{ height: ["75%", "35%", "90%", "20%", "75%"] }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
                    />
                  </>
                ) : (
                  <svg
                    className={`h-3.5 w-3.5 ml-0.5 transition-colors duration-500 ${
                      isDarkSection ? "text-warm-gold/80" : "text-hunter-green"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>

              {/* Text label */}
              <span
                className={`font-serif text-xs tracking-wider font-medium transition-colors duration-500 ${
                  isDarkSection ? "text-warm-gold" : "text-evergreen"
                }`}
              >
                {isPlaying ? "Music On" : "Music Off"}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default MusicPlayer;
