// Fetch Pokemon Details from Supabase Table

import { supabase } from "@/lib/supabaseClient";

export type PokemonDetails = {
  PokemonType: string;
  PokemonCry: string;
  PokemonName: string;
  PokemonImage: string;
  PokemonHabitat: string;
  PokemonDescription: string;
};

// Selecting the latest entry from the Pokemon_PokemonDetails table
export const fetchPokemon = async () => {
  const { data, error } = await supabase
    .from("Pokemon_PokemonDetails")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();
  if (error || !data) {
    console.error("Failed to fetch answers:", error);
    return null;
  }

  return data;
};

// Real-time subscription to listen for new entries in the Pokemon_PokemonDetails table
export const liveFetchPokemon = (
  callback: (pokemon: PokemonDetails) => void
) => {
  const channel = supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "Pokemon_PokemonDetails" },
      (payload) => {
        const newRow = payload.new as PokemonDetails;
        callback(newRow);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// This API to fetch Player table to store submission
export const fetchPlayerInfo = async (trainerGuiID: string) => {
  const { data: playerInfo } = await supabase
    .from("Pokemon_Players")
    .select("SubmissionDate")
    .eq("TrainerID", trainerGuiID);

  return playerInfo;
};

// This API to update the player submission Date
export const updateDate = async (currentDate: Date, trainerGuiID: string) => {
  const { data: res } = await supabase
    .from("Pokemon_Players")
    .update({ SubmissionDate: currentDate })
    .eq("TrainerID", trainerGuiID);

  return res;
};
