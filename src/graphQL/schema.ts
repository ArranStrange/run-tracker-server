import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Run {
    id: ID!
    startTime: String!
    name: String
    endTime: String
    distance: Float
    coordinates: [[Float]]
  }

  type Query {
    runs: [Run]
  }

  type Mutation {
    stopRun(
      runId: ID!
      name: String!
      endTime: String!
      distance: Float!
      coordinates: [[Float]]!
    ): Run
  }
`;

export default typeDefs;
