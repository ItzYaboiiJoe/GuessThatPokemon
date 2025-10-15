// This file will display the results modal when a user submits an answer
// It will display either correct or incorrect
// It will also display the results when the user already submitted the answer for the day

"use client";

import {
  Dialog,
  DialogContent,
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
  pokemonHabitat: string;
  pokemonDescription: string;
  status?: "correct" | "wrong" | "results";
  cry: string;
  firstHint: boolean;
  secondHint: boolean;
}

const Results = ({
  open,
  setOpen,
  title,
  description,
  pokemonHabitat,
  pokemonDescription,
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
        aria-describedby={undefined}
        className="w-[420px] rounded-xl border-4 border-red-600 shadow-lg p-2"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div
          className={`rounded-lg p-6 text-center shadow-[inset_0_0_10px_rgba(0,0,0,0.15)]
      ${
        status === "correct"
          ? "bg-gradient-to-b from-green-100 via-white to-green-50 border-green-300"
          : status === "results"
          ? "bg-gradient-to-b from-yellow-100 via-white to-yellow-50 border-yellow-300"
          : status === "wrong"
          ? "bg-gradient-to-b from-red-100 via-white to-red-50 border-red-300"
          : "bg-gradient-to-b from-gray-100 via-white to-gray-50"
      }`}
        >
          <DialogHeader>
            {/* Pokédex style header (only for correct/results) */}
            {(status === "correct" || status === "results") && (
              <div className="bg-red-600 text-white py-2 rounded-md font-bold text-lg mb-4 shadow text-center">
                Pokédex Entry
              </div>
            )}
            <DialogTitle
              className={`font-bold mb-2 ${
                status === "correct"
                  ? "text-4xl text-green-600 text-center"
                  : status === "wrong"
                  ? "text-2xl text-red-600 text-center"
                  : status === "results"
                  ? "text-2xl text-yellow-600 text-center"
                  : ""
              }`}
            >
              {title}
            </DialogTitle>

            {/* Render Results based on the user submit */}
            {status === "results" && (
              <div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md shadow-sm text-center">
                  <span className="font-bold">{description.split(" ")[0]}</span>{" "}
                  <span className="italic">
                    {description.replace(description.split(" ")[0], "")}
                  </span>
                </div>
                <div className="mt-6 bg-orange-50 border-l-4 border-orange-400 p-3 rounded-md shadow-sm text-center">
                  <span className="font-bold">{description.split(" ")[0]}</span>{" "}
                  <span>{pokemonHabitat}</span>
                </div>
                {/* Flavor text description */}
                {pokemonDescription && (
                  <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md shadow-sm italic text-center">
                    {pokemonDescription}
                  </div>
                )}
              </div>
            )}

            {status === "correct" && (
              <div>
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-md shadow-sm text-center">
                  <span className="font-bold">{description.split(" ")[0]}</span>{" "}
                  <span className="italic">
                    {description.replace(description.split(" ")[0], "")}
                  </span>
                </div>
                <div className="mt-6 bg-orange-50 border-l-4 border-orange-400 p-3 rounded-md shadow-sm text-center">
                  <span className="font-bold">{description.split(" ")[0]}</span>{" "}
                  <span>{pokemonHabitat}</span>
                </div>
                {/* Flavor text description */}
                {pokemonDescription && (
                  <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md shadow-sm italic text-center">
                    {pokemonDescription}
                  </div>
                )}
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
          </DialogHeader>

          {/* Handle Cry Button if status is correct*/}
          {(status === "correct" || status === "results") && cryButton()}

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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Results;
