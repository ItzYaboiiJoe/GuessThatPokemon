"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  fetchPokemon,
  liveFetchPokemon,
  PokemonDetails,
} from "@/components/api/fetch";
import AnswerForm from "@/components/forms/answerForm";

const GamePage = () => {
  // Get Trainer Name from Local Storage
  const [trainerName, setTrainerName] = useState<string | null>(null);
  // State to hold the current Pokemon details
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  // State to manage if the correct answer was input
  const [isCorrect, setIsCorrect] = useState(false);

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

  useEffect(() => {
    const stored = localStorage.getItem("TrainerName");
    setTrainerName(stored);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-indigo-900 via-purple-800 to-black text-white p-6">
      {/* Watermark Pokeball */}
      <Image
        src="/pokeball.png"
        alt="Pokeball Watermark"
        width={600}
        height={600}
        className="absolute top-1/4 opacity-5 pointer-events-none"
      />
      {/* Trainer Name */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-sm md:text-base font-semibold bg-white/10 px-3 py-1 rounded-full shadow-md">
          Trainer: {trainerName}
        </h2>
      </div>

      {/* Pokémon Image */}
      <div className="flex flex-col items-center">
        {pokemon ? (
          <Image
            src={pokemon.PokemonImage}
            alt="Failed to Fetch Pokemon (Sorry)"
            width={300}
            height={300}
            draggable={false}
            priority
            className={`${
              !isCorrect ? "brightness-0 invert" : ""
            } drop-shadow-[0_0_20px_rgba(200,100,255,0.7)]`}
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
        <h1
          className="
    text-4xl md:text-5xl font-extrabold mt-6
    text-transparent bg-clip-text 
    bg-gradient-to-r from-pink-400 via-yellow-300 to-pink-400
    drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-[pulseGlow_3s_ease-in-out_infinite]"
        >
          Who’s That Pokémon?
        </h1>

        {/* Answer Section Component will load once pokemon is not null */}
        {pokemon && (
          <AnswerForm
            pokemonName={pokemon.PokemonName}
            pokemonType={pokemon.PokemonType}
            pokemonCry={pokemon.PokemonCry}
            pokemonHabitat={pokemon.PokemonHabitat}
            pokemonDescription={pokemon.PokemonDescription}
            onCorrect={() => setIsCorrect(true)}
          />
        )}
      </div>

      {/* Empty Space */}
      <div></div>

      {/* Back to Menu Button */}
      <div>
        <Link
          href="/"
          className="mt-6 inline-block text-red-500 text-sm italic hover:underline hover:text-red-700 transition"
        >
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default GamePage;
