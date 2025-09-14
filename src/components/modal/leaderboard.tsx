// Modal component to display the leaderboard

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { fetchLeaderboard } from "../api/handleLeaderboard";

interface LeaderboardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Leaderboard = ({ open, setOpen }: LeaderboardProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-96 rounded-2xl shadow-2xl bg-gradient-to-b from-yellow-100 via-orange-100 to-white"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <DialogTitle>Leaderboard</DialogTitle>
          <DialogDescription>Content Here</DialogDescription>
        </DialogHeader>

        <Button className="hover:cursor-pointer" onClick={handleClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Leaderboard;
