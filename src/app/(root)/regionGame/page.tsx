"use client";

import Link from "next/link";
import Image from "next/image";
import StopWatch from "@/components/tools/stopwatch";

const RegionGame = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-indigo-900 via-purple-800 to-black text-white p-6">
      {/* Watermark Pokeball */}
      <Image
        src="/pokeball.png"
        alt="Pokeball Watermark"
        width={600}
        height={600}
        className="absolute top-1/4 opacity-5 pointer-events-none"
      />

      <div className="w-full flex justify-between items-center">
        {/* Trainer Name */}
        <h2 className="text-sm md:text-base font-semibold bg-white/10 px-3 py-1 rounded-full shadow-md">
          Trainer: Trainer Name
        </h2>

        {/* Only show stopwatch for auth users */}
        {/* StopWatch Component Here */}
      </div>

      {/* Pokémon Image */}
      <div className="flex flex-col items-center">
        {/* Pokemon Image Component Here */}
        <h1
          className="
    text-3xl lg:text-5xl font-extrabold mt-6
    text-transparent bg-clip-text 
    bg-gradient-to-r from-pink-400 via-yellow-300 to-pink-400
    drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-[pulseGlow_3s_ease-in-out_infinite]"
        >
          Who’s That Pokémon?
        </h1>
      </div>

      {/* Empty Space */}
      <div></div>

      {/* Back to Menu Button */}
      <div className="mb-10 lg:mb-0">
        <Link
          href={"/"} // menuLink Variable Here
          // onClick cleanUp Function Here
          className="text-red-500 text-sm italic hover:underline hover:text-red-700 transition"
        >
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default RegionGame;
