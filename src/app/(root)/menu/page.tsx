"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Leaderboard from "@/components/modal/leaderboard";
import { useRouter } from "next/navigation";
import { fetchLoggedInPlayer } from "@/components/api/fetch";
import CountdownTimer from "@/components/tools/countdownTimer";
import Profile from "@/components/modal/profile";

const Menu = () => {
  // State to hold Trainer Name
  const [trainerName, setTrainerName] = useState("");
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle leaderboard modal visibility
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  // State to handle profile modal visibility
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Fetch logged in user ID
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // No user logged in then send back to login
      if (!user) {
        router.replace("/login");
        return;
      }

      if (user) {
        // Fetch trainer name
        const name = await fetchLoggedInPlayer(user.id);

        setTrainerName(name);
        localStorage.setItem("TrainerName", name);
        localStorage.setItem("Mode", "auth");
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const leaderboardButton = () => {
    setLeaderboardOpen(true);
  };

  const profileButton = () => {
    setProfileOpen(true);
  };

  // Clean up local storage and sign out session on exit
  const cleanUp = async () => {
    await supabase.auth.signOut();

    localStorage.removeItem("Mode");
    localStorage.removeItem("TrainerName");
    localStorage.removeItem("TrainerID");
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
        {/* Countdown Section */}
        <div className="mb-4 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-4 py-1 rounded-full shadow-md shadow-orange-200/60 border border-orange-300">
            <p>New Challenge In:</p>
            <CountdownTimer />
          </div>
        </div>

        <div className="bg-white/90 rounded-xl shadow-xl shadow-orange-200/50 p-8 responsePhones text-center">
          {/* Title */}
          <h1 className="text-xl lg:text-2xl font-bold mb-4">
            Welcome Trainer
          </h1>
          <h1 className="text-xl lg:text-2xl font-bold mb-4">{trainerName}</h1>

          <div className="flex flex-col items-center lg:grid lg:grid-cols-2 gap-4">
            {/* Start Button */}
            <Link href="/menu/gameMode">
              <Button className="w-52 lg:w-full bg-gradient-to-r from-yellow-300 to-amber-500 text-black font-bold cursor-pointer hover:from-yellow-400 hover:to-amber-600 rounded-full shadow-md shadow-yellow-200/70">
                Select Game Mode
              </Button>
            </Link>

            {/* Leaderboard */}
            <Button
              onClick={leaderboardButton}
              className="w-52 lg:w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-bold cursor-pointer rounded-full hover:from-red-600 hover:to-red-800 shadow-md shadow-red-200/50"
            >
              View Leaderboard
            </Button>

            {/* Profile */}
            <div className="col-span-2 grid place-items-center">
              <Button
                onClick={profileButton}
                className="w-52 lg:max-w-[184px] bg-gradient-to-r from-orange-400 to-amber-600 text-white font-bold rounded-full cursor-pointer hover:from-orange-500 hover:to-amber-700 shadow-md shadow-orange-200/50"
              >
                Profile
              </Button>
            </div>
          </div>

          {/* Back to Menu Link */}
          <Link
            href="/"
            onClick={cleanUp}
            className="mt-6 inline-block text-red-600 text-sm font-semibold hover:text-red-700 hover:underline transition"
          >
            Sign Out
          </Link>
        </div>
      </div>
      {/* Leaderboard Modal */}
      <Leaderboard open={leaderboardOpen} setOpen={setLeaderboardOpen} />
      {/* Profile Modal */}
      <Profile open={profileOpen} setOpen={setProfileOpen} />
    </>
  );
};

export default Menu;
