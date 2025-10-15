// Handles leaderboard data processing

import { supabase } from "@/lib/supabaseClient";

export type LeaderboardEntry = {
  id: number;
  TrainerName: string;
  TriviaSolved: number;
  WinningStreak: number;
  DailyLoginStreak: number;
  BestSolvedTime: number;
};

export const fetchLeaderboard = async () => {
  const { data, error } = await supabase
    .from("Pokemon_Leaderboard")
    .select("*")
    .order("WinningStreak", { ascending: false })
    .limit(10);
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
    .eq("TrainerName", trainerName)
    .single();

  return data;
};

// This API is to update the current player stats
export const updateLeaderboard = async (
  userTriviaSolved: number,
  userWinStreak: number,
  trainerName: string,
  userLoginStreak: number
) => {
  const { data: updateData } = await supabase
    .from("Pokemon_Leaderboard")
    .update({
      TriviaSolved: userTriviaSolved,
      WinningStreak: userWinStreak,
      DailyLoginStreak: userLoginStreak,
    })
    .eq("TrainerName", trainerName);

  return updateData;
};

// Create an empty entry for a new user
export const newEntry = async (userMetadata: string) => {
  const { error: entryError } = await supabase
    .from("Pokemon_Leaderboard")
    .insert({
      TrainerName: userMetadata,
      TriviaSolved: 0,
      WinningStreak: 0,
      DailyLoginStreak: 0,
    });

  if (entryError) {
    console.error("Error creating a new user in leaderboard: ", entryError);
    return { success: false, error: entryError.message };
  }

  return { success: true, error: null };
};

// Update BestSolvedTime Leaderboard
export const updateTime = async (bestTime: number, trainerName: string) => {
  const { data } = await supabase
    .from("Pokemon_Leaderboard")
    .update({ BestSolvedTime: bestTime })
    .eq("TrainerName", trainerName);

  return data;
};
