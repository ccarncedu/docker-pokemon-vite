import React from 'react';
import PokemonList from './components/pokemon/PokemonList';
import PokemonTeam from './components/pokemon/PokemonTeam';
const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Pokémon App Teste</h1>
      <PokemonTeam />
      <PokemonList />
    </div>
  );
};

export default App;
