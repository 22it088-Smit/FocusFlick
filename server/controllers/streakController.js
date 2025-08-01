import streakModel from "../models/streakModel.js";

export const getStreaks = async (req, res) => {
  try {
    const streaks = await streakModel.findOne({ userId: req.params.userId });
    res.status(200).json(streaks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch streaks", error });
  }
};