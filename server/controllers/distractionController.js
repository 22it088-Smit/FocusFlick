import distractionModel from "../models/distractionModel.js";

export const logDistraction = async (req, res) => {
  try {
    const distraction = await distractionModel.create({
      userId: req.user.id,
      type: req.body.type,
    });
    res.status(201).json(distraction);
  } catch (error) {
    res.status(500).json({ message: "Failed to log distraction", error });
  }
};