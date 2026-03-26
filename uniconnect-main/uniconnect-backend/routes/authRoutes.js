import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// POST: Register User
router.post("/register", registerUser);

// POST: Login User
router.post("/login", loginUser);

// 👇 Do not forget this!
export default router;