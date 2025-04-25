"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_caching_1 = require("apollo-server-caching");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = __importDefault(require("./graphQL/schema"));
const resolvers_1 = __importDefault(require("./graphQL/resolvers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
async function startServer() {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: schema_1.default,
        resolvers: resolvers_1.default,
        cache: new apollo_server_caching_1.InMemoryLRUCache(),
    });
    await server.start();
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 4000;
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        });
    }
    catch (err) {
        console.error("DB connection failed", err);
    }
}
startServer();
