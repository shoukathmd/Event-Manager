import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000", // GraphQL Server
  cache: new InMemoryCache(),
});

export default client;
