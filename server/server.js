import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieparser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import focusRouter from "./routes/focusRoutes.js"; // Import focus session routes
import habitRouter from "./routes/habitRoutes.js"; // Import habit routes
import distractionRouter from "./routes/distractionRoutes.js"; // Import distraction routes
import streakRouter from "./routes/streakRoutes.js"; // Import streak routes

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieparser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoints
app.get("/", (req, res) => res.send("API is Working fine"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/focus-session', focusRouter); // Add focus session routes
app.use('/api/habits', habitRouter); // Add habit routes
app.use('/api/distractions', distractionRouter); // Add distraction routes
app.use('/api/streaks', streakRouter); // Add streak routes

app.listen(port, () => console.log(`Server is running on PORT:${port}`));