// Handles leaderboard data processing

import { supabase } from "@/lib/supabaseClient";

export type LeaderboardEntry = {
  id: number;
  TrainerName: string;
  TriviaSolved: number;
  WinningStreak: number;
};

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

// This API to check if the user exists in the table
export const checkLeaderboard = async (trainerName: string) => {
  const { data } = await supabase
    .from("Pokemon_Leaderboard")
    .select("*")
    .eq("TrainerName", trainerName);

  return data;
};

// This API is to update the current player stats
export const updateLeaderboard = async (
  userTriviaSolved: number,
  userWinStreak: number,
  trainerName: string
) => {
  const { data: updateData } = await supabase
    .from("Pokemon_Leaderboard")
    .update({ TriviaSolved: userTriviaSolved, WinningStreak: userWinStreak })
    .eq("TrainerName", trainerName);

  return updateData;
};
