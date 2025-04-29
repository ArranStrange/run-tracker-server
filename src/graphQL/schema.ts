import { gql } from "apollo-server-express";

const typeDefs = gql`
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
    deleteRun(id: ID!): Run
  }
`;

export default typeDefs;
