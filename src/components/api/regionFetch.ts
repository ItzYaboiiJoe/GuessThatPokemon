// Fetch Pokemons from region table

import { supabase } from "@/lib/supabaseClient";

export type RegionPokemonDetails = {
  PokemonType: string;
  PokemonCry: string;
  PokemonName: string;
  PokemonImage: string;
  PokemonHabitat: string;
  PokemonDescription: string;
  PokemonRegion: string;
};

// Selecting the latest entry from the Pokemon_PokemonRegionDetails table
export const fetchRegionPokemon = async () => {
  const { data, error } = await supabase
    .from("Pokemon_PokemonRegionDetails")
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

// Real-time subscription to listen for new entries in the Pokemon_PokemonRegionDetails table
export const liveFetchPokemon = (
  callback: (pokemon: RegionPokemonDetails) => void
) => {
  const channel = supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "Pokemon_PokemonRegionDetails",
      },
      (payload) => {
        const newRow = payload.new as RegionPokemonDetails;
        callback(newRow);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
