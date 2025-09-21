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

  // Create Cry Audio Functionality
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleCryButton = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`w-[400px] rounded-2xl shadow-xl border p-6 text-center
          ${
            status === "correct"
              ? "bg-gradient-to-b from-green-100 via-white to-green-50 border-green-300"
              : status === "wrong"
              ? "bg-gradient-to-b from-red-100 via-white to-red-50 border-red-300"
              : "bg-gradient-to-b from-gray-100 via-white to-gray-50"
          }`}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-2xl font-bold mb-2 ${
              status === "correct"
                ? "text-green-600"
                : status === "wrong"
                ? "text-red-600"
                : "text-gray-700"
            }`}
          >
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-700 text-lg">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Handle Cry Button if status is correct*/}
        {status === "correct" && (
          <div className="mt-4">
            <audio ref={audioRef} preload="auto" src={cry}></audio>
            <Button
              variant="default"
              onClick={handleCryButton}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold hover:cursor-pointer"
            >
              ▶ Cry
            </Button>
          </div>
        )}

        {/* Close button */}
        <div className="mt-6">
          <Button
            onClick={handleClose}
            variant="outline"
            className="px-6 py-2 rounded-lg hover:cursor-pointer"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Results;
