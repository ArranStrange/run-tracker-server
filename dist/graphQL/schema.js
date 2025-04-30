"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  input CoordinateInput {
    lat: Float!
    lng: Float!
    secondsFromStart: Int!
  }

  type Coordinate {
    lat: Float!
    lng: Float!
    secondsFromStart: Int!
  }

  type Run {
    id: ID!
    startTime: String!
    name: String
    endTime: String
    totalTime: Int
    distance: Float
    coordinates: [Coordinate!]!
  }

  type Query {
    runs: [Run]
    run(id: ID!): Run
  }

  type Mutation {
    startRun: Run
    stopRun(
      runId: ID!
      name: String!
      endTime: String!
      totalTime: Int
      distance: Float!
      coordinates: [CoordinateInput!]!
    ): Run
    updateRunName(id: ID!, name: String!): Run
    deleteRun(id: ID!): Run
  }
`;
exports.default = typeDefs;
