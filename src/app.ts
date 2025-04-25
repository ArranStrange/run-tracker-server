import express from "express";
import { ApolloServer } from "apollo-server-express";
import { InMemoryLRUCache } from "apollo-server-caching";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import typeDefs from "./graphQL/schema";
import resolvers from "./graphQL/resolvers";

dotenv.config();

const app = express();
app.use(cors());

export async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: new InMemoryLRUCache(),
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT;

  if (!PORT) {
    throw new Error("PORT environment variable is not set.");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(
        `Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.error("DB connection failed", err);
  }
}

startServer();
