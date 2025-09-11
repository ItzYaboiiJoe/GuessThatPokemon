"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const GuestPage = () => {
  // State to hold the guest trainer name
  const [guestTrainerName, setGuestTrainerName] = useState("");

  // Generate a random guest trainer name on component mount and setting to localStorage
  useEffect(() => {
    const generateID = Math.random().toString().slice(2, 12);
    const newName = "Guest" + generateID;
    setGuestTrainerName(newName);

    localStorage.setItem("TrainerName", newName);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-white/90 rounded-xl shadow-xl p-8 w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">Welcome Trainer</h1>
        <h1 className="text-2xl font-bold mb-4">{guestTrainerName}</h1>

        {/* Start Button */}
        <Link href="/game">
          <Button className="w-full bg-yellow-400 text-black font-bold hover:bg-yellow-300 hover:cursor-pointer">
            Start Game
          </Button>
        </Link>

        {/* Info Note */}
        <p className="mt-4 text-sm text-gray-600">
          Progress won’t be saved unless you log in.
        </p>

        {/* Back to Menu Link */}
        <Link
          href="/"
          className="mt-3 inline-block text-red-600 text-sm font-medium hover:text-red-800 transition"
        >
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default GuestPage;
