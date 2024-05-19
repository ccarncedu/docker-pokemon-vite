import { usePokemonTeam } from '../../providers/PokemonTeamContext';
import { UlCard, LiCard } from './PokemonTeamStyle';

interface Pokemon {
  id: string;
  name: string;
  types: string[];
  image: string;
}

export default function PokemonTeam() {
  const { pokemons, pokemonTeam: team, addPokemon, removePokemon } = usePokemonTeam() as { pokemons: Pokemon[]; pokemonTeam: Pokemon[]; addPokemon: (pokemon: Pokemon) => void; removePokemon: (id: string) => void; };
  console.log(pokemons, addPokemon);

  return (
    <div>
      <UlCard>
      {team.length > 0 ? (
        team.map((pokemon: Pokemon) => (
          <LiCard key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name} />
            {pokemon.name} - {pokemon.types.join(', ')}
            <button onClick={() => removePokemon(pokemon.id)}>Remover</button>
          </LiCard>
        ))
      ) : (
        <p>Seu time está vazio</p>
      )}
      </UlCard>
    </div>
   
  );
}