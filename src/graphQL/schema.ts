import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Run {
    id: ID!
    startTime: String!
    name: String
    endTime: String
    totalTime: Int
    distance: Float
    coordinates: [[Float]]
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
      coordinates: [[Float]]!
    ): Run
    deleteRun(id: ID!): Run
  }
`;

export default typeDefs;
