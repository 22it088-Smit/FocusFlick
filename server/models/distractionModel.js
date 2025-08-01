import mongoose from "mongoose";

const distractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true }, // e.g., "browser tab leave", "idle timeout"
  timestamp: { type: Date, default: Date.now },
});

const distractionModel =
  mongoose.models.distraction || mongoose.model("Distraction", distractionSchema);

export default distractionModel;