"use client";

import { useEffect, useState } from "react";

interface StopWatchProps {
  isRunning: boolean;
}

const StopWatch = ({ isRunning }: StopWatchProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

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
