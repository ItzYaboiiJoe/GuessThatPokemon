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
        className="w-full sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1100px] rounded-2xl shadow-2xl bg-gradient-to-b from-yellow-100 via-orange-100 to-white"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 text-center">
            Leaderboard
          </DialogTitle>

          <DialogDescription asChild>
            <Table className="text-center">
              <TableHeader>
                <TableRow className="border-gray-400">
                  <TableHead className="text-center">Rank</TableHead>
                  <TableHead className="text-center">Trainer</TableHead>
                  <TableHead className="text-center">Correct Guesses</TableHead>
                  <TableHead className="text-center">
                    First Try Streak
                  </TableHead>
                  <TableHead className="text-center">
                    Daily Login Streak
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry, index) => (
                  <TableRow className="border-none" key={entry.id}>
                    {/* Rank */}
                    <TableCell>{index + 1}</TableCell>

                    {/* Trainer */}
                    <TableCell>{entry.TrainerName}</TableCell>

                    {/* Trivia Solved */}
                    <TableCell>{entry.TriviaSolved}</TableCell>

                    {/* First Try Streak */}
                    <TableCell>{entry.WinningStreak}</TableCell>

                    {/* Daily Login Streak */}
                    <TableCell>{entry.DailyLoginStreak}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogDescription>
        </DialogHeader>

        <Button
          className="w-full bg-yellow-400 text-black font-bold text-lg py-3 rounded-xl shadow-md hover:bg-yellow-300 hover:cursor-pointer"
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Leaderboard;
