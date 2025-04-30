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
        totalTime: 0,
      });
      return await run.save();
    },
    stopRun: async (
      _: any,
      { runId, name, endTime, totalTime, distance, coordinates }: any
    ) => {
      const run = await Run.findById(runId);
      if (!run) throw new Error("Run not found");

      return await Run.findByIdAndUpdate(
        runId,
        {
          name,
          endTime,
          totalTime,
          distance,
          coordinates,
        },
        { new: true }
      );
    },
    updateRunName: async (
      _: any,
      { id, name }: { id: string; name: string }
    ) => {
      const run = await Run.findByIdAndUpdate(id, { name }, { new: true });
      if (!run) throw new Error("Run not found");
      return run;
    },
    deleteRun: async (_: any, { id }: { id: string }) => {
      return await Run.findByIdAndDelete(id);
    },
  },
};

export default resolvers;
