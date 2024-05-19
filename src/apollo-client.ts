import axios from 'axios';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql', // atualize esta URI para o seu servidor Hasura
  cache: new InMemoryCache(),
});

axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
  .then(response => {
    const pokemons = response.data.results;
    const promises = pokemons.map((pokemon: { name: unknown; }) => {
      const INSERT_POKEMON = gql`
        mutation InsertPokemon {
          insert_pokemons_one(object: {name: "${pokemon.name}"}) {
            id
          }
        }
      `;
      return client.mutate({ mutation: INSERT_POKEMON });
    });
    return Promise.all(promises);
  })
  .then(results => {
    console.log(results);
  });

export default client;