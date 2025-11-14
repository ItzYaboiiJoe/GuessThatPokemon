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
import convertSeconds from "../tools/bestTimeConversion";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as motion from "motion/react-client";

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
    const bestTime = profileData?.BestSolvedTime;
    if (bestTime !== null && bestTime !== undefined) {
      return convertSeconds(bestTime);
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
          className="
    rounded-2xl border-4 border-red-500
    bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100
    shadow-xl shadow-orange-300/40
    p-6
    w-full max-w-[95vw]
    max-h-[90svh]
    overflow-y-auto overflow-x-hidden
    scrollbar-none
    lg:max-w-lg lg:max-h-none lg:overflow-visible
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-extrabold text-red-600 drop-shadow">
                Trainer Profile
              </DialogTitle>
            </DialogHeader>

            {/* MOBILE UI*/}
            <ScrollArea className="h-[500px] lg:hidden pr-3">
              <div className="lg:hidden mt-4 flex flex-col items-center text-center">
                {/* Card Background */}
                <div
                  className="
              relative w-full rounded-[2rem]
              bg-gradient-to-b from-yellow-200 via-amber-100 to-orange-200
              border-[3px] border-amber-400
              shadow-[0_8px_25px_rgba(255,180,50,0.4)]
              px-5 py-7
              overflow-hidden
            "
                >
                  {/* Subtle Pokéball watermark */}
                  <div className="absolute inset-0 opacity-[0.07] bg-[url('/pokeball.png')] bg-center bg-no-repeat bg-contain"></div>

                  {/* Trainer Pokéball avatar */}
                  <div className="flex justify-center mb-4">
                    <div className="relative w-16 h-16 rounded-full border-4 border-black overflow-hidden bg-white shadow-lg">
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500"></div>
                      <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-black transform -translate-y-1/2"></div>
                      <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-white border-2 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>

                  {/* Trainer Name */}
                  <div className="mb-5 relative z-10">
                    <p className="text-xs uppercase tracking-widest text-gray-600">
                      Trainer Name
                    </p>
                    <h2 className="text-2xl font-extrabold text-red-600 tracking-wide drop-shadow-sm">
                      {profileData?.TrainerName || "Unknown Trainer"}
                    </h2>
                  </div>

                  {/* Stats (Card-style rows) */}
                  <div className="space-y-3 relative z-10">
                    {[
                      {
                        label: "Correct Guesses",
                        value: profileData?.TriviaSolved ?? 0,
                        colors: "from-yellow-300 to-orange-400",
                      },
                      {
                        label: "First Try Streak",
                        value: profileData?.WinningStreak ?? 0,
                        colors: "from-orange-400 to-red-500",
                      },
                      {
                        label: "Daily Login Streak",
                        value: profileData?.DailyLoginStreak ?? 0,
                        colors: "from-yellow-300 to-orange-400",
                      },
                      {
                        label: "Best Solved Time",
                        value: displayBestTime(),
                        colors: "from-orange-400 to-red-500",
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between bg-gradient-to-r ${stat.colors}
                    rounded-xl py-3 px-4 shadow-md border border-orange-200`}
                      >
                        <div className="flex flex-col items-start">
                          <p className="text-[11px] uppercase font-semibold text-gray-800">
                            {stat.label}
                          </p>
                          <p className="text-base font-bold text-black">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="my-5 flex justify-center relative z-10">
                    <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-yellow-400 to-red-500"></div>
                  </div>

                  {/* Settings */}
                  <div className="space-y-2 text-sm font-semibold text-blue-600 relative z-10">
                    <button
                      onClick={() => {
                        setOpen(false);
                        setTimeout(() => setChangeTrainerName(true), 150);
                      }}
                      className="hover:text-blue-800 transition"
                    >
                      Change Trainer Name
                    </button>
                    <Link
                      href="/change-password"
                      className="block hover:text-blue-800 transition"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>

                {/* Close Button */}
                <Button
                  onClick={handleClose}
                  className="
              mt-6 w-full bg-gradient-to-r from-red-500 to-red-600
              hover:from-red-600 hover:to-red-700
              text-white font-bold rounded-full py-2 shadow-lg shadow-red-300/40
            "
                >
                  Close
                </Button>
              </div>
            </ScrollArea>

            {/* DESKTOP UI */}
            <div className="hidden lg:block">
              <div className="mt-4 bg-white/80 border border-orange-300 rounded-xl p-4 shadow-inner shadow-yellow-200/70">
                <div className="text-center mb-4">
                  <p className="text-sm uppercase tracking-widest text-gray-500">
                    Trainer Name
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {profileData?.TrainerName || "Unknown Trainer"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gradient-to-r from-yellow-300 to-orange-400 rounded-lg py-3 shadow-md border border-orange-200">
                    <p className="text-xs uppercase font-semibold text-gray-700">
                      Correct Guesses
                    </p>
                    <p className="text-lg font-bold text-black">
                      {profileData?.TriviaSolved ?? 0}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg py-3 shadow-md border border-orange-200">
                    <p className="text-xs uppercase font-semibold text-gray-100">
                      First Try Streak
                    </p>
                    <p className="text-lg font-bold text-white">
                      {profileData?.WinningStreak ?? 0}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-300 to-orange-400 rounded-lg py-3 shadow-md border border-orange-200">
                    <p className="text-xs uppercase font-semibold text-gray-700">
                      Daily Login Streak
                    </p>
                    <p className="text-lg font-bold text-black">
                      {profileData?.DailyLoginStreak ?? 0}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg py-3 shadow-md border border-orange-200">
                    <p className="text-xs uppercase font-semibold text-gray-100">
                      Best Solved Time
                    </p>
                    <p className="text-lg font-bold text-white">
                      {displayBestTime()}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center my-4">
                  <div className="relative w-12 h-12 rounded-full border-4 border-black overflow-hidden bg-white shadow-md">
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-red-500"></div>
                    <div className="absolute inset-x-0 top-1/2 h-[3px] bg-black -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white border-2 border-black rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>

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

              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleClose}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full px-8 shadow-md cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
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
