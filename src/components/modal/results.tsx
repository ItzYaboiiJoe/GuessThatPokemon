// This file will display the results modal when a user submits an answer
// It will display either correct or incorrect
// It will also display the results when the user already submitted the answer for the day

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useRef } from "react";

interface resultsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  status?: "correct" | "wrong";
  cry: string;
}

const Results = ({
  open,
  setOpen,
  title,
  description,
  status,
  cry,
}: resultsProps) => {
  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleCryButton = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-96 rounded-2xl shadow-2xl bg-gradient-to-b from-yellow-100 via-orange-100 to-white"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <DialogTitle
            className={`text-center text-2xl ${
              status === "correct"
                ? "text-green-600"
                : status === "wrong"
                ? "text-red-600"
                : ""
            }`}
          >
            {title}
          </DialogTitle>
          <DialogDescription></DialogDescription>
          {description}
        </DialogHeader>

        {/* Handle Cry Button if status is correct*/}
        <div>
          <audio ref={audioRef} preload="auto" src={cry}></audio>
          {status === "correct" && (
            <Button onClick={handleCryButton}>Cry</Button>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <Button className="hover:cursor-pointer" onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Results;
