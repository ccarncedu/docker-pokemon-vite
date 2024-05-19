import { useState, useEffect } from 'react';
import { usePokemonTeam } from '../../providers/PokemonTeamContext';
import { UlCard, DivComponent, ButtonList } from './PokemonListStyle';

interface Pokemon {
  id: string;
  name: string;
  types: string[];
  image: string;
}

export default function PokemonList() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filter, setFilter] = useState(''); 
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const { pokemons, addPokemon } = usePokemonTeam(); 

  useEffect(() => {
    if (pokemons) {
      setFilteredPokemons(
        pokemons.filter((pokemon: Pokemon) => {
          return (
            pokemon.name.toLowerCase().includes(filter.toLowerCase()) ||
            pokemon.types.some(type => type.toLowerCase().includes(filter.toLowerCase()))
          );
        })
      );
    }
  }, [pokemons, filter]);

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <DivComponent>
      <input
        type="text"
        placeholder="Filtrar por nome ou tipo"
        value={filter}
        onChange={(e) => setFilter(e.target.value)} 
      />
       <UlCard>    
        {currentPokemons.map((pokemon: Pokemon) => (
          <div key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name} /> 
            <p>{pokemon.name}</p>
            <button onClick={() => addPokemon(pokemon)}>Adicionar no time</button>
          </div>
        ))}
      </UlCard>
      <ButtonList>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPokemons.length / itemsPerPage)}>Próxima</button>
      </ButtonList>
    </DivComponent>

  );
}