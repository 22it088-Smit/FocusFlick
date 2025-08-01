import express from "express";
import { logDistraction } from "../controllers/distractionController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/log", userAuth, logDistraction);

export default router;