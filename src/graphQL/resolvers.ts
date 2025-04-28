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
      { runId, name, endTime, distance, coordinates }: any
    ) => {
      const run = await Run.findById(runId);
      if (!run) throw new Error("Run not found");

      const startTime = new Date(run.startTime).getTime();
      const end = new Date(endTime).getTime();

      const totalTime = Math.floor((end - startTime) / 1000);

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
    deleteRun: async (_: any, { id }: { id: string }) => {
      return await Run.findByIdAndDelete(id);
    },
  },
};

export default resolvers;
