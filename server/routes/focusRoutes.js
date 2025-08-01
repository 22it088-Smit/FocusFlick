import express from "express";
import { startSession, endSession } from "../controllers/focusController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/start", userAuth, startSession);
router.post("/end", userAuth, endSession);

export default router;