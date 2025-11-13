"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "motion/react";

const GuestPage = () => {
  // State to hold the guest trainer name
  const [guestTrainerName, setGuestTrainerName] = useState("");

  useEffect(() => {
    // Check if there is a supabase session on storage and sign out
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        await supabase.auth.signOut();
      }
    })();

    // Generate a random guest trainer name on component mount and setting to localStorage
    const generateID = Math.random().toString().slice(2, 12);
    const newName = "Guest" + generateID;
    setGuestTrainerName(newName);

    localStorage.setItem("TrainerName", newName);
    localStorage.setItem("Mode", "guest");
    localStorage.removeItem("TrainerID");
  }, []);

  // Clean up local storage on exit
  const cleanUp = () => {
    localStorage.removeItem("Mode");
    localStorage.removeItem("TrainerName");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-white/90 rounded-xl shadow-xl shadow-orange-200/50 p-8 responsePhones text-center">
        {/* Title */}
        <h1 className="text-xl lg:text-2xl font-bold mb-4">Welcome Trainer</h1>
        <h1 className="text-xl lg:text-2xl font-bold mb-4">
          {guestTrainerName}
        </h1>

        {/* Start Button */}
        <Link href="/nationGame?guest=true">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              scale: { type: "spring", duration: 0.5, bounce: 0.5 },
            }}
          >
            <Button className="w-full bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 hover:cursor-pointer">
              Start Game
            </Button>
          </motion.div>
        </Link>

        {/* Info Note */}
        <p className="mt-4 text-sm text-gray-600">
          Progress won’t be saved unless you log in.
        </p>

        {/* Back to Menu Link */}
        <Link
          href="/"
          onClick={cleanUp}
          className="mt-3 inline-block text-red-600 text-sm font-medium hover:underline hover:text-red-800 transition"
        >
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default GuestPage;
