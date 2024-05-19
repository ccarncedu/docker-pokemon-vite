import PokemonList from './components/pokemon/PokemonList';
import PokemonTeam from './components/pokemon/PokemonTeam';
import { PokemonTeamProvider } from './context/PokemonTeamContext';

export default function App() {
  return (
    <PokemonTeamProvider>
      <div className="App">
        <h1>Pokémon App Teste</h1>
        <PokemonTeam />
        <PokemonList />
      </div>
    </PokemonTeamProvider>
  );
}