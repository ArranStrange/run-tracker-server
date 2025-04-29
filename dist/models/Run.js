"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const coordinateSchema = new mongoose_1.default.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    secondsFromStart: { type: Number, required: true },
});
const runSchema = new mongoose_1.default.Schema({
    name: { type: String },
    startTime: { type: String, required: true },
    endTime: { type: String },
    totalTime: { type: Number },
    distance: { type: Number },
    coordinates: [coordinateSchema],
});
exports.default = mongoose_1.default.model("Run", runSchema);
