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
        className="rounded-2xl shadow-2xl bg-gradient-to-b from-yellow-100 via-orange-100 to-white"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold drop-shadow text-center">
            Leaderboard
          </DialogTitle>
          <DialogDescription>
            <div>
              <Table className="text-center">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Trainer</TableHead>
                    <TableHead className="text-center">Trivia Solved</TableHead>
                    <TableHead className="text-center">
                      First Try Streak
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((leaderboardData) => (
                    <TableRow key={leaderboardData.id}>
                      <TableCell>{leaderboardData.TrainerName}</TableCell>
                      <TableCell>{leaderboardData.TriviaSolved}</TableCell>
                      <TableCell>{leaderboardData.WinningStreak}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
