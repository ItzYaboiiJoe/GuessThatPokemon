"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetTime?: string;
}

const CountdownTimer = ({ targetTime = "00:00" }: CountdownTimerProps) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout; // Declare interval variable

    const updateCountdown = () => {
      const now = new Date();

      // Set Target Date
      // Parse the passed time
      const [targetHour, targetMinute] = targetTime
        .split(":")
        .map((n) => parseInt(n));

      const nextTarget = new Date();
      nextTarget.setHours(targetHour, targetMinute, 0, 0);

      // If time has already passed target time then start a new countdown for target time
      if (now >= nextTarget) {
        nextTarget.setDate(nextTarget.getDate() + 1);
      }

      const diff = nextTarget.getTime() - now.getTime();

      // Convert milliseconds to hours/minutes/seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Format as HH:MM:SS
      const formatted = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      // When countdown hits 00:00:00, stop interval, wait 1 min, then restart
      if (formatted === "00:00:00") {
        clearInterval(interval); // stop current ticking
        setCountdown("Updating...");
        setTimeout(() => {
          interval = setInterval(updateCountdown, 1000); // restart after 1 min
        }, 60 * 1000);
        return;
      }

      setCountdown(formatted);
    };

    updateCountdown();
    interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return <div>{countdown}</div>;
};

export default CountdownTimer;
