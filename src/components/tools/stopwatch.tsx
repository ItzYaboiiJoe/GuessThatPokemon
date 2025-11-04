"use client";

import { useEffect } from "react";

interface StopWatchProps {
  isRunning: boolean;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

const StopWatch = ({ isRunning, seconds, setSeconds }: StopWatchProps) => {
  // 🆕 NEW: Reset or resume logic based on date
  useEffect(() => {
    const savedDate = localStorage.getItem("timeDate");
    const todayEastern = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/New_York",
    });

    if (savedDate !== todayEastern) {
      // Different day then reset everything
      localStorage.removeItem("time");
      localStorage.setItem("timeDate", todayEastern);
      setSeconds(0);
    } else {
      // Same day then resume saved time if available
      const savedTime = localStorage.getItem("time");
      if (savedTime) setSeconds(Number(savedTime));
    }
  }, [setSeconds]); // runs once on mount

  // Existing stopwatch timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((s) => {
          const newTime = s + 1;

          // Always save time and date when updating
          const easternNow = new Date().toLocaleDateString("en-CA", {
            timeZone: "America/New_York",
          });

          localStorage.setItem("time", String(newTime));
          localStorage.setItem("timeDate", easternNow);

          return newTime;
        });
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, setSeconds]);

  // Format and render stopwatch
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="mr-6 text-yellow-300 text-lg md:text-xl font-bold tracking-widest
      drop-shadow-[0_0_8px_rgba(255,255,150,0.7)]
      animate-[pulseGlow_2s_ease-in-out_infinite] select-none"
    >
      {formatTime(seconds)}
    </div>
  );
};

export default StopWatch;
