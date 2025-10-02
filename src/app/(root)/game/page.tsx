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
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const GamePage = () => {
  // Get Trainer Name from Local Storage
  const [trainerName, setTrainerName] = useState<string | null>(null);
  // State to hold the current Pokemon details
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  // State to manage if the correct answer was input
  const [isCorrect, setIsCorrect] = useState(false);
  // Loading state
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Check for auth session and if not present, redirect to login
  useEffect(() => {
    const initializeGame = async () => {
      // Check session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Check if user is guest (query param)
      const params = new URLSearchParams(window.location.search);
      const isGuest = params.get("guest") === "true";
      console.log(params);

      // Redirect if no session and not a guest
      if (!session && !isGuest) {
        router.replace("/login");
        return;
      }

      // Load trainer name
      const stored = localStorage.getItem("TrainerName");
      setTrainerName(stored);

      // Fetch Pokémon
      const latest = await fetchPokemon();
      if (latest) setPokemon(latest);

      // Subscribe to realtime updates
      const unsubscribe = liveFetchPokemon((newPokemon) => {
        setPokemon(newPokemon);
      });

      setLoading(false);

      return () => {
        unsubscribe();
      };
    };

    initializeGame();
  }, [router]);

  // Loading state while fetching trainer name
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Image
          src="/pokeball.png"
          alt="Pokeball Rotating"
          width={300}
          height={300}
          priority
          className="animate-spin"
        />
      </div>
    );
  }

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
