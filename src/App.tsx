import PokemonList from './components/PokemonList/PokemonList';
import PokemonTeam from './components/PokemonTeam/PokemonTeam';
import { PokemonTeamProvider } from './providers/PokemonTeamContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";

export default function App() {
  return (
    <PokemonTeamProvider>
    <div className="App">
      <h1>Pokémon App</h1>
      <PokemonTeam />
      <PokemonList />
      
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    
    </PokemonTeamProvider>
  );
}