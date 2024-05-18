import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});

const GET_POKEMONS = gql`
  query GetPokemons {
    pokemons {
      id
      name
      types
    }
  }
`;

client.query({ query: GET_POKEMONS })
  .then(result => console.log(result));

export default client;