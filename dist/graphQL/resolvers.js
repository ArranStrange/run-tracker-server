"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Run_1 = __importDefault(require("../models/Run"));
const resolvers = {
    Query: {
        runs: async () => Run_1.default.find(),
        run: async (_, { id }) => {
            console.log("Fetching run with ID:", id);
            return await Run_1.default.findById(id);
        },
    },
    Mutation: {
        startRun: async () => {
            const run = new Run_1.default({
                startTime: new Date().toISOString(),
                coordinates: [],
            });
            return await run.save();
        },
        stopRun: async (_, { runId, name, endTime, distance, coordinates }) => {
            const run = await Run_1.default.findById(runId);
            if (!run)
                throw new Error("Run not found");
            const startTime = new Date(run.startTime).getTime();
            const end = new Date(endTime).getTime();
            const totalTime = Math.floor((end - startTime) / 1000);
            return await Run_1.default.findByIdAndUpdate(runId, {
                name,
                endTime,
                totalTime,
                distance,
                coordinates,
            }, { new: true });
        },
        deleteRun: async (_, { id }) => {
            return await Run_1.default.findByIdAndDelete(id);
        },
    },
};
exports.default = resolvers;
