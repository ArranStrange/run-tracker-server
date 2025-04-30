import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";

import typeDefs from "./graphQL/schema";
import resolvers from "./graphQL/resolvers";

const app = express();
app.use(cors());

export async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.get("/", (req, res) => {
    res.send("🚀 Server is running");
  });

  console.log("📡 About to bind to port:", PORT);

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Database connection failed", err);
  }
}
