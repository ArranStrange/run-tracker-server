"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Run_1 = __importDefault(require("../models/Run"));
const resolvers = {
    Query: {
        runs: () => __awaiter(void 0, void 0, void 0, function* () { return Run_1.default.find(); }),
        run: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            console.log("Fetching run with ID:", id);
            return yield Run_1.default.findById(id);
        }),
    },
    Mutation: {
        startRun: () => __awaiter(void 0, void 0, void 0, function* () {
            const run = new Run_1.default({
                startTime: new Date().toISOString(),
                coordinates: [],
            });
            return yield run.save();
        }),
        stopRun: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { runId, name, endTime, distance, coordinates }) {
            const run = yield Run_1.default.findById(runId);
            if (!run)
                throw new Error("Run not found");
            const startTime = new Date(run.startTime).getTime();
            const end = new Date(endTime).getTime();
            const totalTime = Math.floor((end - startTime) / 1000);
            return yield Run_1.default.findByIdAndUpdate(runId, {
                name,
                endTime,
                totalTime,
                distance,
                coordinates,
            }, { new: true });
        }),
        deleteRun: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield Run_1.default.findByIdAndDelete(id);
        }),
    },
};
exports.default = resolvers;
