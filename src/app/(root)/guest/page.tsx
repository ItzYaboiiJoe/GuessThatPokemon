"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GuestPage = () => {
  const [guestTrainerName, setGuestTrainerName] = useState("");

  const handleStart = () => {
    localStorage.setItem("guestTrainerName", guestTrainerName);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-yellow-200 via-orange-300 to-red-400">
      <div className="bg-white/90 rounded-xl shadow-xl p-8 w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">Enter Your Trainer Name</h1>

        {/* Nickname Input */}
        <Input
          type="text"
          placeholder="e.g. AshKetchum99"
          className="mb-4 text-center"
          value={guestTrainerName}
          onChange={(e) => setGuestTrainerName(e.target.value)}
        />

        {/* Start Button */}
        <Button
          onClick={handleStart}
          className="w-full bg-yellow-400 text-black font-bold hover:bg-yellow-300 hover:cursor-pointer"
        >
          Start Game
        </Button>

        {/* Info Note */}
        <p className="mt-4 text-sm text-gray-600">
          Progress won’t be saved unless you log in.
        </p>
      </div>
    </div>
  );
};

export default GuestPage;
