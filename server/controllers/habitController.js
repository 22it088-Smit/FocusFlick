import habitModel from "../models/habitModel.js";

export const createHabit = async (req, res) => {
  try {
    const habit = await habitModel.create({
      userId: req.user.id,
      name: req.body.name,
      date: new Date(),
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: "Failed to create habit", error });
  }
};

export const getHabitStatus = async (req, res) => {
  try {
    const habits = await habitModel.find({ userId: req.params.userId });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch habits", error });
  }
};