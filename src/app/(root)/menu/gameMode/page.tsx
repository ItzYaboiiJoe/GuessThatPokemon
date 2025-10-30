"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/tools/countdownTimer";

const GameMode = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-500 to-red-500 drop-shadow-[0_0_10px_rgba(255,150,0,0.8)] animate-[pulseGlow_3s_ease-in-out_infinite]">
        Choose Your Game Mode
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* National Mode */}
        <div className="bg-white/90 rounded-3xl shadow-lg shadow-orange-300/50 p-8 w-full max-w-sm">
          {/* Countdown */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-4 py-1 rounded-full shadow-md border border-orange-300">
              <p>New Challenge In:</p>
              <CountdownTimer targetTime="00:00" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
            National Game Mode
          </h2>

          <Button
            className="w-full bg-gradient-to-r from-yellow-300 to-amber-500 text-black font-bold rounded-full shadow-md shadow-yellow-200/70 hover:from-yellow-400 hover:to-amber-600 transition-all duration-300"
            asChild
          >
            <Link href="/nationGame">Start Game</Link>
          </Button>

          <p className="mt-4 text-sm text-gray-600">
            National Game Mode affects leaderboard scores
          </p>
        </div>

        {/* Regional Mode */}
        <div className="bg-white/90 rounded-3xl shadow-lg shadow-orange-300/50 p-8 w-full max-w-sm">
          {/* Countdown */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-300 to-red-400 text-black font-semibold px-4 py-1 rounded-full shadow-md border border-red-200">
              <p>New Challenge In:</p>
              <CountdownTimer targetTime="07:00" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-700">
            Region Game Mode
          </h2>
          <p className="text-gray-700 mb-6">
            Current Active Region:{" "}
            <span className="font-extrabold text-orange-600 drop-shadow-[0_0_6px_rgba(255,180,80,0.7)]">
              Kanto
            </span>
          </p>

          <Button
            asChild
            className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full shadow-md shadow-orange-200/70 hover:from-orange-500 hover:to-red-600 transition-all duration-300"
          >
            <Link href="/regionGame">Start Game</Link>
          </Button>

          <p className="mt-4 text-sm text-gray-600">
            Region Game Mode does not affect leaderboard
          </p>
        </div>
      </div>

      {/* Return to Menu */}
      <Button
        asChild
        className="mt-12 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-full px-6 shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300"
      >
        <Link href="/menu">← Return to Menu</Link>
      </Button>
    </div>
  );
};

export default GameMode;
