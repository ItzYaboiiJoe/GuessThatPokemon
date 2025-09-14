"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import Leaderboard from "@/components/modal/leaderboard";

export default function Home() {
  // State to handle leaderboard modal visibility
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  const leaderboardButton = () => {
    setLeaderboardOpen(true);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
          Who’s That Pokémon?
        </h1>

        {/* Pokeball Image */}
        <div className="mb-8 animate-bounce">
          <Image
            src="/pokeball.png"
            alt="Pokeball"
            width={128}
            height={128}
            priority={true}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/guest">
            <Button
              size={"lg"}
              variant="secondary"
              className="bg-yellow-400 text-black font-bold shadow-2xl hover:bg-yellow-300 hover:cursor-pointer"
            >
              Play as Guest
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button
              size={"lg"}
              variant="default"
              className="bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-2xl hover:cursor-pointer"
            >
              Login / Register
            </Button>
          </Link>
        </div>

        {/* Leaderboard */}
        <Button
          variant={"link"}
          onClick={leaderboardButton}
          className="mt-6 text-white underline cursor-pointer hover:text-gray-400"
        >
          View Leaderboard
        </Button>
      </div>

      {/* Leaderboard Modal */}
      <Leaderboard open={leaderboardOpen} setOpen={setLeaderboardOpen} />
    </>
  );
}
