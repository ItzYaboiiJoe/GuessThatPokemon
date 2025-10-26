"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetTime?: string;
  rollingHours?: number;
}

const CountdownTimer = ({ targetTime, rollingHours }: CountdownTimerProps) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout; // Declare interval variable

    const updateCountdown = () => {
      const now = new Date();
      let nextTarget = new Date();

      // If rollingHours is provided, calculate next rolling interval
      if (rollingHours && rollingHours > 0) {
        const currentMs = now.getTime();
        const msPerBlock = rollingHours * 60 * 60 * 1000;
        const nextBlockMs = Math.ceil(currentMs / msPerBlock) * msPerBlock;
        nextTarget = new Date(nextBlockMs);
      } else if (targetTime) {
        // Regular fixed target time logic
        const [targetHour, targetMinute] = targetTime
          .split(":")
          .map((n) => parseInt(n));

        nextTarget.setHours(targetHour, targetMinute, 0, 0);

        // If time has already passed target time then start a new countdown for target time
        if (now >= nextTarget) {
          nextTarget.setDate(nextTarget.getDate() + 1);
        }
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
  }, [targetTime, rollingHours]);

  return <div>{countdown}</div>;
};

export default CountdownTimer;
