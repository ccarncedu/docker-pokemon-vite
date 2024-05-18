import { useState } from 'react';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
}

interface PokemonAPIResponse {
    id: number;
    name: string;
    types: { type: { name: string } }[];
}

export default function PokemonTeam() {
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [pokemonId, setPokemonId] = useState<number | null>(null);

  const addPokemonToTeam = (pokemon: Pokemon) => {
    if (team.length < 5 && !team.some(p => p.id === pokemon.id)) {
      setTeam([...team, pokemon]);
    } else {
      alert('O time já está completo ou o Pokémon já está no time.');
    }
  };

  const removePokemonFromTeam = (id: number) => {
    setTeam(team.filter(p => p.id !== id));
  };

  const handleAddPokemon = async () => {
    if (pokemonId) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data: PokemonAPIResponse = await response.json();
        const pokemon: Pokemon = {
          id: data.id,
          name: data.name,
          types: data.types.map(typeInfo => typeInfo.type.name),
        };
        addPokemonToTeam(pokemon);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro ao buscar o Pokémon:', error.message);
        } else {
          console.error('Erro ao buscar o Pokémon:', error);
        }
      }
    } else {
      alert('Por favor, insira um ID de Pokémon válido.');
    }
  };

  return (
    <div>
      <h2>Seu Time de Pokémon</h2>
      <input
        type="number"
        placeholder="Digite o ID do Pokémon"
        value={pokemonId ?? ''}
        onChange={(e) => setPokemonId(Number(e.target.value))}
      />
      <button onClick={handleAddPokemon}>Adicionar ao Time</button>
      <ul>
        {team.map((pokemon) => (
          <li key={pokemon.id}>
            {pokemon.name} - {pokemon.types.join(', ')}
            <button onClick={() => removePokemonFromTeam(pokemon.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}