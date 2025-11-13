// Modal component to display the leaderboard

"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { fetchLeaderboard, LeaderboardEntry } from "../api/handleLeaderboard";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as motion from "motion/react-client";

interface LeaderboardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Leaderboard = ({ open, setOpen }: LeaderboardProps) => {
  // State to hold leaderboard data
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );

  // Fetch leaderboard data on component mount
  useEffect(() => {
    const loadLeaderboard = async () => {
      const data = await fetchLeaderboard();
      if (data) setLeaderboardData(data);
    };
    loadLeaderboard();
  }, []);

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-[90vw] max-w-sm lg:w-full rounded-2xl shadow-2xl bg-gradient-to-b from-yellow-100 via-orange-100 to-white border border-amber-200"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
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
            <DialogTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 text-center">
              Leaderboard
            </DialogTitle>
          </DialogHeader>

          {/* mobile layout */}
          <ScrollArea className="h-[400px] pr-2 lg:hidden">
            <div className="mt-4 space-y-3">
              {leaderboardData.map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-amber-100 rounded-xl p-3 shadow-sm border border-amber-200"
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">
                      #{index + 1}
                    </span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {entry.TrainerName}
                    </span>
                  </div>

                  <div className="flex flex-col items-end justify-center">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-orange-600 leading-none">
                        {entry.TriviaSolved}
                      </span>
                      <span className="text-xs translate-y-[1px]">✅</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-600 leading-none">
                        {entry.WinningStreak}
                      </span>
                      <span className="text-xs translate-y-[1px]">🔥</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Desktop layout */}
          <div className="hidden lg:block mt-3 max-h-[50vh] overflow-y-auto">
            <DialogDescription asChild>
              <Table className="text-center">
                <TableHeader>
                  <TableRow className="border-gray-400">
                    <TableHead className="text-center w-[60px]">Rank</TableHead>
                    <TableHead className="text-center">Trainer</TableHead>
                    <TableHead className="text-center">
                      Correct Guesses
                    </TableHead>
                    <TableHead className="text-center">
                      First Try Streak
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((entry, index) => (
                    <TableRow
                      key={entry.id}
                      className="border-none hover:bg-amber-50 transition-colors"
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{entry.TrainerName}</TableCell>
                      <TableCell>{entry.TriviaSolved}</TableCell>
                      <TableCell>{entry.WinningStreak}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogDescription>
          </div>

          <Button
            className="w-full mt-5 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold text-base py-3 rounded-xl shadow-md hover:from-yellow-300 hover:to-amber-400 cursor-pointer"
            onClick={handleClose}
          >
            Close
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default Leaderboard;
