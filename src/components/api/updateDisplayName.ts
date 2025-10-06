// This file handles updating user TrainerName across all the tables

import { supabase } from "@/lib/supabaseClient";

export const updateTrainerName = async (
  newPlayerName: string,
  originalName: string
) => {
  // Update in Pokemon_Players
  const { error: playerError } = await supabase
    .from("Pokemon_Players")
    .update({ TrainerName: newPlayerName })
    .eq("TrainerName", originalName);

  // Update in Pokemon_Leaderboard
  const { error: leaderboardError } = await supabase
    .from("Pokemon_Leaderboard")
    .update({ TrainerName: newPlayerName })
    .eq("TrainerName", originalName);

  // Update in Auth user metadata
  const { error: authError } = await supabase.auth.updateUser({
    data: { trainer_name: newPlayerName },
  });

  // Check for any errors
  if (playerError || leaderboardError || authError) {
    console.error("Failed updating user:", {
      playerError,
      leaderboardError,
      authError,
    });
    return {
      success: false,
      error: playerError || leaderboardError || authError,
    };
  }

  return { success: true };
};
