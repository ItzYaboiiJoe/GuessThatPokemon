"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import Leaderboard from "@/components/modal/leaderboard";
import Feedback from "@/components/modal/feedback";
import ReleaseNotes from "@/components/modal/releaseNotes";

export default function Home() {
  // State to handle leaderboard modal visibility
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  // This state controls the feedback modal visibility
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  // State to control release notes modal
  const [releaseNotesOpen, setReleaseNotesOpen] = useState(false);

  const leaderboardButton = () => {
    setLeaderboardOpen(true);
  };

  const feedbackButton = () => {
    setFeedbackOpen(true);
  };

  const releaseNotesButton = () => {
    setReleaseNotesOpen(true);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        {/* Announcement Banner */}
        <div className="mb-6 px-5 py-2 rounded-full bg-red-600 text-white font-bold text-sm shadow-md">
          New version <span className="text-yellow-300">v0.8.0</span> is now
          live!
        </div>

        {/* Title */}
        <h1
          className="
    text-3xl lg:text-7xl font-extrabold mb-6
    bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600
    bg-clip-text text-transparent
    drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]
    tracking-wide
  "
        >
          Who’s That Pokémon?
        </h1>

        {/* Pokeball Image */}
        <div className="mb-8 animate-[bounce_2s_infinite] w-20 lg:w-32 mx-auto">
          <Image
            src="/pokeball.png"
            alt="Pokeball"
            width={128}
            height={128}
            priority={true}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row gap-4 w-full justify-center items-center">
          <Link href="/guest">
            <Button
              size={"lg"}
              variant="secondary"
              className="w-40 lg:w-full bg-yellow-400 text-black font-bold shadow-xl hover:bg-yellow-300 rounded-full hover:cursor-pointer"
            >
              Play as Guest
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button
              size={"lg"}
              variant="default"
              className="w-40 lg:w-full bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-xl rounded-full hover:cursor-pointer"
            >
              Login / Register
            </Button>
          </Link>
        </div>

        {/* Leaderboard */}
        <Button
          variant={"link"}
          onClick={leaderboardButton}
          className="mt-6 text-white underline-offset-4 cursor-pointer hover:text-yellow-300 transition-colors"
        >
          View Leaderboard
        </Button>
      </div>

      {/* Leaderboard Modal */}
      <Leaderboard open={leaderboardOpen} setOpen={setLeaderboardOpen} />
      {/* Feedback Modal */}
      <Feedback open={feedbackOpen} setOpen={setFeedbackOpen} />
      {/* Release Notes Modal */}
      <ReleaseNotes open={releaseNotesOpen} setOpen={setReleaseNotesOpen} />

      {/* Early Access, Feedback, and Release Notes */}
      <div className="fixed bottom-3 left-3 lg:left-1/2 flex lg:-translate-x-1/2 flex-col lg:flex-row lg:items-center lg:space-x-3 gap-3 lg:gap-1 text-xs text-white opacity-90">
        <div className="flex items-center justify-center gap-2 lg:gap-3 opacity-80">
          <p>This game is still early access</p>
          <span className="hidden lg:inline">•</span>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Button
            onClick={feedbackButton}
            variant="secondary"
            size="sm"
            className="rounded-full bg-white text-black font-medium shadow-sm hover:bg-gray-200 px-3 py-1 text-xs cursor-pointer"
          >
            Feedback
          </Button>

          <Button
            onClick={releaseNotesButton}
            variant="secondary"
            size="sm"
            className="rounded-full bg-white text-black font-medium shadow-sm hover:bg-gray-200 px-3 py-1 text-xs cursor-pointer"
          >
            Release Notes
          </Button>
        </div>
      </div>
    </>
  );
}
