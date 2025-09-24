"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Leaderboard from "@/components/modal/leaderboard";

const Menu = () => {
  // State to hold Trainer Name
  const [trainerName, setTrainerName] = useState("");
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle leaderboard modal visibility
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  useEffect(() => {
    // Fetch logged in user ID
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Fetch trainer name
        const { data } = await supabase
          .from("Pokemon_Players")
          .select("*")
          .eq("TrainerID", user.id)
          .single();

        setTrainerName(data.TrainerName);
        localStorage.setItem("TrainerName", data.TrainerName);
        localStorage.setItem("Mode", "auth");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const leaderboardButton = () => {
    setLeaderboardOpen(true);
  };

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
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-white/90 rounded-xl shadow-xl shadow-orange-200/50 p-8 w-full max-w-md text-center">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-4">Welcome Trainer</h1>
          <h1 className="text-2xl font-bold mb-4">{trainerName}</h1>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Button */}
            <Link href="/game">
              <Button className="w-full bg-yellow-400 text-black font-bold hover:bg-yellow-300 rounded-full hover:cursor-pointer">
                Start Game
              </Button>
            </Link>

            {/* Leaderboard */}
            <Button
              onClick={leaderboardButton}
              className="bg-red-500 text-white cursor-pointer rounded-full hover:bg-orange-500"
            >
              View Leaderboard
            </Button>
          </div>

          {/* Back to Menu Link */}
          <Link
            href="/"
            className="mt-6 inline-block text-red-600 text-sm font-medium hover:underline hover:text-red-800 transition"
          >
            ← Back to Menu
          </Link>
        </div>
      </div>
      {/* Leaderboard Modal */}
      <Leaderboard open={leaderboardOpen} setOpen={setLeaderboardOpen} />
    </>
  );
};

export default Menu;
