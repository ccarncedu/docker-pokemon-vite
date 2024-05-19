import React, { createContext, useState, useEffect, useContext } from 'react';

interface Pokemon {
  id: string;
  name: string;
  types: string[];
  image: string;
}
interface PokemonAPIResponse {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}
const PokemonTeamContext = createContext<{
  pokemonTeam: Pokemon[],
  pokemons: Pokemon[], // Adicione esta linha
  addPokemon: (pokemon: Pokemon) => void,
  removePokemon: (id: string) => void
}>({ pokemonTeam: [], pokemons: [], addPokemon: () => {}, removePokemon: () => {} });


export function PokemonTeamProvider({ children }: { children: React.ReactNode }) {
  const [pokemonTeam, setPokemonTeam] = useState<Pokemon[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); 
  const addPokemon = (pokemon: Pokemon) => {
    if (pokemonTeam.length < 5) {
      setPokemonTeam([...pokemonTeam, pokemon]);
    }
  };
  console.log(pokemons)
  const removePokemon = (id: string) => {
    setPokemonTeam(pokemonTeam.filter(pokemon => pokemon.id !== id));
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const data: { results: { name: string, url: string }[] } = await response.json();
        const pokemons: Pokemon[] = await Promise.all(data.results.map(async result => {
          const pokemonResponse = await fetch(result.url);
          const pokemonData: PokemonAPIResponse = await pokemonResponse.json();
          return {
            id: pokemonData.id.toString(), 
            name: pokemonData.name,
            types: pokemonData.types.map(typeInfo => typeInfo.type.name),
            image: pokemonData.sprites.front_default,
          };
        }));
        console.log(pokemons)
        setPokemons(pokemons);
        const randomPokemons = pokemons.sort(() => 0.5 - Math.random()).slice(0, 5);
        setPokemonTeam(randomPokemons);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro ao buscar os Pokémon:', error.message);
        } else {
          console.error('Erro ao buscar os Pokémon:', error);
        }
      }
    };
    fetchPokemons();
  }, []);

  return (
    <PokemonTeamContext.Provider value={{ pokemonTeam, pokemons, addPokemon, removePokemon }}>
    {children}
  </PokemonTeamContext.Provider>
  );
}

export function usePokemonTeam() {
  return useContext(PokemonTeamContext);
}