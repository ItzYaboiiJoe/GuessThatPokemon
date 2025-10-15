// Modal component to display user profile

"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { checkLeaderboard, LeaderboardEntry } from "../api/handleLeaderboard";
import Link from "next/link";
import UpdateTrainerName from "./changeTrainerName";

interface ProfileProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Profile = ({ open, setOpen }: ProfileProps) => {
  // States to hold profile data
  const [profileData, setProfileData] = useState<LeaderboardEntry | null>(null);
  // State to open Change Trainer Name
  const [changeTrainerName, setChangeTrainerName] = useState(false);

  // Retrieve trainer name from local storage
  const trainerName = localStorage.getItem("TrainerName")!;

  // Fetch profile data
  useEffect(() => {
    const fetchData = async () => {
      const data = await checkLeaderboard(trainerName);
      if (data) setProfileData(data);
    };
    fetchData();
  }, [trainerName]);

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Convert seconds to minutes and seconds time format
  const displayBestTime = () => {
    const userBestSolvedTime = profileData?.BestSolvedTime;
    if (userBestSolvedTime !== null) {
      const minutes = Math.floor(userBestSolvedTime! / 60);
      const seconds = userBestSolvedTime! % 60;
      const formatMinutes = String(minutes).padStart(2, "0");
      const formatSeconds = String(seconds).padStart(2, "0");
      return `${formatMinutes}:${formatSeconds}`;
    } else {
      return "Unknown";
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          aria-describedby={undefined}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="rounded-2xl border-4 border-red-500 bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 shadow-xl shadow-orange-300/40 p-6"
        >
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-extrabold text-red-600 drop-shadow">
              Trainer Profile
            </DialogTitle>
          </DialogHeader>

          {/* Card container */}
          <div className="mt-4 bg-white/80 border border-orange-300 rounded-xl p-4 shadow-inner shadow-yellow-200/70">
            {/* Trainer Name */}
            <div className="text-center mb-4">
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Trainer Name
              </p>
              <p className="text-2xl font-bold text-red-600">
                {profileData?.TrainerName || "Unknown Trainer"}
              </p>
            </div>

            {/* Stats Grid */}

            <div className="grid grid-cols-2 gap-4 text-center">
              {/* Correct Guesses */}
              <div className="bg-gradient-to-r from-yellow-300 to-orange-400 rounded-lg py-3 shadow-md border border-orange-200">
                <p className="text-xs uppercase font-semibold text-gray-700">
                  Correct Guesses
                </p>
                <p className="text-lg font-bold text-black">
                  {profileData?.TriviaSolved ?? 0}
                </p>
              </div>

              {/* First Try Streak */}
              <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg py-3 shadow-md border border-orange-200">
                <p className="text-xs uppercase font-semibold text-gray-100">
                  First Try Streak
                </p>
                <p className="text-lg font-bold text-white">
                  {profileData?.WinningStreak ?? 0}
                </p>
              </div>

              {/* Daily Login Streak */}
              <div className="bg-gradient-to-r from-yellow-300 to-orange-400 rounded-lg py-3 shadow-md border border-orange-200">
                <p className="text-xs uppercase font-semibold text-gray-700">
                  Daily Login Streak
                </p>
                <p className="text-lg font-bold text-black">
                  {profileData?.DailyLoginStreak ?? 0}
                </p>
              </div>

              {/* Best Time */}
              <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg py-3 shadow-md border border-orange-200">
                <p className="text-xs uppercase font-semibold text-gray-100">
                  Best Solved Time
                </p>
                <p className="text-lg font-bold text-white">
                  {displayBestTime()}
                </p>
              </div>
            </div>

            {/* Decorative Pokéball divider */}
            <div className="flex justify-center my-4">
              <div className="w-12 h-12 rounded-full relative border-4 border-black overflow-hidden bg-white shadow-md">
                {/* 🔴 Top red half */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500"></div>

                {/* Black middle line */}
                <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-black transform -translate-y-1/2"></div>

                {/* Center white circle */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white border-2 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>

            {/* Settings Buttons */}
            <div className="flex justify-between mt-4">
              <Button
                className="cursor-pointer text-blue-600 font-semibold hover:text-blue-800"
                variant={"link"}
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => setChangeTrainerName(true), 150);
                }}
              >
                Change Trainer Name
              </Button>
              <Button
                asChild
                className="cursor-pointer text-blue-600 font-semibold hover:text-blue-800"
                variant={"link"}
              >
                <Link href="/change-password">Change Password</Link>
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleClose}
              className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full px-8 shadow-md cursor-pointer"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <UpdateTrainerName
        open={changeTrainerName}
        setOpen={setChangeTrainerName}
      />
    </>
  );
};

export default Profile;
