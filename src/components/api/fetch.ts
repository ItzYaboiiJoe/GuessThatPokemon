const fetchPokemon = async () => {
  // Fetch a random Pokemon ID
  const pokemonIdResponse = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=1"
  );
  const pokemonIdData = await pokemonIdResponse.json();

  // Generate a random ID between 1 and the total count of Pokemon
  const randomPokemonId = Math.floor(Math.random() * pokemonIdData.count) + 1;

  // Fetch the Pokemon ID details
  const pokemonResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`
  );
  const pokemonData = await pokemonResponse.json();

  // Return the front default sprite URL
  return pokemonData.sprites.front_default;
};

export default fetchPokemon;
