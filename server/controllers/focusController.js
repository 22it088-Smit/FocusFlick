import focusSessionModel from "../models/focusSessionModel.js";

export const startSession = async (req, res) => {
  try {
    const session = await focusSessionModel.create({
      userId: req.user.id,
      startTime: new Date(),
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: "Failed to start session", error });
  }
};

export const endSession = async (req, res) => {
  try {
    const session = await focusSessionModel.findByIdAndUpdate(
      req.body.sessionId,
      {
        endTime: new Date(),
        duration: Math.floor((new Date() - new Date(req.body.startTime)) / 60000),
      },
      { new: true }
    );
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: "Failed to end session", error });
  }
};