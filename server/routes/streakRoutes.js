import express from "express";
import { getStreaks } from "../controllers/streakController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.get("/:userId", userAuth, getStreaks);

export default router;