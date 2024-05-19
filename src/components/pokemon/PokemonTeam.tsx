import { useState } from 'react';
import { usePokemonTeam } from '../../context/PokemonTeamContext';

interface Pokemon {
  id: string; // Atualize para string
  name: string;
  types: string[];
  image: string;
}

export default function PokemonTeam() {
  const { pokemons, pokemonTeam: team, addPokemon, removePokemon } = usePokemonTeam() as { pokemons: Pokemon[]; pokemonTeam: Pokemon[]; addPokemon: (pokemon: Pokemon) => void; removePokemon: (id: string) => void; };
  const [pokemonId, setPokemonId] = useState<string | null>(null); // Atualize para string

  return (
    <div>
      <h2>Seu Time de Pokémon</h2>
      <input
        type="text" // Atualize para text
        placeholder="Digite o ID do Pokémon"
        value={pokemonId ?? ''}
        onChange={(e) => setPokemonId(e.target.value)} 
      />
      <button onClick={() => {
        const pokemonToAdd = pokemons.find((p: { id: string; }) => p.id === pokemonId);
        if (pokemonToAdd) {
          addPokemon(pokemonToAdd); 
        }
      }}>Adicionar ao Time</button>
      <ul>
      {team.map((pokemon: Pokemon) => (
        <li key={pokemon.id}>
          <img src={pokemon.image} alt={pokemon.name} />
          {pokemon.name} - {pokemon.types.join(', ')}
          <button onClick={() => removePokemon(pokemon.id)}>Remover</button> {/* Use a função removePokemon do contexto */}
        </li>
      ))}
      </ul>
    </div>
  );
}