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
          New version <span className="text-yellow-300">v0.7.5</span> is now
          live!
        </div>

        {/* Title */}
        <h1
          className="
    text-5xl md:text-7xl font-extrabold mb-6
    bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600
    bg-clip-text text-transparent
    drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]
    tracking-wide
  "
        >
          Who’s That Pokémon?
        </h1>

        {/* Pokeball Image */}
        <div className="mb-8 animate-[bounce_2s_infinite]">
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
              className="bg-yellow-400 text-black font-bold shadow-2xl hover:bg-yellow-300 rounded-full hover:cursor-pointer"
            >
              Play as Guest
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button
              size={"lg"}
              variant="default"
              className="bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-2xl rounded-full hover:cursor-pointer"
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
      <div className="fixed bottom-2 right-2 flex items-center space-x-3 text-xs mr-35">
        <p className="text-white opacity-80">This game is still early access</p>
        <p className="text-white">•</p>

        <Button
          onClick={feedbackButton}
          variant="default"
          size="sm"
          className="cursor-pointer rounded-full bg-white text-black shadow-md hover:bg-gray-200 px-2 text-xs"
        >
          Feedback
        </Button>

        <Button
          onClick={releaseNotesButton}
          variant="default"
          size="sm"
          className="cursor-pointer rounded-full bg-white text-black shadow-md hover:bg-gray-200 px-2 text-xs"
        >
          Release Notes
        </Button>
      </div>
    </>
  );
}
