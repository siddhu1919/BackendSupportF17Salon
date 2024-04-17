import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addEvent, getEvents } from "../controllers/Events.js";

const router = express.Router();

router.post("/addEvent", isAuthenticated, addEvent);
router.get("/getEvents/:userId", isAuthenticated, getEvents);

export default router;
