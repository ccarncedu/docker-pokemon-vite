import { useState, useEffect } from 'react';
import { usePokemonTeam } from '../../context/PokemonTeamContext';
interface Pokemon {
  id: string;
  name: string;
  types: string[];
  image: string;
}

export default function PokemonList() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  
  const [nameFilter] = useState('');
  const [typeFilter] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const { pokemons, addPokemon } = usePokemonTeam(); 

  useEffect(() => {
    if (pokemons) {
      setFilteredPokemons(
        pokemons.filter((pokemon: Pokemon) => {
          return (
            pokemon.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (typeFilter === '' || pokemon.types.includes(typeFilter))
          );
        })
      );
    }
  }, [pokemons, nameFilter, typeFilter]);

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <div>
      {currentPokemons.map((pokemon: Pokemon) => (
        <div key={pokemon.id}>
          <p>{pokemon.name}</p>
          <button onClick={() => addPokemon(pokemon)}>Adicionar no time</button>
        </div>
      ))}
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPokemons.length / itemsPerPage)}>Próxima</button>
    </div>
  );
}