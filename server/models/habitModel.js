import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ["completed", "pending", "skipped"], default: "pending" },
  date: { type: Date, required: true },
});

const habitModel = mongoose.models.habit || mongoose.model("Habit", habitSchema);

export default habitModel;