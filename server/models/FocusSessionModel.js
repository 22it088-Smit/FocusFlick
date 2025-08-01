import mongoose from "mongoose";

const focusSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  duration: { type: Number }, // Duration in minutes
});

const focusSessionModel =
  mongoose.models.focusSession || mongoose.model("FocusSession", focusSessionSchema);

export default focusSessionModel;