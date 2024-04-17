import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/Users.js";
import eventsRouter from "./routes/Events.js";

// Importing all Routes

// Express app initilisation
export const app = express();

//Middlewares
app.use(express.json()); // for parsing json data from body
app.use(cookieParser()); // for parsing client side cookies
app.use(express.urlencoded({ extended: true })); // for parsing html form data

//environment variables
configDotenv({
  path: "./data/config.env",
});

//CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    method: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

// Routes // v1 designation for v1 api
app.use("/v1/user", usersRouter);
app.use("/v1/event", eventsRouter);

//Default route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Normal 🟢" });
});
