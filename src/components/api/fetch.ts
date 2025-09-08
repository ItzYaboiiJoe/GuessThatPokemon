const fetchPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/charmander");
  const data = await response.json();

  return data.sprites.front_default;
};

export default fetchPokemon;
