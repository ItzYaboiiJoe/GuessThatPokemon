"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  fetchPokemon,
  liveFetchPokemon,
  PokemonDetails,
} from "@/components/api/fetch";
import AnswerForm from "@/components/shared/answerForm";

const GamePage = () => {
  // Get Trainer Name from Local Storage
  const trainerName = localStorage.getItem("guestTrainerName");
  // State to hold the current Pokemon details
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    // Get the latest Pokémon once on page load
    const loadLatest = async () => {
      const latest = await fetchPokemon();
      if (latest) setPokemon(latest);
    };
    loadLatest();

    // Watch for new Pokémon entries inserted into the table
    const unsubscribe = liveFetchPokemon((newPokemon) => {
      setPokemon(newPokemon);
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-indigo-900 via-purple-800 to-black text-white p-6">
      {/* Trainer Name */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-bold">Trainer: {trainerName}</h2>
      </div>

      {/* Pokémon Image */}
      <div className="flex flex-col items-center">
        {pokemon ? (
          <Image
            src={pokemon.PokemonImage}
            alt="Failed to Fetch Pokemon (Sorry)"
            width={300}
            height={300}
            priority
            className="brightness-0 invert drop-shadow-[0_0_20px_rgba(255,255,0,0.7)]"
          />
        ) : (
          // Pokeball Rotating Animation when loading
          <Image
            src="/pokeball.png"
            alt="Pokeball Rotating"
            width={300}
            height={300}
            priority
            className="animate-spin"
          />
        )}
        <h1 className="text-3xl font-bold mt-6">Who’s That Pokémon?</h1>

        {/* Answer Section Component will load once pokemon is not null */}
        {pokemon && <AnswerForm pokemonName={pokemon.PokemonName} />}
      </div>

      {/* Empty Space */}
      <div></div>

      {/* Back to Menu Button */}
      <div>
        <p className="text-sm text-gray-400 cursor-pointer hover:text-gray-200">
          Back to Menu
        </p>
      </div>
    </div>
  );
};

export default GamePage;
