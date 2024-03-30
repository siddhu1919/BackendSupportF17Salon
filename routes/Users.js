import express from "express";
import { login, signup, getUser, logout } from "../controllers/Users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/me", isAuthenticated, getUser);
router.get("/logout", logout);

export default router;
