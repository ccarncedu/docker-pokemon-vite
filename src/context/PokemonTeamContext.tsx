import React, { createContext, useState, useEffect, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';

interface Pokemon {
  id: string;
  name: string;
  types: string[];
}

const GET_POKEMONS = gql`
  query GetPokemons($offset: Int, $limit: Int) {
    pokemons(offset: $offset, limit: $limit) {
      id
      name
      types
    }
  }
`;

const PokemonTeamContext = createContext<{ pokemonTeam: Pokemon[], addPokemon: (pokemon: Pokemon) => void }>({ pokemonTeam: [], addPokemon: () => {} });

export function PokemonTeamProvider({ children }: { children: React.ReactNode }) {
  const [pokemonTeam, setPokemonTeam] = useState<Pokemon[]>([]);

  const addPokemon = (pokemon: Pokemon) => {
    if (pokemonTeam.length < 5) {
      setPokemonTeam([...pokemonTeam, pokemon]);
    }
  };

  return (
    <PokemonTeamContext.Provider value={{ pokemonTeam, addPokemon }}>
      {children}
    </PokemonTeamContext.Provider>
  );
}

export function usePokemonTeam() {
  return useContext(PokemonTeamContext);
}

export default function PokemonList() {
  const { loading, error, data } = useQuery(GET_POKEMONS, { variables: { offset: 0, limit: 10 } });
  const [nameFilter] = useState('');
  const [typeFilter] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const { addPokemon } = usePokemonTeam();

  useEffect(() => {
    if (data?.pokemons) {
      setFilteredPokemons(
        data.pokemons.filter((pokemon: Pokemon) => {
          return (
            pokemon.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (typeFilter === '' || pokemon.types.includes(typeFilter))
          );
        })
      );
    }
  }, [data, nameFilter, typeFilter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {filteredPokemons.map((pokemon: Pokemon) => (
        <div key={pokemon.id}>
          <p>{pokemon.name}</p>
          <button onClick={() => addPokemon(pokemon)}>Add to team</button>
        </div>
      ))}
    </div>
  );
}