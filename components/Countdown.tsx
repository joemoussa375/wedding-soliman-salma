"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { weddingConfig } from "../wedding.config";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Countdown() {
  const targetDate = new Date(weddingConfig.event.targetIsoDate).getTime();
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Don't render the numbers until the client has loaded to prevent hydration errors
  if (!mounted) {
    return <div className="mx-auto mt-2 md:mt-6 h-[170px] md:h-[250px] w-full max-w-sm sm:max-w-md md:max-w-2xl" />;
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="mx-auto mt-2 md:mt-6 w-full max-w-sm sm:max-w-md md:max-w-2xl rounded-2xl md:rounded-[2rem] border border-[#f0cbd3]/40 bg-evergreen/80 px-3.5 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-8 shadow-xl shadow-evergreen/15 backdrop-blur-[1px]">
      <div>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] md:tracking-[0.28em] text-[#f2b8c4]">
          Counting down to our day
        </p>
        <div className="mx-auto my-2 md:my-4 flex w-24 md:w-28 items-center gap-2.5 md:gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-[#e2a8b5]/70" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#d88d9c]" />
          <span className="h-px flex-1 bg-[#e2a8b5]/70" />
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:gap-4">
          {units.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl sm:rounded-2xl border border-[#f8d7df]/20 bg-lime-cream/10 px-2.5 py-2.5 sm:px-3 sm:py-3.5 md:py-4 text-center shadow-inner shadow-black/10"
            >
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-none text-lime-cream">
                {String(value).padStart(2, "0")}
              </p>
              <p className="mt-1.5 sm:mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] md:tracking-[0.18em] text-[#f5c7d2]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
