"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
// import dotenv from "dotenv";
const schema_1 = __importDefault(require("./graphQL/schema"));
const resolvers_1 = __importDefault(require("./graphQL/resolvers"));
// dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
function startServer() {
  return __awaiter(this, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
      typeDefs: schema_1.default,
      resolvers: resolvers_1.default,
      cache: "bounded",
    });
    yield server.start();
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 4000;
    try {
      yield mongoose_1.default.connect(process.env.MONGO_URI);
      console.log("✅ Connected to MongoDB");
      app.listen(PORT, () => {
        console.log(
          `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    } catch (err) {
      console.error("❌ Database connection failed", err);
    }
  });
}
console.log("✅ Server entry file is executing");
startServer();
