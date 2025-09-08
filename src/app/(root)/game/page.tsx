"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import fetchPokemon from "@/components/api/fetch";

const GamePage = () => {
  // Get Trainer Name from Local Storage
  const trainerName = localStorage.getItem("guestTrainerName");
  // State to hold the fetched Pokemon sprite URL
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);

  // Fetch Pokemon Sprite from API Response
  useEffect(() => {
    const loadPokemon = async () => {
      const spriteUrl = await fetchPokemon();
      setPokemonImage(spriteUrl);
    };
    loadPokemon();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-indigo-900 via-purple-800 to-black text-white p-6">
      {/* Trainer Name */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-bold">Trainer: {trainerName}</h2>
      </div>

      {/* Pokémon silhouette */}
      <div className="flex flex-col items-center">
        <Image
          src={pokemonImage || "/pokeball.png"}
          alt="Pokemon silhouette"
          width={300}
          height={300}
          priority
          className="brightness-0 invert drop-shadow-[0_0_20px_rgba(255,255,0,0.7)]"
        />
        <h1 className="text-3xl font-bold mt-6">Who’s That Pokémon?</h1>

        {/* Answer Section */}
        <Input className="mt-10" type="text" />
        <Button className="bg-yellow-500 text-black mt-5 hover:bg-yellow-600 hover:cursor-pointer">
          Submit
        </Button>
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
