import Run from "../models/Run";

const resolvers = {
  Query: {
    runs: async () => Run.find(),
    run: async (_: any, { id }: { id: string }) => {
      console.log("Fetching run with ID:", id);
      return await Run.findById(id);
    },
  },
  Mutation: {
    startRun: async () => {
      const run = new Run({
        startTime: new Date().toISOString(),
        coordinates: [],
      });
      return await run.save();
    },
    stopRun: async (
      _: any,
      { runId, name, endTime, totalTime, distance, coordinates }: any
    ) => {
      return await Run.findByIdAndUpdate(
        runId,
        { name, endTime, totalTime, distance, coordinates },
        { new: true }
      );
    },
    deleteRun: async (_: any, { id }: { id: string }) => {
      return await Run.findByIdAndDelete(id);
    },
  },
};

export default resolvers;
