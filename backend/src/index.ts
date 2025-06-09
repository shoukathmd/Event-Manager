import { ApolloServer } from "apollo-server";
import { typeDefs } from "./events/schema";
import { resolvers } from "./events/resolvers";

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await server.listen({ port: 4000 });
  console.log(`🚀 GraphQL server running at ${url}`);
}

start();
