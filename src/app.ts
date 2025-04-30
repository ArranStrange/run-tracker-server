import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";

import typeDefs from "./graphQL/schema";
import resolvers from "./graphQL/resolvers";

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://192.168.0.4:5173",
    "https://run-tracker-server.onrender.com",
    "https://run-tracker-server.onrender.com/graphql",
    "http://run-tracker-frontend.s3-website.eu-north-1.amazonaws.com",
    "https://run-tracker-frontend.s3.eu-north-1.amazonaws.com",
    "https://do6kctxdsrc6z.cloudfront.net/",
  ],

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

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

console.log("👋 About to call startServer");
startServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
});
