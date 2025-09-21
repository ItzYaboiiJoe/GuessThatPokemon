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
  firstHint: boolean;
  secondHint: boolean;
}

const Results = ({
  open,
  setOpen,
  title,
  description,
  status,
  cry,
  firstHint,
  secondHint,
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

  // JSX for Cry Button
  const cryButton = () => {
    return (
      <div className="mt-4 animate-bounce">
        <audio ref={audioRef} preload="auto" src={cry}></audio>
        <Button
          variant="default"
          onClick={handleCryButton}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold hover:cursor-pointer shadow-md"
        >
          ▶ Cry
        </Button>
      </div>
    );
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
                ? "text-green-600 text-center"
                : status === "wrong"
                ? "text-red-600 text-center"
                : "text-gray-700"
            }`}
          >
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-700 text-lg space-y-4 text-left">
            {status === "correct" && (
              <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-md shadow-sm text-center">
                <div>
                  <span className="font-bold">{description.split(" ")[0]}</span>{" "}
                  <span className="italic">
                    {description.replace(description.split(" ")[0], "")}
                  </span>
                </div>
              </div>
            )}

            {firstHint && (
              <div className="bg-yellow-100 border-l-4 border-yellow-400 p-3 rounded-md shadow-sm">
                <span className="font-semibold">Hint 1:</span> The Pokémon is a{" "}
                <span className="font-bold">{description}</span> type.
              </div>
            )}

            {secondHint && (
              <div className="bg-blue-100 border-l-4 border-blue-400 p-3 rounded-md shadow-sm">
                <span className="font-semibold">Hint 2:</span> Need more help?
                <div className="mt-2 flex justify-center">{cryButton()}</div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Handle Cry Button if status is correct*/}
        {status === "correct" && cryButton()}

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
