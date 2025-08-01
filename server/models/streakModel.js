import mongoose from "mongoose";

const streakSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
});

const streakModel = mongoose.models.streak || mongoose.model("Streak", streakSchema);

export default streakModel;