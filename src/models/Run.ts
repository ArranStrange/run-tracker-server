import mongoose from "mongoose";

const runSchema = new mongoose.Schema({
  startTime: { type: String, required: true },
  name: String,
  endTime: String,
  distance: Number,
  coordinates: [[Number]],
});

export default mongoose.model("Run", runSchema);
