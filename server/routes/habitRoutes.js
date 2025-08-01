import express from "express";
import { createHabit, getHabitStatus } from "../controllers/habitController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/create", userAuth, createHabit);
router.get("/status/:userId", userAuth, getHabitStatus);

export default router;