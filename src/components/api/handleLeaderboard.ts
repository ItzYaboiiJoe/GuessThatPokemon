// Handles leaderboard data processing

import { supabase } from "@/lib/supabaseClient";

export const fetchLeaderboard = async () => {
  const { data, error } = await supabase
    .from("Pokemon_Leaderboard")
    .select("*")
    .order("WinningStreak", { ascending: false })
    .limit(5);
  if (error || !data) {
    console.error("Failed to fetch leaderboard data:", error);
    return null;
  }

  return data;
};
