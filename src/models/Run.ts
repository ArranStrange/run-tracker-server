import mongoose from "mongoose";

const coordinateSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  secondsFromStart: { type: Number, required: true },
});

const runSchema = new mongoose.Schema({
  name: { type: String },
  startTime: { type: String, required: true },
  endTime: { type: String },
  totalTime: { type: Number },
  distance: { type: Number },
  coordinates: [coordinateSchema],
});

export default mongoose.model("Run", runSchema);
