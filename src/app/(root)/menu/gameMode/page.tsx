"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/tools/countdownTimer";
import { fetchRegionPokemon } from "@/components/api/regionFetch";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ElectricBorder from "@/components/bitsComponents/ElectricBorder";
import { motion } from "motion/react";

const GameMode = () => {
  // State to hold Region Pokemon
  const [region, setRegion] = useState("");
  // State to handle loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegion = async () => {
      const regionData = await fetchRegionPokemon();
      setRegion(regionData.PokemonRegion);
      setLoading(false);
    };
    fetchRegion();
  }, []);

  // Show loading state while fetching Trainer Name
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Image
          src="/pokeball.png"
          alt="Pokeball Rotating"
          width={300}
          height={300}
          priority
          className="animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Title */}
      <h1 className="text-2xl lg:text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-500 to-red-500 drop-shadow-[0_0_10px_rgba(255,150,0,0.8)] animate-[pulseGlow_3s_ease-in-out_infinite]">
        Choose Your Game Mode
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* National Mode */}
        <ElectricBorder
          color="#b37100"
          speed={2}
          chaos={0.5}
          thickness={3}
          style={{ borderRadius: "1.5rem" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              scale: { type: "spring", duration: 0.7, bounce: 0.5 },
            }}
          >
            <Card className="bg-white/90 rounded-3xl shadow-xl shadow-orange-400/50 p-8 w-full max-w-sm border-1 border-yellow-600">
              <CardHeader>
                {/* Countdown */}
                <div className="flex justify-center mb-4">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-4 py-1 rounded-full shadow-md border border-orange-300">
                    <p>New Challenge In:</p>
                    <CountdownTimer targetTime="00:00" />
                  </div>
                </div>

                <CardTitle className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                  National Game Mode
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Good Luck, Have Fun!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-gradient-to-r from-yellow-300 to-amber-500 text-black font-bold rounded-full shadow-md shadow-yellow-200/70 hover:from-yellow-400 hover:to-amber-600 transition-all duration-300"
                  asChild
                >
                  <Link href="/nationGame">Start Game</Link>
                </Button>
                <p className="mt-4 text-sm text-gray-600">
                  National Game Mode affects leaderboard scores
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </ElectricBorder>

        {/* Regional Mode */}
        <ElectricBorder
          color="#fb2c36"
          speed={2}
          chaos={0.5}
          thickness={3}
          style={{ borderRadius: "1.5rem" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              scale: { type: "spring", duration: 0.7, bounce: 0.5 },
            }}
          >
            <Card className="bg-white/90 rounded-3xl shadow-xl shadow-red-400/50 p-8 w-full max-w-sm border-1 border-red-500">
              <CardHeader>
                {/* Countdown */}
                <div className="flex justify-center mb-4">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-orange-300 to-red-400 text-black font-semibold px-4 py-1 rounded-full shadow-md border border-red-200">
                    <p>New Challenge In:</p>
                    <CountdownTimer targetTime="00:00" />
                  </div>
                </div>

                <CardTitle className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-700">
                  Region Game Mode
                </CardTitle>
                <CardDescription className="text-gray-700">
                  Current Active Region:{" "}
                  <span className="font-extrabold text-orange-600 drop-shadow-[0_0_6px_rgba(255,180,80,0.7)]">
                    {region}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full shadow-md shadow-orange-200/70 hover:from-orange-500 hover:to-red-600 transition-all duration-300"
                >
                  <Link href="/regionGame">Start Game</Link>
                </Button>

                <p className="mt-4 text-sm text-gray-600">
                  Region Game Mode does not affect leaderboard
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </ElectricBorder>
      </div>

      {/* Return to Menu */}
      <Button
        asChild
        className="mt-5 lg:mt-12 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-full px-6 shadow-xl hover:from-red-600 hover:to-red-800 transition-all duration-300"
      >
        <Link href="/menu">← Return to Menu</Link>
      </Button>
    </div>
  );
};

export default GameMode;
